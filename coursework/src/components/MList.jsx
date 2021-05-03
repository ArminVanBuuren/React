import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Fragment from 'render-fragment';

import ControlHeader from './ControlHeader.jsx';
import MTreeView from './MTreeView.jsx';
import MEditor from './MEditor.jsx';

import { ACTION_TYPES, ACTION_MODE } from '../redux/countersAC';
import { mailItemsFetchAC } from '../redux/fetchThunk';

class intMList extends React.PureComponent {

  // получено из Redux
  static propTypes = {
    boxData: PropTypes.array.isRequired,
    selectedPage: PropTypes.number.isRequired,
    countPages: PropTypes.number.isRequired,
  };

  render() {
    const { boxData } = this.props;

    return (
        <div>
            {
               boxData.map( (msg, index) => {

               })
            }
        </div>
    );
  }

}

const mapStateToProps = function (state) {
    return {
      // из раздела Redux с именем counter свойство cnt будет доступно
      // данному компоненту как this.props.cnt
      boxData: state.counters.boxData, 
      selectedPage: state.counters.selectedPage, 
      countPages: state.counters.countPages, 
    };
  };
  
  // присоединяем (connect) компонент к хранилищу Redux
  const MList = connect(mapStateToProps)(intMList);
  
  export default MList;
  