"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Fragment from 'render-fragment';

import './app.css';
import { withRainbowFrame } from './components/withRainbowFrame.jsx';
import DoubleButton from './components/DoubleButton.jsx';

let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];

let FramedFragment = withRainbowFrame(colors)(DoubleButton);

ReactDOM.render(
    (<Fragment>
        <DoubleButton caption1="однажды" caption2="пору" cbPressed={ num => alert(num) } >в студёную зимнюю</DoubleButton>
        <FramedFragment caption1="я из лесу" caption2="мороз" cbPressed={ num => alert(num) }>
            вышел, был сильный
        </FramedFragment>
    </Fragment>)
    , document.getElementById('container')
);

