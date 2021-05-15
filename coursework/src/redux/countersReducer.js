import { MAIL_TYPES, ACTION_MODE, ACTION_TYPES } from './countersAC';

const maxBoxItems = 10;

const initState = {
  type: ACTION_TYPES.Load,
  mode: ACTION_MODE.Processing,
  selectedAccount: { isDefault: true }, // выбранный аккаут
  boxName: "",         // выбранная папка
  boxData: [],         // отфильтрованный список меилов для одной страницы
  selectedMsg: {},     // выбранное сообщение
  selectedPage: 1,     // выбранная страница
  countPages: 1,       // всего страниц для папки
  treeData: [],        // информация аккаунтов, боксах и количестве писем
  searchingText: null, 
  mailData: [],        // все данные с сервера
}


function getDate(dt){
  let dateTime = dt.split(' ');
  let date = dateTime[0].split('.');
  let time = dateTime[1].split(':');
  return new Date(date[2], date[1] - 1, date[0], time[0], time[1], time[2]);
}


function loadBoxData(isNewData, state, mailData, reloadTreeData = false) {
  let selectedAccount = state.selectedAccount;
  let selectedData = {};
  let treeData = isNewData || reloadTreeData ? [] : state.treeData;
  
  if (isNewData) {
    // обновляем все данные, сортируем письма и находим выбранный аккаунт
    for ( const mail of mailData ) {
      treeData.push(reloadTreeDataFunc(mail));

      // сортируем все письма
      for (const box of mail.items) {
        box.mails = box.mails.sort((x, y) => {
          //console.log(`${getDate(x.dateOfSent)}   -  ${getDate(y.dateOfSent)}  =  ${getDate(x.dateOfSent) - getDate(y.dateOfSent)}`);
          return getDate(x.dateOfSent) - getDate(y.dateOfSent);
        }).reverse();
      }

      // при первой загрузке показываем певый попавшийся аккаунт
      if (selectedAccount && selectedAccount.isDefault){
        selectedAccount = mail.account;
      }

      // находим выбранный аккаунт
      if ( mail.account.id === selectedAccount.id ) {
        selectedData = getSelectedBoxData(isNewData, mail, state);
      }
    }
  }
  else {
    // находим только выбранный аккаунт
    for ( const mail of mailData ) {
      if (reloadTreeData)
        treeData.push(reloadTreeDataFunc(mail));

      if ( mail.account.id === selectedAccount.id ) {
        selectedData = getSelectedBoxData(isNewData, mail, state);
        break;
      }
    }
  }
  return { ...selectedData, selectedAccount, treeData };
}

function reloadTreeDataFunc(mail){
  let boxes = {};
  //mails:box.mails
  mail.items.forEach(box => ( boxes[mail.account.id + "-" + box.name] = { name: box.name, mails: box.mails } ));
  return { account:mail.account, boxes };
}

function getSelectedBoxData( isNewData, mail, state ) {
  const { searchingText } = state;
  let boxName = state.boxName;
  let boxData = [];
  let selectedMsg = state.selectedMsg;
  let selectedPage = state.selectedPage;
  let countPages = 1;
  
  for ( const box of mail.items ) {

    // находим выбранный box
    if ( box.name === boxName ) {

      let mails = box.mails;
      if (searchingText){
        let searchingTextLower = searchingText.toLowerCase();
        mails = mails.filter(m => (m.from.toLowerCase().indexOf(searchingTextLower) != -1 
        || m.to.toLowerCase().indexOf(searchingTextLower) != -1 
        || m.subject.toLowerCase().indexOf(searchingTextLower) != -1 
        || m.content.toLowerCase().indexOf(searchingTextLower) != -1));
      }

      // находим все письма, подситываем количество страниц и корректируем выбранную страницу
      countPages = Math.ceil( mails.length / maxBoxItems );
      selectedPage = selectedPage > countPages ? countPages : selectedPage;

      // если на текущей странице нет выбранного ранее письма, то очищаем то что было выбрано
      let findedIndex = -1;
      if ( selectedMsg ) {

        if ( selectedMsg.msgId ) {
          selectedMsg = mails.find( m => { 
            findedIndex++;
            return m.msgId === selectedMsg.msgId 
          });

          // если запись уже удалена, то очищаем выбранное сообщение
          if ( !selectedMsg ){
            findedIndex = -1;
            selectedMsg = {};
          }
        }

        if ( selectedMsg.msgId == undefined && mails.length > 0 || selectedMsg.msgId === -1 ){
          selectedMsg = mails[0];
        }
      }

      // если страницу перегрузили, то назодим страницу по выбранному письму msgid 
      if ( selectedPage <= 0){
        if (findedIndex >= 0){
          selectedPage = Math.ceil((findedIndex + 1) / maxBoxItems);
        }
        else {
          selectedPage = 1;
        }
      }
      
      // фильтрум письма для выбранной страницы
      let start = ( ( selectedPage - 1 ) * maxBoxItems );
      boxData = mails.slice( start, start + maxBoxItems );

      break;
    }
  }

  return {boxName, boxData, selectedMsg, selectedPage, countPages};
}

