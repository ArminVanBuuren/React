
import React from 'react';
import Fragment from 'render-fragment';
import { Provider } from 'react-redux';

//import { withDataLoad } from './withDataLoad.js';

import combinedReducer from '../redux/reducers.js';
import MClient from '../components/MClient.jsx';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
let store = createStore(combinedReducer, applyMiddleware(thunk));

class MainPage extends React.PureComponent {

  // fetchConfig = {
  //   URL: "http://fe.it-academy.by/TestFetch.php",
  //   method: 'post',
  //   headers: {
  //       "Accept": "application/json",
  //   },
  // };

  // HOC возвращает каждый раз НОВЫЙ, обёрнутый компонент
  // поэтому оборачивать в HOC лучше не внутри render, чтобы не рендерить каждый раз НОВЫЙ компонент
  //MClientWithData = withDataLoad(this.fetchConfig, "mailData")(MClient);

  render() {
    return (
      <Provider store={store}>
        <MClient />
      </Provider>
    );

  }

}

export default MainPage;
