
import React from 'react';
import Fragment from 'render-fragment';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';

//import { withDataLoad } from './withDataLoad.js';

import combinedReducer from '../redux/reducers.js';
import PagesRouter from './PagesRouter.jsx';
import MClient from '../components/MClient.jsx';

import { BrowserRouter } from 'react-router-dom';

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
