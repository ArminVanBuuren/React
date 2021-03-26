import React from 'react';
import PropTypes from 'prop-types';

import {modifyEvents} from './events';

import './MobileClientModify.css';

class MobileClientModify extends React.PureComponent {

  static propTypes = {
    info:PropTypes.shape({
      id: PropTypes.number.isRequired,
      fam: PropTypes.string.isRequired,
      im: PropTypes.string.isRequired,
      otch: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
  };
  
  famRef = null;
  imRef = null;
  otchRef = null;
  balanceRef = null;
  prevBalValue = 0; 

  render() {

    const { id, fam, im, otch, balance } = this.props;

    console.log("MobileClientModify id=" + id + " render");

    return (
      <div className='MobileClientModify'>
        
        <span>Фамилия</span>
        <input type='text' defaultValue={fam} ref={ (ref)=> famRef = ref } />

        <span>Имя</span>
        <input type='text' defaultValue={im} ref={ (ref)=> imRef = ref }/>

        <span>Отчество</span>
        <input type='text' defaultValue={otch} ref={ (ref)=> otchRef = ref }/>

        <span>Баланс</span>
        <input type='text' defaultValue={balance} onChange={this.checkBalance} ref={ (ref)=> balanceRef = ref } />

        <input type='button' value='Edit' onClick={this.commitClient} /> 

      </div>
    );

  }

  checkBalance = (EO) => {
    const {value} = EO.target;

    if  ( !/^\d+$/.test(value) ){
      balanceRef.value = prevBalValue;
    }

    prevBalValue = balanceRef.value;
  }

  commitClient = () => {
    modifyEvents.emit('OnCommitClient', {...this.props.info, fm:famRef.value, im: imRef.value, otch: otchRef.value, balance:balanceRef.value });
  }

}

export default MobileClientModify;
