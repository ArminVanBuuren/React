import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './MEditor.css';

import { sendMessageAct } from '../redux/countersAC';

class intMEditor extends React.PureComponent {

  // получено из Redux
  static propTypes = {
    selectedAccount: PropTypes.object.isRequired,
    selectedMsg: PropTypes.object,
  };

  initial = {
    resetted: true,
    to: "",
    toValid: false,
    subject: "",
    content: "",
  }

  state = { ...this.initial };

  render() {
    let { selectedAccount, selectedMsg } = this.props;
    
    const isExistingMsg = selectedMsg != null && selectedMsg != undefined && selectedMsg.msgId != null && selectedMsg.msgId != undefined && selectedMsg.msgId != -1;
    if (isExistingMsg && !this.state.resetted)
      this.reset();

    selectedMsg = selectedMsg == undefined ? {} : selectedMsg;
    const isReplay = !isExistingMsg && this.state.resetted && selectedMsg.to != undefined && selectedMsg.subject != undefined && selectedMsg.content != undefined;

    let { from, to, subject, content, toValid } = isExistingMsg || isReplay ? selectedMsg : { ...this.state, from: selectedAccount.mail };
    const toTextValid = toValid === undefined || toValid;
    const isReadyToSend = !isExistingMsg && toTextValid && subject;

    from = from == undefined ? "" : from;
    to = to == undefined ? "" : to;
    subject = subject == undefined ? "" : subject;
    content = content == undefined ? "" : content;

    return (
        <div className="text-editor">
            <form noValidate autoComplete="off">
              <IconButton color="inherit" disabled={!isReadyToSend} onClick={this.checkAndReset} >
                <SendIcon />
              </IconButton>
              <TextField label="From" 
                         value={from} 
                         variant="outlined" 
                         InputProps={{ readOnly: true, }}  />
              <TextField required
                         label="To" 
                         value={to} 
                         variant="outlined" 
                         InputProps={{ readOnly: isExistingMsg, }} 
                         error={!toTextValid} 
                         onChange={this.toChanged} />
              <TextField required 
                         label="Subject" 
                         value={subject}
                         variant="outlined" 
                         InputProps={{ readOnly: isExistingMsg, }} 
                         error={!isExistingMsg && !subject } onChange={this.subjectChanged} />
            </form>
            { isExistingMsg 
              ? <ReactQuill value={content} theme='snow' modules={{ toolbar:false }} readOnly={true} />
              : <ReactQuill value={content} theme='snow' onChange={this.textChanged} readOnly={false} />
             }
            
        </div>
    );
  }

  checkAndReset = (EO) => {
    const { dispatch } = this.props;
    const { to, subject, content } = this.state;
    dispatch(sendMessageAct( { from: this.props.selectedAccount.mail, dateOfSent: this.formatDateTime(new Date()), to, subject, content } ));
    this.reset();
  }

  formatDateTime = (dt) => {
    var year = dt.getFullYear();
    var month = dt.getMonth()+1;
    var day = dt.getDate();
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    return this.str0l(day, 2) + '.' + this.str0l(month, 2) + '.' + year + ' ' + this.str0l(hours, 2) + ':' + this.str0l(minutes, 2) + ':' + this.str0l(seconds, 2);
  }

  // дополняет строку Val слева нулями до длины Len
  str0l = (val, len) => {
    var strVal=val.toString();
    while ( strVal.length < len )
        strVal='0'+strVal;
    return strVal;
  }

  reset = () => {
    this.setState( { ...this.initial } );
  }

  toChanged = (EO) => {
    const {value} = EO.target;
    this.setState( { resetted:false, toValid: this.checkFromAndTo(value), to:value } );
  }

  checkFromAndTo = (value) => {
    for (const address of value.split(';')) {
      if (address === null || address === "")
        continue;
      if (!(/^\S{3,}@\S{3,}\.\S{2,}$/.test(address)))
        return false;
    }
    return true;
  }

  subjectChanged = (EO) => {
    this.setState( { resetted:false, subject:EO.target.value } );
  }

  textChanged = (html) => {
    this.setState( { resetted:false, content:html });
  }

}


const mapStateToProps = function (state) {
  return {
    // из раздела Redux с именем counter свойство cnt будет доступно
    // данному компоненту как this.props.cnt
    selectedAccount: state.counters.selectedAccount,
    selectedMsg: state.counters.selectedMsg,
  };
};

// присоединяем (connect) компонент к хранилищу Redux
const MEditor = connect(mapStateToProps)(intMEditor);

export default MEditor;
