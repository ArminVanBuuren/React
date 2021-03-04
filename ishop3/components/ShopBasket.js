import React from 'react';
import PropTypes from 'prop-types';

import './ShopBasket.css';

class ShopBasket extends React.Component {

    static propTypes = {
        shopItems: PropTypes.object.isRequired,
    };
    
    state = {
        selectedItem: "-1",
    };
    
    render() {
      return <div>test</div>;
    }
  
}

export default ShopBasket;