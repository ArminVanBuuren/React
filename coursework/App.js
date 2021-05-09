"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './app.css';
import MainPage from './src/core/MainPage.jsx';

ReactDOM.render(
  <BrowserRouter>
    <MainPage/>
  </BrowserRouter>
  , document.getElementById('container') 
);

