import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Fragment from 'render-fragment';

import TextField from '@material-ui/core/TextField';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './MEditor.css';

import { ACTION_TYPES, ACTION_MODE } from '../redux/countersAC';
import { mailItemsFetchAC } from '../redux/fetchThunk';

const CustomToolbar = () => (
    <div id="toolbar">
      <select className="ql-header" defaultValue="" onChange={e => e.persist()}>
        <option></option>
        <option value="3">Medium</option>
        <option value="2">Large</option>
        <option value="1">Huge</option>
      </select>
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <select className="ql-color" defaultValue="">
        <option value="red"></option>
        <option value="green"></option>
        <option value="blue"></option>
        <option value="orange"></option>
        <option value="violet"></option>
        <option value="#d0d1d2"></option>
        <option></option>
      </select>
    </div>
)


class intMEditor extends React.PureComponent {

  // получено из Redux
  static propTypes = {
    selectedAccount: PropTypes.object.isRequired,
    selectedMsg: PropTypes.object.isRequired,
  };

  render() {
    const { selectedAccount, selectedMsg } = this.props;
    const isExistingMsg = selectedMsg != null && selectedMsg != undefined && selectedMsg.msgId != null && selectedMsg.msgId != undefined;
    let { from, to, subject, content } = selectedMsg;
    if (!isExistingMsg){
      from = "";
      to = "";
      subject = "";
      content = "";
    }

    return (
        <div className="text-editor">
            <form noValidate autoComplete="off">
              <TextField label="From" value={from} InputProps={{ readOnly: true, }} variant="outlined" />
              <TextField label="To" value={to} InputProps={{ readOnly: true, }} variant="outlined" />
              <TextField label="Subject" value={subject} InputProps={{ readOnly: true, }} variant="outlined" />
            </form>
            { isExistingMsg 
              ? <ReactQuill value={content} theme='snow' onChange={this.textChanged} modules={{ toolbar:false }} readOnly={true} />
              : <ReactQuill value={""} theme='snow' onChange={this.textChanged} readOnly={false} />
             }
            
        </div>
    );
  }

  textChanged = (html) => {
      
  }

  modules = {
    toolbar: {
      container: "#toolbar",
    }
  }

  formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'color',
  ]

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
