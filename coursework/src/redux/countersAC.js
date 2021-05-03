
const ACTION_TYPES = Object.freeze({
  Load: 'Load',
  SelectBox: 'SelectBox',
  SelectPage: 'SelectPage',
  CreateMsg: 'CreateMsg',
  SendMsg: 'SendMsg',
  RemoveMsg: 'RemoveMsg',
});

const ACTION_MODE = Object.freeze({
  Processing: 'Processing',
  Success: 'Success',
  Error: 'Error',
  NoDataFound: 'NoDataFound',
});

const loadingAct = function() {
  return {
    type: ACTION_TYPES.Load,
    mode: ACTION_MODE.Processing,
  };
}

const selectBoxAct = function(accountId, boxName) {
  return {
    type: ACTION_TYPES.SelectBox,
    accountId,
    boxName,
  };
}

const selectPageAct = function(pageNumber) {
  return {
    type: ACTION_TYPES.SelectPage,
    pageNumber
  };
}

const createMessageAct = function() {
  return {
    type: ACTION_TYPES.CreateMsg,
  };
}

const sendMessageAct = function(msg) {
  return {
    type: ACTION_TYPES.SendMsg,
    mode: ACTION_MODE.Processing,
    msg,
  };
}

const removeMessageAct = function(msgId) {
  return {
    type: ACTION_TYPES.RemoveMsg,
    mode: ACTION_MODE.Processing,
    msgId,
  };
}

const loadingSuccessAct = function(mailData) {
  return {
    type: ACTION_TYPES.Load,
    mode: ACTION_MODE.Success,
    mailData,
  };
}

const loadingErrorAct = function() {
  return {
    type: ACTION_TYPES.Load,
    mode: ACTION_MODE.Error,
  };
}

export { ACTION_TYPES, ACTION_MODE, loadingAct, createMessageAct, selectBoxAct, selectPageAct, sendMessageAct, removeMessageAct, loadingSuccessAct, loadingErrorAct, }
