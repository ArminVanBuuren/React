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
                    let newItem = { ...item, itemId, model:group.name };

                    if (!selectedItem && curSelectedItem === itemId)
                        selectedItem = newItem;

                    items.push(
                        <ShopProduct
                                key={itemId}
                                item={newItem}
                                isSelected={curSelectedItem === itemId}
                                isEditing={this.state.mode === ChangeModes.Edit}
                                cbItemClicked={curOnItemClicked}
                                cbItemEdited={curOnItemEdited}
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
        this.setState( {
            selectedItem:itemId,
            mode: ChangeModes.None,
        } );
    }

    onItemRemoved = (removedItem) => {
        let group = this.state.shopItems.find(g => g.name === removedItem.model);
        group.value = group.value.filter(x => x.id !== removedItem.id);
        this.setState( { shopItems: this.state.shopItems, } );
    }

    onItemCreated = (EO) => {
        this.setState( { mode: ChangeModes.Create, } );
    }

    onItemEdited = (itemId) => {
        this.setState( {
            selectedItem: itemId,
            mode: ChangeModes.Edit,
        } );
    }

    onItemCommit = (newItem) => {

        if (this.state.mode === ChangeModes.None)
            return;

        let group = this.state.shopItems.find(g => g.name === newItem.model);
    
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