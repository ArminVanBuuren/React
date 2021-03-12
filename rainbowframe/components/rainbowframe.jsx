import React from 'react';
import './rainbowframe.css';

class RainbowFrame extends React.Component {

    render(){
        const { colors } = this.props;

        return <div className='rainbowframe'>
            {this.getChildsDiv(colors, 0)}
        </div>
    }

    getChildsDiv = (arrColor, index) => {
        return (
            arrColor.length > 0 &&
                arrColor.length <= index 
                ? this.props.children
                : <div style={ { borderColor: arrColor[index] } }>{this.getChildsDiv(arrColor, ++index)}</div>
        )
    }
}

export default RainbowFrame;