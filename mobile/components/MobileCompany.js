import React from 'react';
import PropTypes from 'prop-types';
import Fragment from 'render-fragment';

import {modifyEvents} from './events';

import MobileClient from './MobileClient';
import MobileClientModify from './MobileClientModify';

import './MobileCompany.css';

const DisplayModes = {
  All: 'All',
  Active: 'Active',
  Blocked: 'Blocked',
};

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
    
    if (this.props.data.length > 0) {
      this.state = {
        clientOnChange: null,
        selectedCompany: this.props.data[0].name,
        clients: this.props.data[0].clients,
        data: this.props.data,
        filter: null,
      };
    }
    else{
      this.state = {
        clientOnChange: null,
        selectedCompany: "",
        clients: [],
        data: [],
        filter: null,
      };
    }
  }

  componentDidMount = () => {
    modifyEvents.addListener('OnModifyClient',this.modifyClient);
    modifyEvents.addListener('OnRemoveClient',this.removeClient);
    modifyEvents.addListener('OnCommitClient',this.updateData);
  };

  componentWillUnmount = () => {
    modifyEvents.removeListener('OnModifyClient',this.modifyClient);
    modifyEvents.removeListener('OnRemoveClient',this.removeClient);
    modifyEvents.removeListener('OnCommitClient',this.updateData);
  };

  render() {
    console.log("MobileCompany render");

    const {clientOnChange, selectedCompany, clients, data, filter} = this.state;
    const displayClients = filter ? filter : clients;

    return (
      <Fragment>

        {data.map(c => <input key={c.name} type="button" value={c.name} onClick={()=>this.changeOperator(c.name)} />)}
        <p>Компания: {selectedCompany}</p>

        <input type="button" value="Все" onClick={()=>this.changeShownClients(DisplayModes.All)} />
        <input type="button" value="Активные" onClick={()=>this.changeShownClients(DisplayModes.Active)} />
        <input type="button" value="Заблокированные" onClick={()=>this.changeShownClients(DisplayModes.Blocked)} />

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
          { displayClients.map(client => <MobileClient key={client.id} info={client} /> )}
          </tbody>
        </table>

        <input className='AddClient' type="button" value="Добавить клиента" onClick={this.createClient} />

        { clientOnChange && <MobileClientModify info={clientOnChange} /> }

      </Fragment>
    );
  }

  changeOperator = (newName) => {
    const {selectedCompany, clients, data} = this.state;

    // так как проверка поверхностная, то ссылка на основной хэш компании не изменится
    data.find(d => d.name == selectedCompany).clients = clients;

    this.setState({
      clientOnChange:null, 
      selectedCompany:newName, 
      clients:data.find(d => d.name == newName).clients,
      data: [...data],
      filter: null
    });
  };

  changeShownClients = (mode) =>{
    const {clients} = this.state;

    switch (mode) {
      case DisplayModes.All:
        this.setState({filter:null});
        break;
      case DisplayModes.Active:
        this.setState({filter:clients.filter(c => c.balance >= 0)});
        break;
      case DisplayModes.Blocked:
        this.setState({filter:clients.filter(c => c.balance < 0)});
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

    this.setState({clientOnChange:{id:maxId, fam:"", im: "", otch: "", balance: 0}});
  }

  modifyClient = (client) => {
    this.setState({clientOnChange:client});
  }

  removeClient = (client) => {
    let clients = this.state.clients;

    this.setState({clients:clients.filter(c => c.id !== client.id)});
  }

  updateData = (client) => {

    // если клиент не изменился, то просто закрываем фарму редактирования
    if (client === null){
      this.setState({clientOnChange:null});
      return;
    }

    let clients = this.state.clients;
    let newClients = [];

    for(var i = 0; i < clients.length; i++) {
      if (clients[i].id === client.id){
        newClients = clients.slice();
        newClients[i] = client;
        break;
      }
    }

    if (newClients.length === 0 && clients.length > 0){
      newClients = clients.slice();
      newClients.push(client);
    }
    
    this.setState({clientOnChange:null, clients:newClients});
  }

}

export default MobileCompany;
