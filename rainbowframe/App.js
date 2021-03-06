"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Fragment from 'render-fragment';

import './app.css';
import RainbowFrame from './components/rainbowframe.jsx';

let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];

ReactDOM.render(
    (<RainbowFrame colors={colors} >
        Hello!
    </RainbowFrame>)
    , document.getElementById('container')
);
