import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pure } from 'recompose';

import CachedIcon from '@material-ui/icons/Cached';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import EmailIcon from '@material-ui/icons/Email';

import { mailItemsFetchAC } from '../redux/fetchThunk';

import { ACTION_TYPES, ACTION_MODE, searchingTextAct, createMessageAct } from '../redux/countersAC';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
}));

function IntControlHeader(props) {
  const { emulation, boxName, dispatch, searchingText } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>{boxName}</Typography>
          <IconButton id="createButton" color="inherit" disabled={!boxName} onClick={(EO) => { dispatch( createMessageAct({}) ); }} >
            <EmailIcon />
          </IconButton>
          <IconButton id="reloadButton" color="inherit" onClick={(EO) => { dispatch( mailItemsFetchAC(dispatch, emulation) ); }}>
            <CachedIcon />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon color="inherit" />
            </div>
            <InputBase
              id="searchText"
              placeholder="Search…"
              classes={{root: classes.inputRoot, input: classes.inputInput, }}
              inputProps={{ "aria-label": "search" }}
              value={searchingText == undefined ? "" : searchingText}
              onChange={(EO) => { dispatch(searchingTextAct(EO.target.value))  }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

IntControlHeader.propTypes = {
  emulation: PropTypes.bool,
  boxName: PropTypes.string.isRequired,
  searchingText: PropTypes.string,
};

const mapStateToProps = function (state) {
    return {
      // из раздела Redux с именем counter свойство cnt будет доступно
      // данному компоненту как this.props.cnt
      emulation: state.counters.emulation,
      boxName: state.counters.boxName,
      searchingText: state.counters.searchingText,
    };
  };

// присоединяем (connect) компонент к хранилищу Redux
const ControlHeader = connect(mapStateToProps)(pure(IntControlHeader));

export default ControlHeader;
