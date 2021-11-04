
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import combinedReducer from '../redux/reducers.js';
import PagesRouter from './PagesRouter.jsx';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
let store = createStore(combinedReducer, applyMiddleware(thunk));

class MainPage extends React.PureComponent {

  static propTypes = {
    emulation: PropTypes.bool,
  };

  render() {
    return (
      <Provider store={store}>
        <PagesRouter emulation={this.props.emulation} />
      </Provider>
    );
  }
}

export default MainPage;
