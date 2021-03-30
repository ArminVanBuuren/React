import React from 'react';
import PropTypes from 'prop-types';
import Fragment from 'render-fragment';
import {EventEmitter} from 'events';

import MobileClient from './MobileClient';
import MobileClientModify from './MobileClientModify';

import './MobileCompany.css';

const displayModes = Object.freeze({
  All: 'All',
  Active: 'Active',
  Blocked: 'Blocked',
});

const modifyModes = Object.freeze({
  None: 'None',
  Create: 'Create',
  Edit: 'Edit'
});

class MobileCompany extends React.PureComponent {

  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        clients:PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            fam: PropTypes.string.isRequired,
            im: PropTypes.string.isRequired,
            otch: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
          })
        ),
      })
    )
  };

  constructor(props) {
    super(props);
    
    this.modifyEvents = new EventEmitter();

    if (this.props.data.length > 0) {
      this.state = {
        modifyMode: modifyModes.None,
        clientOnChange: null,
        selectedCompany: this.props.data[0].name,
        clients: this.props.data[0].clients,
        data: this.props.data,
        filterFunc: null,
      };
    }
    else{
      this.state = {
        modifyMode: modifyModes.None,
        clientOnChange: null,
        selectedCompany: "",
        clients: [],
        data: [],
        filterFunc: null,
      };
    }
  }

  modifyEvents = null;

  componentDidMount = () => {
    this.modifyEvents.addListener('OnModifyClient',this.modifyClient);
    this.modifyEvents.addListener('OnRemoveClient',this.removeClient);
    this.modifyEvents.addListener('OnCommitClient',this.updateData);
  };

  componentWillUnmount = () => {
    this.modifyEvents.removeListener('OnModifyClient',this.modifyClient);
    this.modifyEvents.removeListener('OnRemoveClient',this.removeClient);
    this.modifyEvents.removeListener('OnCommitClient',this.updateData);
  };

  render() {
    console.log("MobileCompany render");

    const {clientOnChange, selectedCompany, clients, data, filterFunc} = this.state;

    // filteredClients.filter(c => clients.includes(c)) - array intersection in javascript - другой способ если filteredClients массив
    const displayClients = filterFunc ? clients.filter(c => filterFunc(c)) : clients;

    return (
      <Fragment>

        {/* {data.map(c => <input key={c.name} type="button" value={c.name} onClick={()=>this.changeOperator(c.name)} />)} */}
        <p>Компания: {selectedCompany}</p>

        <input type="button" value="Все" onClick={()=>this.changeShownClients(displayModes.All)} />
        <input type="button" value="Активные" onClick={()=>this.changeShownClients(displayModes.Active)} />
        <input type="button" value="Заблокированные" onClick={()=>this.changeShownClients(displayModes.Blocked)} />

        <table className='MobileCompanyTable'>
          <thead>
            <tr>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Баланс</th>
              <th>Статус</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
          { displayClients.map(client => <MobileClient key={client.id} info={client} modifyEvents={this.modifyEvents} /> )}
          </tbody>
        </table>

        <input className='AddClient' type="button" value="Добавить клиента" onClick={this.createClient} />

        { clientOnChange && <MobileClientModify info={clientOnChange} modifyEvents={this.modifyEvents} /> }

      </Fragment>
    );
  }

  changeOperator = (newName) => {
    const {selectedCompany, clients, data} = this.state;

    let newData = [...data];
    newData.find(d => d.name == selectedCompany).clients = clients;

    this.setState({
      modifyMode:modifyModes.None,
      clientOnChange:null, 
      selectedCompany:newName, 
      clients:data.find(d => d.name == newName).clients,
      data: newData,
      filterFunc: null
    });
  };

  changeShownClients = (mode) =>{
    switch (mode) {
      case displayModes.All:
        this.setState({filterFunc:null});
        break;
      case displayModes.Active:
        this.setState({filterFunc: (c) => c.balance >= 0 });
        break;
      case displayModes.Blocked:
        this.setState({filterFunc: (c) => c.balance < 0 });
        break;
    }
  }

  createClient = () => {
    const {clientOnChange, clients} = this.state;
    let maxId = 0;

    clients.forEach(client => { maxId = client.id > maxId ? client.id : maxId; });
    maxId++;

    if (clientOnChange && clientOnChange.id === maxId)
      return;

    this.setState({modifyMode:modifyModes.Create, clientOnChange:{id:maxId, fam:"", im: "", otch: "", balance: 0}});
  }

  modifyClient = (client) => {
    this.setState({modifyMode:modifyModes.Edit, clientOnChange:client});
  }

  removeClient = (client) => {
    let clients = this.state.clients;

    this.setState({clients:clients.filter(c => c.id !== client.id)});
  }

  updateData = (client) => {
    const { modifyMode, clients } = this.state;

    // если ничего у клиента не поменяли, то закрываем фарму редактирования
    if (client === null || modifyMode === modifyModes.None){
      this.setState({modifyMode:modifyModes.None, clientOnChange:null});
      return;
    }
    
    let newClients = [...clients];

    switch (modifyMode) {

      case modifyModes.Create:
        newClients.push(client);
        this.setState({modifyMode:modifyModes.None, clientOnChange:null, clients:newClients});
        break;

      case modifyModes.Edit:
        for(var i = 0; i < newClients.length; i++) {
          if (newClients[i].id === client.id){
            newClients[i] = client;
            break;
          }
        }
        this.setState({modifyMode:modifyModes.None, clientOnChange:null, clients:newClients});
        break;
    }
  }

}

export default MobileCompany;
