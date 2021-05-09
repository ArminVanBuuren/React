import React from 'react';
import PropTypes from 'prop-types';
import Fragment from 'render-fragment';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import MClient from '../components/MClient.jsx';

class intPagesRouter extends React.PureComponent {

  static propTypes = {
    mailData: PropTypes.array.isRequired, // получено из Redux
  };

  render() {
    const { mailData } = this.props;
    const routes = [];

    for (const mail of mailData) {
      let accountPath = "/" + mail.account.id;
      routes.push((<Route key={accountPath} path={accountPath} exact component={MClient} />));

      for (const box of mail.items) {
        let boxPath = accountPath + "/" + box.name;
        let msgPath = boxPath + "/:msgId";
        routes.push((<Route key={boxPath} path={boxPath} exact component={MClient} />));
        routes.push((<Route key={msgPath} path={msgPath} component={MClient} />));
      }
    }
    console.log(routes);
    
    return (
      <Fragment>
        <Route path="/" exact component={MClient} />
        { routes}
      </Fragment>
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
