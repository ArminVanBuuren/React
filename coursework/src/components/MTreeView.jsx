import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
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


class StyledTreeItem extends React.PureComponent {

  static propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.object,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string,
  };

  render() {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = this.props;

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

}

class intMTreeView extends React.PureComponent {

  // получено из Redux
  static propTypes = {
    boxName: PropTypes.string.isRequired,
    mailData: PropTypes.array.isRequired,
  };

  render() {
    const {boxName, mailData} = this.props;
    let nodeId = 0;

    return (
      <TreeView
        className="TreeView"
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />} >

        {
          mailData.map( (account, index) => {
    
    
            console.log(account);
            let keyNode = 0;
            return (
              <StyledTreeItem key={account.id} nodeId={++nodeId} labelText={account.name} labelIcon={Label}>
                <StyledTreeItem
                            key={++keyNode}
                            nodeId={++nodeId}
                            labelText="Inbox"
                            labelIcon={MailIcon}
                            labelInfo={account.items.inbox.count}
                            color="#1a73e8"
                            bgColor="#e8f0fe"
                          />
                <StyledTreeItem
                            key={++keyNode}
                            nodeId={++nodeId}
                            labelText="Outbox"
                            labelIcon={MailIcon}
                            labelInfo={account.items.outbox.count}
                            color="#3c8039"
                            bgColor="#e6f4ea"
                          />
              </StyledTreeItem>
            )
          })
        }

      </TreeView>

    );

  }

}

const mapStateToProps = function (state) {
  return {
    // из раздела Redux с именем counter свойство cnt будет доступно
    // данному компоненту как this.props.cnt
    boxName: state.counters.boxName, 
    mailData: state.counters.mailData,
  };
};

// присоединяем (connect) компонент к хранилищу Redux
const MTreeView = connect(mapStateToProps)(intMTreeView);

export default MTreeView;
