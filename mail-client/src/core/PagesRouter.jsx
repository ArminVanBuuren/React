import React from 'react';
import { browserHistory, Router, Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { LoaderFragment } from '../components/Wrapper.jsx';
import MClient from '../components/MClient.jsx';
import { mailItemsFetchAC, mailItemsSyncAC } from '../redux/fetchThunk';
import { ACTION_TYPES, ACTION_MODE, selectAct } from '../redux/countersAC';

class intPagesRouter extends React.PureComponent {

  static propTypes = {
    emulation: PropTypes.bool,
    type: PropTypes.string.isRequired, // получено из Redux
    mode: PropTypes.string.isRequired, // получено из Redux
    mailData: PropTypes.array.isRequired, // получено из Redux
  };

  componentDidMount() {
    const { emulation, dispatch } = this.props;
    dispatch( mailItemsFetchAC(dispatch, emulation) );
  }

  render() {
    const { emulation, type, mode, mailData, dispatch } = this.props;
    const routes = [];

    if (mode === ACTION_MODE.Error)
      return "ошибка загрузки...";

    if (type === ACTION_TYPES.SendMsg){
      dispatch( mailItemsSyncAC(dispatch, mailData, emulation) );
      return (<LoaderFragment load={mode === ACTION_MODE.Processing} />);
    }
        
    
    for (const mail of mailData) {
      let accountPath = "/" + mail.account.id;
      routes.push((<Route key={accountPath} exact path={accountPath} component={MClient} />));

      for (const box of mail.items) {
        let boxPath = accountPath + "/" + box.name;
        let msgPath = boxPath + "/:msgId";
        routes.push((<Route key={boxPath} exact path={boxPath} component={MClient} />));
        routes.push((<Route key={msgPath} path={msgPath} component={MClient} />));
      }
    }
    
    return (
      <BrowserRouter>
        { 
          // без div не работает роутер 
        }
        <div className="root">
          <LoaderFragment load={mode === ACTION_MODE.Processing} />
          <Route exact path="/" component={MClient} />
          { routes}
        </div>
      </BrowserRouter>
    );
  }

}

const mapStateToProps = function (state) {
  return {
    // из раздела Redux с именем counter свойство cnt будет доступно
    // данному компоненту как this.props.cnt
    type: state.counters.type,
    mode: state.counters.mode,
    mailData: state.counters.mailData,
  };
};

// присоединяем (connect) компонент к хранилищу Redux
const PagesRouter = connect(mapStateToProps)(intPagesRouter);

export default PagesRouter;
