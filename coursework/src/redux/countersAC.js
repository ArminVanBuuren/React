
const ACTION_TYPES = Object.freeze({
  Load: 'Load',
  SelectBox: 'SelectBox',
  CreateMsg: 'CreateMsg',
  SendMsg: 'SendMsg',
  RemoveMsg: 'RemoveMsg',
});

const ACTION_MODE = Object.freeze({
  Processing: 'Processing',
  Success: 'Success',
  Error: 'Error',
});

const loadingAct = function() {
  return {
    type: ACTION_TYPES.Load,
    mode: ACTION_MODE.Processing,
  };
}

const selectBoxAct = function(boxName) {
  return {
    type: ACTION_TYPES.SelectBox,
    mode: ACTION_MODE.Success,
    boxName: boxName,
  };
}

const createMessageAct = function(msgId) {
  return {
    type: ACTION_TYPES.CreateMsg,
    mode: ACTION_MODE.Success,
    msgId: msgId,
  };
}

const sendMessageAct = function(msg) {
  return {
    type: ACTION_TYPES.SendMsg,
    mode: ACTION_MODE.Processing,
    ...msg,
  };
}

const removeMessageAct = function(msgId) {
  return {
    type: ACTION_TYPES.RemoveMsg,
    mode: ACTION_MODE.Processing,
    msgId: msgId,
  };
}

const loadingSuccessAct = function(data) {
  return {
    type: ACTION_TYPES.Load,
    mode: ACTION_MODE.Success,
    mailData: data,
  };
}

const loadingErrorAct = function() {
  return {
    type: ACTION_TYPES.Load,
    mode: ACTION_MODE.Error,
  };
}

export { ACTION_TYPES, ACTION_MODE, loadingAct, selectBoxAct, createMessageAct, sendMessageAct, removeMessageAct, loadingSuccessAct, loadingErrorAct, }
