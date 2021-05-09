import React from 'react';
import { browserHistory, Router, Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import Fragment from 'render-fragment';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import MClient from '../components/MClient.jsx';
import { mailItemsFetchAC } from '../redux/fetchThunk';

class intPagesRouter extends React.PureComponent {

  static propTypes = {
    mailData: PropTypes.array.isRequired, // получено из Redux
  };

  componentDidMount() {
    this.props.dispatch( mailItemsFetchAC(this.props.dispatch) );
  }

  render() {
    const { mailData } = this.props;
    const routes = [];

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
    console.log(0);
    return (
      <BrowserRouter>
        { 
          // без div не работает роутер 
        }
        <div className="root">
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
    mailData: state.counters.mailData,
  };
};

// присоединяем (connect) компонент к хранилищу Redux
const PagesRouter = connect(mapStateToProps)(intPagesRouter);

export default PagesRouter;
