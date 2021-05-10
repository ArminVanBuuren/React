import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pure } from 'recompose';

import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import Label from '@material-ui/icons/Label';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.object.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    paddingTop: 10
  },
});

function IntMTreeView(props) {
  const { treeData, dispatch, history } = props;
  const classes = useStyles();

  return (
    <TreeView
        className={classes.root}
        defaultExpanded={['1']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        onNodeSelect={(EO, nodeId) => {
          for (const mail of treeData) {
            if (nodeId in mail.boxes) {
              //dispatch(selectAct(mail.account.id, mail.boxes[nodeId].name, -1));
              let box = mail.boxes[nodeId];
              history.push(`/${mail.account.id}/${box.name}/${box.mails.length > 0 ? box.mails[0].msgId : ""}`);
              break;
            }
          }
        }}
        >

        {
          treeData.map( (mail, index) => {
            return (
              <StyledTreeItem key={mail.account.id} nodeId={mail.account.id.toString()} labelText={mail.account.name} labelIcon={Label}>
                { Object.keys(mail.boxes).map(boxKey => {
                  let value = mail.boxes[boxKey];
                  return (<StyledTreeItem
                            key={boxKey}
                            nodeId={boxKey}
                            labelText={value.name}
                            labelInfo={value.mails.length.toString()}
                            labelIcon={MailIcon}
                            color="#1a73e8"
                            bgColor="#e8f0fe" 
                            />);
                } ) }
              </StyledTreeItem>
            )
          })
        }

      </TreeView>
  );
}

IntMTreeView.propTypes = {
  treeData: PropTypes.array.isRequired,
};


const mapStateToProps = function (state) {
  return {
    // из раздела Redux с именем counter свойство cnt будет доступно
    // данному компоненту как this.props.cnt
    treeData: state.counters.treeData,
  };
};

// присоединяем (connect) компонент к хранилищу Redux
const MTreeView = connect(mapStateToProps)(pure(IntMTreeView));

export default MTreeView;
