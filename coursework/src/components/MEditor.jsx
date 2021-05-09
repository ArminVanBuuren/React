import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Fragment from 'render-fragment';

import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import ReplyAllIcon from '@material-ui/icons/ReplyAll';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './MEditor.css';

import { ACTION_TYPES, ACTION_MODE } from '../redux/countersAC';
import { mailItemsFetchAC } from '../redux/fetchThunk';

class intMEditor extends React.PureComponent {

  // получено из Redux
  static propTypes = {
    selectedAccount: PropTypes.object.isRequired,
    selectedMsg: PropTypes.object.isRequired,
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
    const { selectedAccount, selectedMsg } = this.props;
    const isExistingMsg = selectedMsg != null && selectedMsg != undefined && selectedMsg.msgId != null && selectedMsg.msgId != undefined && selectedMsg.msgId != -1;
    if (isExistingMsg && !this.state.resetted)
      this.reset();

    const isReplay = !isExistingMsg && this.state.resetted && selectedMsg.to != undefined && selectedMsg.subject != undefined && selectedMsg.content != undefined;

    let { from, to, subject, content, toValid } = isExistingMsg || isReplay ? selectedMsg : { ...this.state, from: selectedAccount.mail };
    const toTextValid = toValid === undefined || toValid;
    const isReadyToSend = !isExistingMsg && toTextValid && subject;

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
              <TextField label="To" 
                         value={to} 
                         variant="outlined" 
                         InputProps={{ readOnly: isExistingMsg, }} 
                         error={!toTextValid} 
                         onChange={this.toChanged} />
              <TextField label="Subject" 
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
    console.log(this.state);
    this.reset();
  }

  reset = () => {
    this.setState( { ...this.initial } );
  }

  toChanged = (EO) => {
    const {value} = EO.target;
    this.setState( { resetted:false, toValid: this.checkFromAndTo(value), to:value } );
  }

  checkFromAndTo = (value) => {
    // for (const address of value.split(';')) {
    //   if (address === null || address === "")
    //     continue;
    //   if (!(/^\S{3,}@\S{3,}\.\S{2,}$/.test(address)))
    //     return false;
    //   console.log(address);
    // }
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
