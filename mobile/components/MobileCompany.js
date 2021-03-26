import React from 'react';
import PropTypes from 'prop-types';
import Fragment from 'render-fragment';

import {modifyEvents} from './events';

import MobileClient from './MobileClient';
import MobileClientModify from './MobileClientModify';

import './MobileCompany.css';

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
        selectedCompany: this.props.data[0].name,
        data: this.props.data,
      };
    }
    else{
      this.state = {
        selectedCompany: "",
        data: [],
      };
    }
  }

  componentDidMount = () => {
    modifyEvents.addListener('OnModify',this.modifyClient);
    modifyEvents.addListener('OnRemove',this.removeClient);
    modifyEvents.addListener('OnCommit',this.updateData);
  };

  componentWillUnmount = () => {
    modifyEvents.removeListener('OnModify',this.modifyClient);
    modifyEvents.removeListener('OnRemove',this.removeClient);
    modifyEvents.removeListener('OnCommit',this.updateData);
  };

  render() {
    console.log("MobileCompany render");
    
    const {selectedCompany, data} = this.state;
    let company = data.find(d => d.name == selectedCompany);

    return (
      <Fragment>

        {data.map(c => <input key={c.name} type="button" value={c.name} onClick={()=>this.changeOperator(c.name)} />)}
        <p>Компания: {selectedCompany}</p>

        <input type="button" value="Все" onClick={()=>this.changeShownClients(1)} />
        <input type="button" value="Активные" onClick={()=>this.changeShownClients(2)} />
        <input type="button" value="Заблокированные" onClick={()=>this.changeShownClients(3)} />

        { company.clients.map(client => <MobileClient key={client.id} info={client} /> )}

        <input className='AddClient' type="button" value="Добавить клиента" onClick={this.createClient} />

      </Fragment>
    );
  }

  changeOperator = (name) => {
    this.setState({selectedCompany:name});
  };

  changeShownClients = (mode) =>{

  }

  createClient = () => {
    const {data} = this.props;
    const {selectedCompany} = this.state;

    let company = data.find(d => d.name == selectedCompany);

    let maxId = 0;
    company.clients.forEach(client => { maxId = client.id > maxId ? client.id : maxId; });
    maxId++;

  }

  modifyClient = (client) => {

  }

  removeClient = (client) => {

  }

  updateData = (client) => {
      
  }

}

export default MobileCompany;
