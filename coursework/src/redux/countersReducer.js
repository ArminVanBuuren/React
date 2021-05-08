import { ACTION_MODE, ACTION_TYPES } from './countersAC';

const maxBoxItems = 100;

const initState = {
  type: ACTION_TYPES.Load,
  mode: ACTION_MODE.Processing,
  selectedAccount: {}, // выбранный аккаут
  boxName: "",         // выбранная папка
  boxData: [],         // отфильтрованный список меилов для одной страницы
  selectedMsg: {},     // выбранное сообщение
  selectedPage: 1,     // выбранная страница
  countPages: 1,       // всего страниц для папки
  treeData: [],        // информация аккаунтов, боксах и количестве писем
  mailData: [],        // все данные с сервера
}

function loadBoxData(isNewData, state, mailData) {
  const { selectedAccount } = state;
  let selectedData = {};
  let treeData = isNewData ? [] : state.treeData;
  
  if (isNewData) {
    // обновляем всю дату, сортируем письма и находим выбранный аккаунт
    for ( const mail of mailData ) {
      let boxes = {};
      mail.items.forEach(box => ( boxes[mail.account.id + "-" + box.name] = { name: box.name, count: box.mails.length } ));
      treeData.push({ account:mail.account, boxes });

      // сортируем все письма
      for (const box of mail.items) {
        box.mails = box.mails.sort((x, y) => new Date(x.dateOfSent) - new Date(y.dateOfSent)).reverse();
      }

      // находим выбранный аккаунт
      if ( mail.account.id === selectedAccount.id ) {
        selectedData = getSelectedBoxData(mail, state);
      }
    }
  }
  else {
    // находим только выбранный аккаунт
    for ( const mail of mailData ) {
      if ( mail.account.id === selectedAccount.id ) {
        selectedData = getSelectedBoxData(mail, state);
        break;
      }
    }
  }
  return { ...selectedData, treeData };
}

function getSelectedBoxData( mail, state ) {
  const { boxName } = state;
  let boxData = [];
  let selectedMsg = state.selectedMsg;
  let selectedPage = state.selectedPage;
  let countPages = 1;

  for ( const box of mail.items ) {
    // находим выбранный box
    if ( box.name === boxName ) {
      // находим все письма, подситываем количество страниц и корректируем выбранную страницу
      countPages = Math.ceil( box.mails.length / maxBoxItems );
      selectedPage = selectedPage > countPages ? countPages : selectedPage;

      // фильтрум письма для выбранной страницы
      let start = ( ( selectedPage - 1 ) * maxBoxItems );
      boxData = box.mails.slice( start, start + maxBoxItems );

      // если на текущей странице нет выбранного ранее письма, то очищаем то что было выбрано
      if ( selectedMsg.msgId ) {
        if ( !box.mails.some( m => m.msgId === selectedMsg.msgId ) ) {
          selectedMsg = {};
        }
      }

      break;
    }
  }

  return {boxData, selectedMsg, selectedPage, countPages};
}

// в редьюсере state - это не весь state Redux, а только тот раздел state,
// за который отвечает данный редьюсер
function countersReducer( state = initState, action ) {
  // надо создать новый счётчик
  // редьюсер ВСЕГДА должен возвращаеть новый state а не изменять старый!
  console.log( action.type + "=" + action.mode );

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
      else if ( action.mode === ACTION_MODE.Error ){
        return {
          ...initState,
          ...action,
        };
      }

      return state;
    }


    case ACTION_TYPES.CreateMsg: {
      return {
        ...state,
        selectedMsg: {}
      };
    }


    case ACTION_TYPES.SelectBox: {
      const currentMail = state.mailData.find(mail => mail.account.id === action.accountId);
      
      if (currentMail){
        let newState = {
          ...state,
          selectedAccount: currentMail.account,
          boxName: action.boxName
        };
        let result = loadBoxData(false, newState, state.mailData);
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


    case ACTION_TYPES.SelectPage: {
      let result = loadBoxData(false, {...state, selectedPage:action.pageNumber}, action.mailData);
      return {
        ...state,
        ...result,
      };
    }


    case ACTION_TYPES.SendMsg: {
      if (state.selectedAccount && state.selectedAccount.id != undefined){
        const currentMail = state.mailData.find(mail => mail.account.id === state.selectedAccount.id);

        if (currentMail){
          let maxId = 0;
          if (currentMail.items.outbox)
              currentMail.items.outbox.forEach(m => { maxId = m.msgId > maxId ? m.msgId + 1 : maxId; });
  
          currentMail.items.outbox.push({...action.msg, msgId: maxId});
  
          return {
            ...state,
            type: action.type,
            mode: action.mode,
          };
        }
      }

      return {
        ...state,
        mode: ACTION_MODE.NoDataFound,
      };
    }


    case ACTION_TYPES.RemoveMsg: {
      if (state.selectedAccount && state.selectedAccount.id != undefined){
        const currentMail = state.mailData.find(mail => mail.account.id === state.selectedAccount.id);

        if (currentMail && state.boxName in currentMail.items){
          currentMail.items[state.boxName] = currentMail.items[state.boxName].find(m => m.msgId != action.msgid);

          return {
            ...state,
            type: action.type,
            mode: action.mode,
          };
        }
      }

      return {
          ...state,
          mode: ACTION_MODE.NoDataFound,
      };
    }


    default: {
      return state;
    }
  }
}

export default countersReducer;