import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Fragment from 'render-fragment';
import { pure } from 'recompose';

import ControlHeader from './ControlHeader.jsx';
import MTreeView from './MTreeView.jsx';
import MEditor from './MEditor.jsx';

import { ACTION_TYPES, ACTION_MODE } from '../redux/countersAC';
import { mailItemsFetchAC } from '../redux/fetchThunk';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Paper, List, ListSubheader, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { deepOrange, green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0)
    },
    paper: {
      paddingBottom: 50,
      height: '100%'
    },
    list: {
      marginBottom: theme.spacing(2)
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
    const { boxData, selectedPage, countPages } = props;
    const classes = useStyles();
    let prevDate = null;

    return (
        <Fragment>
            <CssBaseline />
            <Paper square className={classes.paper}>
                <List className={classes.list}>
                {boxData.map((msg) => {
                    const name = msg.from.charAt(0).toUpperCase();
                    const date = msg.dateOfSent.split(' ')[0];
                    let dateChanged = prevDate !== date;
                    if (prevDate != date)
                        prevDate = date;

                    return (
                    <Fragment key={msg.msgId}>
                        {dateChanged && <ListSubheader className={classes.subheader}>{date}</ListSubheader>}
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar alt="Profile Picture" className={classes.rounded} >{name}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={msg.from} secondary={msg.subject} />
                        </ListItem>
                    </Fragment>
                )})}
                </List>
            </Paper>
        </Fragment>
    );
}

IntMList.propTypes = {
    boxData: PropTypes.array.isRequired,
    selectedPage: PropTypes.number.isRequired,
    countPages: PropTypes.number.isRequired,
};

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
const MList = connect(mapStateToProps)(pure(IntMList));
  
export default MList;
  