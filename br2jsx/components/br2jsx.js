import React, {Fragment} from 'react';
import './br2jsx.css';

export default props => {
    let bag = [];
    let items = props.text.split(/\<br\s*\/?\>*/);
    let i = 0;
    items.forEach(element => {
        i++;
        bag.push(element);
        if (i < items.length)
            bag.push(<br key={i}/>);
    });
    return <div className='br2jsx'>{bag}</div>

    // return <div className='br2jsx'>{props.text.split(/\<br\s*\/?\>*/).map(x => {
    //     return (<Fragment key={x}>
    //         {x}<br/>
    //     </Fragment>)
    // })}</div>

}