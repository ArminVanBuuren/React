"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import MobileCompany from './components/MobileCompany';

let data = require('./data.json');

ReactDOM.render(
  <MobileCompany data={data} />
  , document.getElementById('container') 
);

