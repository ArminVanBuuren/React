import { ACTION_MODE, ACTION_TYPES } from './countersAC';

const initState = {
  type: ACTION_TYPES.Load,
  mode: ACTION_MODE.Processing,
  boxName: "inbox", 
  msgId: -1,
  mailData: [],
}

// в редьюсере state - это не весь state Redux, а только тот раздел state,
// за который отвечает данный редьюсер
function countersReducer(state = initState, action) {
  // надо создать новый счётчик
  // редьюсер ВСЕГДА должен возвращаеть новый state а не изменять старый!
  console.log(action.type + "=" + action.mode);

  switch (action.type) {
    
    case ACTION_TYPES.Load: {

      if (action.mode === ACTION_MODE.Success){
        
        let newState = {
          ...state,
          type: action.type,
          mode: action.mode,
          mailData: action.mailData,
        };
  
        return newState;
      }

      return state;
    }

    case ACTION_TYPES.CreateMsg: {
      let newState = {
        ...state,
        type: action.type,
        mode: action.mode,
      };

      return newState;
    }

    case ACTION_TYPES.SendMsg: {
      let newState = {
        ...state,
        type: action.type,
        mode: action.mode,
      };

      return newState;
    }
    
    case ACTION_TYPES.RemoveMsg: {
      let newState = {
        ...state,
        type: action.type,
        mode: action.mode,
      };

      return newState;
    }
    
    case ACTION_TYPES.Success: {
      let newState = {
        ...state,
        type: action.type,
        mode: action.mode,
      };

      return newState;
    }

    case ACTION_TYPES.Error: {
      let newState = {
        ...state,
        type: action.type,
        mode: action.mode,
      };

      return newState;
    }

    default:{
      return state;
    }
  }
}

export default countersReducer;
