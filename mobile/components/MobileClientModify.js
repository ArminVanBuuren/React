import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

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

  componentDidMount = () => this.updateData();
  componentDidUpdate = () => this.updateData();

  updateData = () => {
    const { fam, im, otch, balance } = this.props.info;
    
    if (this.famRef)
      this.famRef.value = fam;
    if (this.imRef)
      this.imRef.value = im;
    if (this.otchRef)
      this.otchRef.value = otch;
    if (this.balanceRef)
      this.balanceRef.value = balance;

    this.prevBalValue = 0;
  }

  render() {
    const { id } = this.props.info;

    console.log("MobileClientModify id=" + id + " render");

    return (
      <div className='MobileClientModify'>
        <p>ID: {id}</p>

        <span>Фамилия</span>
        <input type='text' ref={ (ref) => this.famRef = ref } />

        <span>Имя</span>
        <input type='text' ref={ (ref) => this.imRef = ref }/>

        <span>Отчество</span>
        <input type='text' ref={ (ref) => this.otchRef = ref }/>
        
        <span>Баланс</span>
        <input type='text' onChange={this.checkBalance} onBlur={this.onFocusLost} ref={ (ref) => this.balanceRef = ref }  />
        
        <input type='button' value='OK' onClick={this.commitClient}  /> 

      </div>
    );

  }

  checkBalance = (EO) => {
    const {value} = EO.target;

    if  ( !/^-?\d*$/.test(value) ){
      this.balanceRef.value = this.prevBalValue;
    }

    this.prevBalValue = this.balanceRef.value;
  }

  onFocusLost = () => {
    if (this.balanceRef.value == "" || this.balanceRef.value == "-"){
      this.balanceRef.value = this.prevBalValue = 0;
    }
  }

  commitClient = () => {
    let current = Immutable.Map(this.props.info);
    let newData = current;

    if (this.famRef)
      newData = newData.set('fam', this.famRef.value);
    if (this.imRef)
      newData = newData.set('im', this.imRef.value);
    if (this.otchRef)
      newData = newData.set('otch', this.otchRef.value);
    if (this.balanceRef)
      newData = newData.set('balance', parseInt(this.balanceRef.value));

    modifyEvents.emit('OnCommitClient', current === newData ? null : newData.toJS());
  }

}

export default MobileClientModify;
