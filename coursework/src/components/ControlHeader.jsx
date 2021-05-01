import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fragment from 'render-fragment';
import { pure } from 'recompose';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';
import SendIcon from '@material-ui/icons/Send';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

import { ACTION_TYPES, ACTION_MODE } from '../redux/countersAC';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function IntControlHeader(props) {
  const {type, mode} = props;
  const classes = useStyles();

  return (
    <div>
        <Button variant="contained" color="primary" size="medium" className={classes.button} endIcon={<SendIcon />} >
          { type == ACTION_TYPES.SendMsg ? "Send" : "Create" }
        </Button>
        <Button variant="contained" color="secondary" size="medium" className={classes.button} startIcon={<DeleteIcon />} >Delete</Button>
        <Button variant="contained" color="default" size="medium" className={classes.button} startIcon={<CachedIcon />} >Refresh</Button>
    </div>
  );
}

IntControlHeader.propTypes = {
  type: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
};

const mapStateToProps = function (state) {
    return {
      // из раздела Redux с именем counter свойство cnt будет доступно
      // данному компоненту как this.props.cnt
      type: state.counters.type, 
      mode: state.counters.mode,
    };
  };

// присоединяем (connect) компонент к хранилищу Redux
const ControlHeader = connect(mapStateToProps)(pure(IntControlHeader));

export default ControlHeader;