// в редьюсере state - это не весь state Redux, а только тот раздел state,
// за который отвечает данный редьюсер
function countersReducer( state = initState, action ) {

  const { selectedAccount, boxName, selectedMsg, selectedPage, searchingText, mailData} = state;

  // надо создать новый счётчик
  // редьюсер ВСЕГДА должен возвращаеть новый state а не изменять старый!
  //console.log( action.type + "=" + action.mode );

  switch ( action.type ) {

    case ACTION_TYPES.Load: {
      if ( action.mode === ACTION_MODE.Success ) {
        let result = loadBoxData(true, state, action.mailData);
        return {
          ...state,
          ...action,
          ...result,
        };
      }
      return {
        ...initState,
        ...action,
      };
    }


    case ACTION_TYPES.CreateMsg: {
      return {
        ...state,
        selectedMsg: { ...action.msg }
      };
    }


    case ACTION_TYPES.Select: {
      const currentMail = mailData.find(mail => mail.account.id === action.accountId);
      
      if (selectedAccount === currentMail.account && boxName === action.boxName && action.msgId === -1 )
        return state; 
      
      let newSelectedMsg = selectedMsg && selectedMsg.msgId === action.msgId && action.msgId !== -1
                                        ? selectedMsg
                                        : { msgId: action.msgId };

      if (currentMail) {
        let newState = {
          ...state,
          selectedAccount: currentMail.account,
          boxName: action.boxName,
          selectedMsg: newSelectedMsg,
          // если выбирался box, то выбранная страница сбрасывается. А если msgId то подсчитываем сами страницу
          selectedPage: action.msgId === -1 ? 1 : -1,
        };
        
        let result = loadBoxData(false, newState, mailData);
        newState = { 
          ...newState,
          ...result
        };

        return newState;
      }

      return {
        ...state,
        mode: ACTION_MODE.NoDataFound,
      };
    }


    case ACTION_TYPES.SelectMsg: {
      if (selectedMsg === action.msg)
        return state;

      return {
        ...state,
        selectedMsg: action.msg,
      };
    }


    case ACTION_TYPES.SelectPage: {
      if (selectedPage === action.pageNumber)
        return state;
      let result = loadBoxData(false, {...state, selectedPage:action.pageNumber}, mailData);
      return {
        ...state,
        ...result,
      };
    }


    case ACTION_TYPES.Searching: {
      if (searchingText === action.searchingText)
          return state;
          
      let newState = {
        ...state,
        searchingText:action.searchingText,
      };
      let result = loadBoxData(false, newState, mailData);
      newState = {
        ...newState,
        ...result,
      }
      
      return newState;
    }


    case ACTION_TYPES.SendMsg: {
      if (!selectedAccount || selectedAccount.id == undefined)
        return state;
      
      const currentMail = mailData.find(mail => mail.account.id === selectedAccount.id);
      if (!currentMail)
        return state;
      
      const currentBoxData = currentMail.items.find(box => box.name === MAIL_TYPES.Outbox);
      if (!currentBoxData)
          return state;
      
      let maxId = 0;
      currentBoxData.mails.forEach(m => { maxId = m.msgId > maxId ? m.msgId + 1 : maxId; });
      currentBoxData.mails.push({...action.msg, msgId: maxId});
      
      return {
        ...state,
        type: action.type,
        mode: action.mode,
      };
    }


    case ACTION_TYPES.RemoveMsg: {
      if (!selectedAccount || selectedAccount.id == undefined)
        return state;

      const currentMail = mailData.find(mail => mail.account.id === selectedAccount.id);
      if (!currentMail)
          return state;

      const currentBoxData = currentMail.items.find(box => box.name === boxName);
      if (!currentBoxData)
          return state;

      currentBoxData.mails = currentBoxData.mails.filter(m => !action.ItemsOfMsgId.some(removedMsgId => m.msgId == removedMsgId));

      let newState = { 
        ...state,
      };
      let result = loadBoxData(false, newState, mailData, true);
      return {
        ...newState,
        ...result
      };
    }


    default: {
      return state;
    }
  }
}

export default countersReducer;