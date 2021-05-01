import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Fragment from 'render-fragment';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { ACTION_TYPES, ACTION_MODE } from '../redux/countersAC';
import { mailItemsFetchAC } from '../redux/fetchThunk';

const CustomButton = () => <span className="octicon octicon-star" />

function insertStar () {
    const cursorPosition = this.quill.getSelection().index
    this.quill.insertText(cursorPosition, "★")
    this.quill.setSelection(cursorPosition + 1)
}

const CustomToolbar = () => (
    <div id="toolbar">
      <select className="ql-header" defaultValue="" onChange={e => e.persist()}>
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option></option>
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
      <button className="ql-insertStar">
        <CustomButton className="octicon octicon-star" />
      </button>
    </div>
  )

class intMEditor extends React.PureComponent {

  // получено из Redux
  static propTypes = {
    type: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    boxName: PropTypes.string.isRequired,
    msgId: PropTypes.number.isRequired,
    mailData: PropTypes.array.isRequired,
  };

  render() {
    let value = "test - test";

    return (
        <div className="text-editor">
            <CustomToolbar />
            <ReactQuill value={value} onChange={this.textChanged} modules={this.modules} />
        </div>
    );

  }

  textChanged = (html) => {
      console.log(html);
  }

  modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        "insertStar": insertStar,
      }
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
    type: state.counters.type, 
    mode: state.counters.mode, 
    boxName: state.counters.boxName, 
    msgId: state.counters.msgId,
    mailData: state.counters.mailData,
  };
};

// присоединяем (connect) компонент к хранилищу Redux
const MEditor = connect(mapStateToProps)(intMEditor);

export default MEditor;
