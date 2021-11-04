
const MAIL_TYPES = Object.freeze({
  Inbox: 'Inbox',
  Outbox: 'Outbox',
});

const ACTION_TYPES = Object.freeze({
  Load: 'Load',
  Select: 'Select',
  SelectMsg: 'SelectMsg',
  SelectPage: 'SelectPage',
  CreateMsg: 'CreateMsg',
  SendMsg: 'SendMsg',
  RemoveMsg: 'RemoveMsg',
  Searching: 'Searching',
});

const ACTION_MODE = Object.freeze({
  Processing: 'Processing',
  Success: 'Success',
  Error: 'Error',
  NoDataFound: 'NoDataFound',
});

const loadingAct = function(emulation) {
  let status = emulation ? { emulation: true } : {};
  return {
    type: ACTION_TYPES.Load,
    mode: ACTION_MODE.Processing,
    ...status
  };
}

const selectAct = function(accountId, boxName, msgId) {
  return {
    type: ACTION_TYPES.Select,
    accountId: parseInt(accountId),
    boxName,
    msgId: parseInt(msgId),
  };
}

const selectMsgAct = function(msg) {
  return {
    type: ACTION_TYPES.SelectMsg,
    msg
  };
}

const selectPageAct = function(pageNumber) {
  return {
    type: ACTION_TYPES.SelectPage,
    pageNumber
  };
}

const createMessageAct = function(msg) {
  return {
    type: ACTION_TYPES.CreateMsg,
    msg: {...msg, msgId:-1}
  };
}

const searchingTextAct = function(searchingText) {
  return {
    type: ACTION_TYPES.Searching,
    searchingText,
  };
}

const sendMessageAct = function(msg) {
  return {
    type: ACTION_TYPES.SendMsg,
    mode: ACTION_MODE.Processing,
    msg,
  };
}

const removeMessageAct = function(ItemsOfMsgId) {
  return {
    type: ACTION_TYPES.RemoveMsg,
    mode: ACTION_MODE.Processing,
    ItemsOfMsgId,
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

export { MAIL_TYPES, ACTION_TYPES, ACTION_MODE, loadingAct, createMessageAct, selectAct, selectMsgAct, selectPageAct, searchingTextAct, sendMessageAct, removeMessageAct, loadingSuccessAct, loadingErrorAct, }
