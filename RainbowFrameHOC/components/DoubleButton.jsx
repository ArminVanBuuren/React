import React from 'react';
import PropTypes from 'prop-types';

import './DoubleButton.css';

class DoubleButton extends React.Component{
    
    static propTypes = {
        caption1: PropTypes.string.isRequired,
        caption2: PropTypes.string.isRequired,
        cbPressed: PropTypes.func.isRequired,
      };

    render(){
        const {caption1, caption2, cbPressed, children} = this.props;
        
        return (
            <div className='DoubleButton'>
                <input type='button' value={caption1} onClick={ () => cbPressed(1) } />
                {children}
                <input type='button' value={caption2} onClick={ () => cbPressed(2) } />
            </div>
        );
    }

}

export default DoubleButton;
