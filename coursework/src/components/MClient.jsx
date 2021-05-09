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
import { Wrapper } from './Wrapper.jsx';

import { ACTION_TYPES, ACTION_MODE, selectAct } from '../redux/countersAC';
import { mailItemsFetchAC } from '../redux/fetchThunk';
import './MClient.css';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

class intMClient extends React.PureComponent {

  prevLocation = "/";

  componentDidMount() {
   //console.log("mounted");
  }

  render() {
    const { history, dispatch, match} = this.props;
    
    //console.log("render");
    if ( this.prevLocation !== history.location.pathname){
      this.prevLocation = history.location.pathname;
      
      let path = this.prevLocation.split('/');
      if (path.length === 2)
        dispatch(selectAct(path[1], "", -1));
      else if (path.length === 3)
        dispatch(selectAct(path[1], path[2], -1));
      else if (path.length === 4)
        dispatch(selectAct(path[1], path[2], path[3]));
    }

    return (
      <Wrapper>
        <ControlHeader />
        <SplitPane borderColor="#999" percentage={true} primaryIndex={0} primaryMinSize={10} secondaryInitialSize={80} secondaryMinSize={70} >
          <MTreeView {...this.props} />
          <SplitPane borderColor="#999" percentage={true} primaryIndex={0} primaryMinSize={15} secondaryInitialSize={60} secondaryMinSize={20} >
            <MList {...this.props} />
            <MEditor />
          </SplitPane>
        </SplitPane>
      </Wrapper>
    );

  }
}

const mapStateToProps = function (state) {
  return { };
};

// // присоединяем (connect) компонент к хранилищу Redux
const MClient = connect(mapStateToProps)(intMClient);

export default MClient;
