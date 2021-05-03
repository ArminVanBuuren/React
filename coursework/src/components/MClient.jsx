import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Fragment from 'render-fragment';

import ControlHeader from './ControlHeader.jsx';
import MTreeView from './MTreeView.jsx';
import MList from './MList.jsx';
import MEditor from './MEditor.jsx';

import { ACTION_TYPES, ACTION_MODE } from '../redux/countersAC';
import { mailItemsFetchAC } from '../redux/fetchThunk';

class intMClient extends React.PureComponent {

  // получено из Redux
  static propTypes = {
    type: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    mailData: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.dispatch( mailItemsFetchAC(this.props.dispatch) );
  }

  render() {
    const {type, mode, boxName, msgId, mailData} = this.props;
    
    if (mode === ACTION_MODE.Processing)
      return "загрузка...";

    if (mode === ACTION_MODE.Error)
      return "ошибка загрузки...";

    

    return (
      <Fragment>
        <ControlHeader />
        <MTreeView />
        <MList />
        <MEditor />
      </Fragment>

      // <div>
      //   <NavLink to="/1" className="PageLink" activeClassName="ActivePageLink">1</NavLink>
      //   <NavLink to="/2" className="PageLink" activeClassName="ActivePageLink">2</NavLink>
      // </div>

    );

  }

}

const mapStateToProps = function (state) {
  return {
    // из раздела Redux с именем counter свойство cnt будет доступно
    // данному компоненту как this.props.cnt
    type: state.counters.type, 
    mode: state.counters.mode, 
    mailData: state.counters.mailData, 
  };
};

// присоединяем (connect) компонент к хранилищу Redux
const MClient = connect(mapStateToProps)(intMClient);

export default MClient;
