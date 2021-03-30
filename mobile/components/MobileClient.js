import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';

class MobileClient extends React.PureComponent {

  static propTypes = {
    info:PropTypes.shape({
      id: PropTypes.number.isRequired,
      fam: PropTypes.string.isRequired,
      im: PropTypes.string.isRequired,
      otch: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
    modifyEvents: PropTypes.object.isRequired,
  };

  render() {
    const { fam, im, otch, balance } = this.props.info;

    console.log("MobileClient id="+this.props.info.id+" render");
    
    return (
      <tr>
        <td>{fam}</td>
        <td>{im}</td>
        <td>{otch}</td>
        <td>{balance}</td>
        { balance >= 0 ? <td className='active'>active</td> : <td className='blocked'>blocked</td> }
        <td>
          <input type="button" value="Редактировать" onClick={this.modifyClient} />
        </td>
        <td>
          <input type="button" value="Удалить" onClick={this.removeClient} />
        </td>
      </tr>
    );

  }

  modifyClient = () => {
    const { info, modifyEvents} = this.props;
    modifyEvents.emit('OnModifyClient', info);
  }

  removeClient = () => {
    const { info, modifyEvents} = this.props;
    modifyEvents.emit('OnRemoveClient', info);
  }

}

export default MobileClient;
