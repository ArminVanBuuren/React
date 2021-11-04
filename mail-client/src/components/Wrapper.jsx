import React, { useTransition, useState, useEffect, Fragment } from 'react';
import { useSpring, animated, useTrail, config } from 'react-spring';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Wrapper.css';

import { ACTION_TYPES, ACTION_MODE } from '../redux/countersAC';
import { mailItemsFetchAC } from '../redux/fetchThunk';

function LoaderComponent(prop) {

  // const trail = useTrail(1, {
  //   config: {...config, duration: 500 },
  //   opacity: prop.load ? 1 : 0,
  //   zIndex: prop.load ? 1000 : -1,
  //   from: { opacity: 0},
  // });
  
  // return trail.map(({ ...rest }, index) => (<animated.div id="waiting" key={index} style={{ ...rest, }} >{prop.children}</animated.div>));

  let anim = prop.load 
  ? { from: { opacity: 0, zIndex: 1000 }, to: { opacity: 1, zIndex: 1000 }, } 
  : { from: { opacity: 1, zIndex: 1000 }, to: { opacity: 0, zIndex: -1 }, };

  const cnfg = useSpring({
    config: { duration: 500 },
    ...anim
  });

  return (<animated.div id="waiting" style={{ opacity: cnfg.opacity, zIndex: cnfg.zIndex }} >{prop.children}</animated.div>);
}

LoaderComponent.propTypes = {
    load: PropTypes.bool.isRequired,
};

// избыточный HOС, добавил просто чтобы был как пример
let withCircleFrame = count => Component => props => {
  let circles = null;
  for (let i = 0; i <= count; i++) {
    circles = <div className={ i == count ? 'loader-container' : 'loader-div'} >{circles}</div>
  }
  return (<Component {...props} >{circles}</Component>);
};

let LoaderFragment = withCircleFrame(4)(LoaderComponent);

class intWrapper extends React.PureComponent {

  static propTypes = {
    mode: PropTypes.string.isRequired,
  };

  render(){
    const { mode, children } = this.props;
    
    if (mode === ACTION_MODE.Error)
      return "ошибка загрузки...";
    
    return (
      <Fragment>
        {/* <LoaderFragment load={mode === ACTION_MODE.Processing} /> */}
        <div className='root' >{children}</div>
      </Fragment>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    // из раздела Redux с именем counter свойство cnt будет доступно
    // данному компоненту как this.props.cnt
    mode: state.counters.mode, 
  };
};

// присоединяем (connect) компонент к хранилищу Redux
const Wrapper = connect(mapStateToProps)(intWrapper);

export { LoaderFragment, Wrapper };