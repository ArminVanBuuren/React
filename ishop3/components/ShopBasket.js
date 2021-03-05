import React from 'react';
import PropTypes from 'prop-types';

import './ShopBasket.css';

import ShopProduct from './ShopProduct';

class ShopBasket extends React.Component {

    static propTypes = {
        shopItems: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                value: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.number.isRequired,
                        name: PropTypes.string.isRequired,
                        price: PropTypes.number.isRequired,
                        count: PropTypes.number.isRequired,
                        img: PropTypes.string.isRequired,
                    })).isRequired,
            })
          ),
    };

    state = {
        selectedItem: "-1",
        removedItems: {},
    };
    
    render() {

        let bag = [];
        let curSelectedItem = this.state.selectedItem;
        let curOnItemClicked = this.onItemClicked;
        let curOnItemRemoved = this.onItemRemoved;

        this.props.shopItems.forEach(group => {
            
            let items = [];
            group.value.forEach(item => {
                    let itemId = group.name + '_' + item.id;

                    if (this.state.removedItems.hasOwnProperty(itemId))
                        return;

                    items.push(
                        <ShopProduct
                            key={itemId}
                            id={itemId}
                            name={item.name}
                            price={item.price}
                            count={item.count}
                            img={item.img}
                            isSelected={curSelectedItem === itemId}
                            cbItemClicked={curOnItemClicked}
                            cbItemRemoved={curOnItemRemoved}
                            />
                        );
                }
            );

            bag.push(
                <div key={group.name} className='Group'>
                    <h3>{group.name}</h3>
                    {items}
                </div>
            );

        });

        return <div className='ShopBasket'>{bag}</div>;
    }

    onItemClicked = (itemId) => { 
        this.setState( {selectedItem:itemId} );
    }

    onItemRemoved = (itemId) => { 
        this.state.removedItems[itemId] = true;
        this.setState( {removedItems: this.state.removedItems} );
    }
}

export default ShopBasket;