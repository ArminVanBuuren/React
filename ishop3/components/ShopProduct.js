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
      isEditing: PropTypes.bool.isRequired,
      cbItemClicked: PropTypes.func.isRequired,
      cbItemEdited: PropTypes.func.isRequired,
      cbItemRemoved: PropTypes.func.isRequired,
    };
  
    state = {

    };

    render() {
      return (
        <div className={ this.props.isSelected ? 'ShopProduct selected' : 'ShopProduct' } onClick={this.onItemClicked}>
          <img src={this.props.item.img} />
          <span className='Name'>{this.props.item.name}</span>
          <span className='Count'>{this.props.item.count}</span>
          <span className='Price'>{this.props.item.price}</span>
          <input className='Button' type='button' value='Edit' onClick={this.onItemEdit} disabled={this.props.isEditing} />
          <input className='Button' type='button' value='Remove' onClick={this.onItemRemoved} disabled={this.props.isEditing} />
        </div>
      );
    }

    onItemClicked = (EO) => { 
      if (this.props.cbItemClicked)
          this.props.cbItemClicked(this.props.item.itemId);
    }

    onItemEdit = (EO) => {
      if (this.props.cbItemEdited){
        EO.stopPropagation();
        this.props.cbItemEdited(this.props.item.itemId);
      }
    }

    onItemRemoved = (EO) => {
      if (this.props.cbItemRemoved){
        EO.stopPropagation();
        this.props.cbItemRemoved(this.props.item);
      }
    }
  
}

export default ShopProduct;