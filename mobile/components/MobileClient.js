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
  };

  render() {
    const { fam, im, otch, balance } = this.props.info;

    console.log("MobileClient id="+this.props.info.id+" render");
    
    return (
      <div className='MobileClient'>
        <span>{fam}</span>
        <span>{im}</span>
        <span>{otch}</span>
        <span>{balance}</span>
        <span className={ balance >= 0 ? 'active' : 'blocked' } ></span>
        <div>
          <input type="button" value="Редактировать" onClick={this.modifyClient} />
        </div>
        <div>
          <input type="button" value="Удалить" onClick={this.removeClient} />
        </div>
      </div>
    );

  }

  modifyClient = () => {
    modifyEvents.emit('OnModifyClient', this.props.info);
  }

  removeClient = () => {
    modifyEvents.emit('OnRemoveClient', this.props.info);
  }

}

export default MobileClient;
