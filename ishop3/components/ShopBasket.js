import React from 'react';
import PropTypes from 'prop-types';

import './ShopBasket.css';

import ShopProduct from './ShopProduct';
import ShopProductInfo from './ShopProductInfo';
import ShopProductModify from './ShopProductModify';

const ChangeModes = {
    None: 'None',
    Create: 'Create',
    Edit: 'Edit',
};

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
        mode: ChangeModes.None,
        shopItems: this.props.shopItems,
    };
    
    render() {

        let models = [];
        let bag = [];
        let selectedItem = null;
        let curSelectedItem = this.state.selectedItem;
        let curOnItemClicked = this.onItemClicked;
        let curOnItemEdited = this.onItemEdited;
        let curOnItemRemoved = this.onItemRemoved;

        this.state.shopItems.forEach(group => {
            
            models.push(group.name);
            let items = [];
            group.value.forEach(item => {

                    let itemId = group.name + '_' + item.id;
                    if (this.state.removedItems.hasOwnProperty(itemId))
                        return;

                    let newItem = { ...item, itemId, model:group.name };
                    let shopProduct = <ShopProduct
                                        key={itemId}
                                        isSelected={curSelectedItem === itemId}
                                        cbItemClicked={curOnItemClicked}
                                        cbItemEdited={curOnItemEdited}
                                        cbItemRemoved={curOnItemRemoved}
                                        {...newItem}
                                        />

                    if (!selectedItem && curSelectedItem === itemId)
                        selectedItem = newItem;

                    items.push(shopProduct);
                }
            );

            bag.push(
                <div key={group.name} className='Group'>
                    <h3>{group.name}</h3>
                    {items}
                </div>
            );

        });

        return (
            <div className='ShopBasket'>
                {bag}
                <input type='button' value='New product' onClick={this.onItemCreated} />
                { selectedItem && this.state.mode === ChangeModes.None && <ShopProductInfo {...selectedItem} />  }
                { selectedItem && this.state.mode === ChangeModes.Edit && <ShopProductModify cbOnCommit={this.onItemCommit} models={models} item={selectedItem} />  }
                { this.state.mode === ChangeModes.Create && <ShopProductModify cbOnCommit={this.onItemCommit} models={models} />  }
            </div>
        );
    }

    onItemClicked = (itemId) => { 
        this.setState( {selectedItem:itemId} );
    }

    onItemRemoved = (itemId) => { 
        this.state.removedItems[itemId] = true;
        this.setState( {removedItems: this.state.removedItems} );
    }

    onItemCreated = (EO) => {
        this.setState( {
            mode: ChangeModes.Create,
        } );
    }

    onItemEdited = (itemId) => {
        this.setState( {
            selectedItem: itemId,
            mode: ChangeModes.Edit,
        } );
    }

    onItemCommit = (newItem) => {

        let group = this.state.shopItems.find(item => item.name === newItem.model);
    
        if (this.state.mode === ChangeModes.Edit){
            let items = group.value.filter(x => x.id !== newItem.id);
            items.push(this.getItem(newItem.id, newItem));
            group.value = items;
        }
        else{
            let maxId = 0;
            group.value.forEach(item => {
                maxId = item.id > maxId ? item.id : maxId;
            });
            maxId++;
            group.value.push(this.getItem(maxId, newItem));
        }

        this.setState({ 
            shopItems: this.state.shopItems,
            mode: ChangeModes.None, 
        });
    }
    
    getItem(itemId, newItem){
        return {
            id: itemId,
            name: newItem.name,
            price: newItem.price,
            count: newItem.count,
            img: newItem.img,
        };
    }
}

export default ShopBasket;