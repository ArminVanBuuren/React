import React from 'react';

import './withRainbowFrame.css';

let withRainbowFrame = colors => Component => props => {
    let result = <Component {...props} />;
    colors.forEach( (c, i) => result = <div className={ i == colors.length -1 ? 'rainbowframe' : ''} style={{borderColor:c}}>{result}</div>);
    return result;
};

export { withRainbowFrame };
