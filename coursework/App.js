"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import './app.css';
import MainPage from './src/core/MainPage.jsx';


//let data = require('./data.json');

ReactDOM.render(
  <BrowserRouter>
    <MainPage/>
  </BrowserRouter>
  , document.getElementById('container') 
);

