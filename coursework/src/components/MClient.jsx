import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Fragment from 'render-fragment';
import SplitPane from "react-splitter-layout";

import ControlHeader from './ControlHeader.jsx';
import MTreeView from './MTreeView.jsx';
import MList from './MList.jsx';
import MEditor from './MEditor.jsx';
import Wrapper from './Wrapper.jsx';

import { ACTION_TYPES, ACTION_MODE } from '../redux/countersAC';
import { mailItemsFetchAC } from '../redux/fetchThunk';
import './MClient.css';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    
    if (mode === ACTION_MODE.Error)
      return "ошибка загрузки...";

    return (
      <Wrapper load={mode === ACTION_MODE.Processing} >
        <ControlHeader />
        <SplitPane borderColor="#999" percentage={true} primaryIndex={0} primaryMinSize={15} secondaryInitialSize={80} secondaryMinSize={70} >
          <MTreeView />
          <SplitPane borderColor="#999" percentage={true} primaryIndex={0} primaryMinSize={15} secondaryInitialSize={60} secondaryMinSize={20} >
            <MList />
            <MEditor />
          </SplitPane>
        </SplitPane>
      </Wrapper>

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
