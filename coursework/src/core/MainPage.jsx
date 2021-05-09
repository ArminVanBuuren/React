
import React from 'react';
import { Provider } from 'react-redux';

import combinedReducer from '../redux/reducers.js';
import PagesRouter from './PagesRouter.jsx';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
let store = createStore(combinedReducer, applyMiddleware(thunk));

class MainPage extends React.PureComponent {

  render() {
    return (
      <Provider store={store}>
        <PagesRouter />
      </Provider>
    );
  }
}

export default MainPage;
