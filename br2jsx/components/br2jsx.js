import React, {Fragment} from 'react';
import './br2jsx.css';

export default props => {
    let bag = [];
    props.text.split(/\<br\s*\/?\>*/).forEach(element => {
        bag.push(element);
        bag.push(<br/>);
    });
    return <div className='br2jsx'>{bag}</div>

    // return <div className='br2jsx'>{props.text.split(/\<br\s*\/?\>*/).map(x => {
    //     return (<Fragment key={x}>
    //         {x}<br/>
    //     </Fragment>)
    // })}</div>

}