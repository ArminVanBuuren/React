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
  mailData: [],        // все данные с сервера
}

function loadBoxData(state, mailData) {
  const { selectedAccount, boxName } = state;
  let boxData = [];
  let selectedMsg = state.selectedMsg;
  let selectedPage = state.selectedPage;
  let countPages = 1;

  if (selectedAccount.id){
    for ( const mail of mailData ) {
      if ( mail.account.id === selectedAccount.id ) {
        for ( const boxKey in mail.items ) {
          if ( boxKey === boxName ) {
            
            const mailItems = object[ boxKey ];
            countPages = Math.ceil( mailItems.length / maxBoxItems );
            selectedPage = selectedPage > countPages ? countPages : selectedPage;
  
            let start = ( ( selectedPage - 1 ) * maxBoxItems ) - 1;
            boxData = mailItems.slice( start );
            
            if (selectedMsg.msgId){
              if (!mailItems.some((m) => m.msgId === selectedMsg.msgId)){
                selectedMsg = {};
              }
            }
  
            break;
          }
        }
        break;
      }
  }
  
  }
  return { boxData, selectedMsg, selectedPage, countPages };
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
        let result = loadBoxData(state, action.mailData);
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

      if (currentMail && action.boxName in currentMail.items){
        return {
          ...state,
          selectedAccount: currentMail.account,
          boxName: action.boxName
        };
      }

      return {
        ...state,
        mode: ACTION_MODE.NoDataFound,
      };
    }


    case ACTION_TYPES.SelectPage: {
      let result = loadBoxData({...state, selectedPage:action.pageNumber}, action.mailData);
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