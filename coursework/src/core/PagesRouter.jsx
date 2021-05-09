import React from 'react';
import { browserHistory, Router, Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import Fragment from 'render-fragment';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { LoaderFragment } from '../components/Wrapper.jsx';
import MClient from '../components/MClient.jsx';
import { mailItemsFetchAC } from '../redux/fetchThunk';
import { ACTION_TYPES, ACTION_MODE, selectAct } from '../redux/countersAC';

class intPagesRouter extends React.PureComponent {

  static propTypes = {
    mode: PropTypes.string.isRequired, // получено из Redux
    mailData: PropTypes.array.isRequired, // получено из Redux
  };

  componentDidMount() {
    console.log(2);
    this.props.dispatch( mailItemsFetchAC(this.props.dispatch) );
  }

  render() {
    const { mode, mailData } = this.props;
    const routes = [];

    if (mode === ACTION_MODE.Error)
      return "ошибка загрузки...";
    
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
    console.log(mode);
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
    mode: state.counters.mode,
    mailData: state.counters.mailData,
  };
};

// присоединяем (connect) компонент к хранилищу Redux
const PagesRouter = connect(mapStateToProps)(intPagesRouter);

export default PagesRouter;
