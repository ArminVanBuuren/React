import React from 'react';
import PropTypes from 'prop-types';

import './ShopProduct.css';

class ShopProduct extends React.Component {

    static propTypes = {
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired,
      cbItemClicked: PropTypes.func.isRequired,
      cbItemRemoved: PropTypes.func.isRequired,
    };
  
    state = {

    };

    render() {
      return (
        <div className={ this.props.isSelected ? 'ShopProduct selected' : 'ShopProduct' } onClick={this.onItemClicked}>
          <img src={this.props.img} />
          <span className='Name'>{this.props.name}</span>
          <span className='Count'>{this.props.count}</span>
          <span className='Price'>{this.props.price}</span>
          <input className='Button' type='button' value='Remove' onClick={this.onItemRemoved} />
        </div>
      );
    }

    onItemClicked = (EO) => { 
      if (this.props.cbItemClicked)
          this.props.cbItemClicked(this.props.id);
    }

    onItemRemoved = (EO) => { 
      if (this.props.cbItemRemoved)
          this.props.cbItemRemoved(this.props.id);
    }
  
}

export default ShopProduct;