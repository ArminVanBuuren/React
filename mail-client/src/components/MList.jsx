import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Fragment from 'render-fragment';
import { pure } from 'recompose';

import { selectMsgAct, selectPageAct, removeMessageAct } from '../redux/countersAC';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Paper, List, ListSubheader, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { deepOrange, green } from '@material-ui/core/colors';
import { Pagination } from '@material-ui/lab';
import Zoom from "@material-ui/core/Zoom/Zoom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0)
    },
    paper: {
      
    },
    list: {
      
    },
    pagination: {
      padding: theme.spacing(2, 1, 1),
      backgroundColor: theme.palette.background.paper,
      width:'100%'
    },
    subheader: {
      backgroundColor: theme.palette.background.paper
    },
    appBar: {
      top: "auto",
      bottom: 0
    },
    grow: {
      flex: '0 0 auto',
      position: 'relative'
    },
    fabButton: {
      position: "absolute",
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: "0 auto"
    },
    rounded: {
      color: '#fff',
      backgroundColor: green[500],
    },
}));

function IntMList(props) {
    const [hiddenMsgs, setHiddenMsgs] = useState([]);
    const { boxData, selectedAccount, boxName, selectedMsg, selectedPage, countPages, dispatch, history } = props;
    const classes = useStyles();
    let prevDate = null;
    
    function handleDeleteItem (msgId) {
      hiddenMsgs.push(msgId);
      setHiddenMsgs(hiddenMsgs);
    };

    if (hiddenMsgs.length > 0) {
      setTimeout(() => {
        dispatch(removeMessageAct(hiddenMsgs));
        setHiddenMsgs([]);
      }, 300);
    }

    return (
        <Fragment>
            <CssBaseline />

            {boxData.length > 0 && <Pagination className={classes.pagination}
                                          count={countPages} 
                                          siblingCount={4} 
                                          page={selectedPage} 
                                          color="primary" 
                                          onChange={(EO, page) => { dispatch(selectPageAct(page)); }} />}

            <Paper square className={classes.paper}>
                <List className={classes.list}>
                {boxData.map((msg) => {
                    const name = msg.from.charAt(0).toUpperCase();
                    const date = msg.dateOfSent.split(' ');
                    let dateChanged = prevDate !== date[0];
                    if (prevDate != date[0])
                        prevDate = date[0];

                    return (
                    <Fragment key={msg.msgId} >
                      {dateChanged && <ListSubheader className={classes.subheader}>{date[0]}</ListSubheader>}
                      <Zoom in={!hiddenMsgs.includes(msg.msgId)}>
                          <ListItem button selected={selectedMsg && selectedMsg.msgId && msg.msgId === selectedMsg.msgId} onClick={() => {
                                history.push(`/${selectedAccount.id}/${boxName}/${msg.msgId}`);
                                //dispatch(selectMsgAct(msg));
                              }}>
                                <ListItemAvatar>
                                    <Avatar alt="Profile Picture" className={classes.rounded} >{name}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={msg.from} secondary={date[1] + ": " + msg.subject} />
                                <IconButton color="primary" onClick={() => handleDeleteItem(msg.msgId)} >
                                    <DeleteIcon />
                                </IconButton>
                          </ListItem>
                      </Zoom>
                    </Fragment>
                )})}
                </List>
            </Paper>
        </Fragment>
    );
}

IntMList.propTypes = {
    selectedAccount: PropTypes.object.isRequired,
    boxName: PropTypes.string.isRequired,
    selectedMsg: PropTypes.object,
    boxData: PropTypes.array.isRequired,
    selectedPage: PropTypes.number.isRequired,
    countPages: PropTypes.number.isRequired,
};

const mapStateToProps = function (state) {
    return {
      // из раздела Redux с именем counter свойство cnt будет доступно
      // данному компоненту как this.props.cnt
      selectedAccount: state.counters.selectedAccount, 
      boxName: state.counters.boxName, 
      selectedMsg: state.counters.selectedMsg, 
      boxData: state.counters.boxData, 
      selectedPage: state.counters.selectedPage, 
      countPages: state.counters.countPages, 
    };
  };
  
  // присоединяем (connect) компонент к хранилищу Redux
const MList = connect(mapStateToProps)(pure(IntMList));
  
export default MList;
  