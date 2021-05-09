import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fragment from 'render-fragment';
import { pure } from 'recompose';

import Button from '@material-ui/core/Button';
import CachedIcon from '@material-ui/icons/Cached';
import SendIcon from '@material-ui/icons/Send';
import Icon from '@material-ui/core/Icon';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import EmailIcon from '@material-ui/icons/Email';
import Badge from "@material-ui/core/Badge";

import { mailItemsFetchAC } from '../redux/fetchThunk';

import { ACTION_TYPES, ACTION_MODE, searchingTextAct } from '../redux/countersAC';

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
  const { boxName, dispatch } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>{boxName}</Typography>
          <IconButton color="inherit" disabled={!boxName} >
            <EmailIcon />
          </IconButton>
          <IconButton  color="inherit" onClick={(EO) => { dispatch( mailItemsFetchAC(dispatch) ); }}>
            <CachedIcon />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon color="inherit" />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{root: classes.inputRoot, input: classes.inputInput, }}
              inputProps={{ "aria-label": "search" }}
              onChange={(EO) => { dispatch(searchingTextAct(EO.target.value)) }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

IntControlHeader.propTypes = {
  boxName: PropTypes.string.isRequired,
};

const mapStateToProps = function (state) {
    return {
      // из раздела Redux с именем counter свойство cnt будет доступно
      // данному компоненту как this.props.cnt
      boxName: state.counters.boxName,
    };
  };

// присоединяем (connect) компонент к хранилищу Redux
const ControlHeader = connect(mapStateToProps)(pure(IntControlHeader));

export default ControlHeader;
