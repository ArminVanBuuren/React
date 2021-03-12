import React from 'react';
import Fragment from 'render-fragment';
import './br2jsx.css';

export default props => {
    let items = props.text.split(/\<br\s*\/?\>/);
    return (
    <div className='br2jsx'>{items.map( (x, index) =>
        <Fragment key={index}>
            {x}
            { items.length - 1 > index && <br/>}
        </Fragment>)}
    </div>);
}