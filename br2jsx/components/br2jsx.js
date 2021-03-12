import React from 'react';
import Fragment from 'render-fragment';
import './br2jsx.css';

export default props => {
    let items = props.text.split(/\<br\s*\/?\>*/);
    let i = 0;
    return (
    <div className='br2jsx'>{items.map(x =>
        <Fragment key={++i}>
            {x}
            { items.length > i && <br/>}
        </Fragment>)}
    </div>);
}