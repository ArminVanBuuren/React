import React, { useTransition, useState, useEffect, Fragment } from 'react';
import { useSpring, animated, useTrail, config } from 'react-spring';
import PropTypes from 'prop-types';
import './Wrapper.css';

function LoaderComponent(prop) {
  const trail = useTrail(1, {
    config: {...config, duration: 500 },
    opacity: prop.load ? 1 : 0,
    zIndex: prop.load ? 1000 : -1,
    from: { opacity: 0},
  });
  
  return trail.map(({ ...rest }, index) => (<animated.div id="waiting" key={index} style={{ ...rest, }} >{prop.children}</animated.div>));
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

class Wrapper extends React.PureComponent {

  static propTypes = {
    load: PropTypes.bool.isRequired,
  };

  render(){
    const { load, children } = this.props;
    return (
      <Fragment>
        <LoaderFragment load={load} />
        <div className='root' >{children}</div>
      </Fragment>
    );
  }
}

export default Wrapper;