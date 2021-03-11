import React from 'react';
import PropTypes from 'prop-types';

import './ShopProduct.css';

class ShopProduct extends React.Component {

    static propTypes = {
      item: PropTypes.shape({
        itemId: PropTypes.string.isRequired,
        applianceType: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
      }),
      
      isSelected: PropTypes.bool.isRequired,
      isModifying: PropTypes.bool.isRequired,
      cbItemClicked: PropTypes.func.isRequired,
      cbItemEdited: PropTypes.func.isRequired,
      cbItemRemoved: PropTypes.func.isRequired,
    };
  
    state = {

    };

    render() {
      const {img, name, count, price} = this.props.item;

      return (
        <div className={ this.props.isSelected ? 'ShopProduct selected' : 'ShopProduct' } onClick={this.onItemClicked}>
          <img src={img} />
          <span className='Name'>{name}</span>
          <span className='Count'>{count}</span>
          <span className='Price'>{price}</span>
          <input className='Button' type='button' value='Edit' onClick={this.onItemEdit} disabled={this.props.isModifying} />
          <input className='Button' type='button' value='Remove' onClick={this.onItemRemoved} disabled={this.props.isModifying} />
        </div>
      );
    }

    onItemClicked = (EO) => { 
      this.props.cbItemClicked(this.props.item.itemId);
    }

    onItemEdit = (EO) => {
      EO.stopPropagation();
      this.props.cbItemEdited(this.props.item.itemId);
    }

    onItemRemoved = (EO) => {
      EO.stopPropagation();
      this.props.cbItemRemoved(this.props.item)
    }
  
}

export default ShopProduct;