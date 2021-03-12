import React from 'react';
import './rainbowframe.css';

class RainbowFrame extends React.Component {

    render(){
        const { colors } = this.props;

        return (<div className='rainbowframe'>
            {colors.length > 0 && this.getChildsDiv(colors.reverse(), 0)}
        </div>);
    }

    getChildsDiv = (arrColor, index) => 
        (index >= arrColor.length
        ? this.props.children
        : <div style={ { borderColor: arrColor[index] } }>{this.getChildsDiv(arrColor, ++index)}</div>);
}

export default RainbowFrame;