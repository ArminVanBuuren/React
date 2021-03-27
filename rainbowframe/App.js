"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Fragment from 'render-fragment';

import './app.css';
import RainbowFrame from './components/rainbowframe.jsx';
import { withRainbowFrame } from './components/withRainbowFrame.js';

let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];

let FramedFragment = withRainbowFrame(colors)(Fragment);


// ReactDOM.render(
//     (<RainbowFrame colors={colors} >
//         Hello!
//     </RainbowFrame>)
//     , document.getElementById('container')
// );


ReactDOM.render(
    (<FramedFragment>
        Hello!
    </FramedFragment>)
    , document.getElementById('container')
);

