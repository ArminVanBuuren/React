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
        selectedItemId: "-1",
        mode: ChangeModes.None,
        shopItems: this.props.shopItems,
    };
    
    render() {

        const {shopItems, mode, selectedItemId} = this.state;

        let appliances = [];
        let bag = [];
        let selectedItem = null;
        let curOnItemClicked = this.onItemClicked;
        let curOnItemEdited = this.onItemEdited;
        let curOnItemRemoved = this.onItemRemoved;

        shopItems.forEach(group => {
            
            appliances.push(group.name);
            let items = [];
            group.value.forEach(item => {

                    let itemId = group.name + '_' + item.id;
                    let newItem = { ...item, itemId, applianceType:group.name };

                    if (!selectedItem && selectedItemId === itemId)
                        selectedItem = newItem;

                    items.push(
                        <ShopProduct
                                key={itemId}
                                item={newItem}
                                isSelected={selectedItemId === itemId}
                                isModifying={mode !== ChangeModes.None}
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
                <input type='button' value='New product' onClick={this.onItemCreated} disabled={mode !== ChangeModes.None} />
                { selectedItem && mode === ChangeModes.None && <ShopProductInfo {...selectedItem} />  }
                { selectedItem && mode === ChangeModes.Edit && <ShopProductModify cbOnCommit={this.onModifyCommitted} cbOnCancel={this.onModifyCancelled} appliances={appliances} item={selectedItem} />  }
                { mode === ChangeModes.Create && <ShopProductModify cbOnCommit={this.onModifyCommitted} cbOnCancel={this.onModifyCancelled} appliances={appliances} />  }
            </div>
        );
    }

    onItemClicked = (itemId) => { 
        this.setState( {
            selectedItemId:itemId,
            // mode: ChangeModes.None,
        } );
    }

    onItemRemoved = (removedItem) => {
        let newStateItems = this.state.shopItems.slice();
        let group = newStateItems.find(g => g.name === removedItem.applianceType);
        group.value = group.value.filter(x => x.id !== removedItem.id);
        this.setState( { shopItems: newStateItems, } );
    }

    onItemCreated = (EO) => {
        this.setState( { mode: ChangeModes.Create, } );
    }

    onItemEdited = (itemId) => {
        this.setState( {
            selectedItemId: itemId,
            mode: ChangeModes.Edit,
        } );
    }

    onModifyCommitted = (newItem) => {
        const {shopItems, mode} = this.state;

        if (mode === ChangeModes.None)
            return;

        let group = shopItems.find(g => g.name === newItem.applianceType);
    
        if (mode === ChangeModes.Edit){
            group.value = group.value.map(x => x.id === newItem.id ? newItem : x);
        }
        else{
            let maxId = 0;
            group.value.forEach(item => { maxId = item.id > maxId ? item.id : maxId; });
            maxId++;
            group.value.push(this.getItem(maxId, newItem));
        }

        this.setState({ 
            shopItems: shopItems,
            mode: ChangeModes.None, 
        });
    }
    
    getItem = (itemId, newItem) => {
        return {
            id: itemId,
            name: newItem.name,
            price: newItem.price,
            count: newItem.count,
            img: newItem.img,
        };
    }

    onModifyCancelled = () => {
        this.setState( { mode: ChangeModes.None, } );
    }
}

export default ShopBasket;