import React from 'react';
import PropTypes from 'prop-types';

class ShopProductInfo extends React.Component {

    static propTypes = {
        applianceType: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
    };
  
    state = {

    };

    render() {
      return (
        <div>
            <h2>{this.props.applianceType}: {this.props.name}</h2>
            <p>Quantity: {this.props.count}</p>
            <p>Price: {this.props.price}$</p>
        </div>
      );
    }


}

export default ShopProductInfo;