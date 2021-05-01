import React from 'react';
import PropTypes from 'prop-types';
import Fragment from 'render-fragment';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class intPagesRouter extends React.PureComponent {

  static propTypes = {
        selectedBox: PropTypes.number.selectedBox,
        mid: PropTypes.number.mid,
        data: PropTypes.array.isRequired, // получено из Redux
  };

  render() {
    const {selectedBox, mid, data} = this.props;

    return (
      
      <Fragment>
        <Route path="/" exact component={MainClient} />
        <Route path="/inbox" component={MainClient} />
        <Route path="/inbox/:mid" component={MainClient} />
        <Route path="/outbox" component={MainClient} />
        <Route path="/outbox/:mid" component={MainClient} />
      </Fragment>

    );

  }

}

const mapStateToProps = function (state) {
  return {
    // из раздела Redux с именем counter свойство cnt будет доступно
    // данному компоненту как this.props.cnt
    boxId: state.counter.selectedBox, 
    msgId: state.counter.mid,
    data: state.counter.data,
  };
};

// присоединяем (connect) компонент к хранилищу Redux
const PagesRouter = connect(mapStateToProps)(intPagesRouter);

export default PagesRouter;
