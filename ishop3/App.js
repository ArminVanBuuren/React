"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import ShopBasket from './components/ShopBasket';

let basketItems = require('./basket-data.json');

ReactDOM.render(
    <ShopBasket shopItems={basketItems.groups} /> 
    , document.getElementById('container')
);