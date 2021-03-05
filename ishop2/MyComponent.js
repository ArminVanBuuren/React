
var MyComponent = React.createClass({

    displayName: 'MyComponent',

    getDefaultProps: function(){
        return {
            shopItems: {
                name: 'None',
                value: [
                    { id: 0, name: 'None',  price: 0, count: 0, img: '', },
                ],
            }
        };
    },

    getInitialState: function() {
        return { 
            selectedItem: "-1",
            removedItems: {},
        };
    },

    render: function(){

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

                    items.push(React.createElement(ShopProduct, {
                        key: itemId, 
                        id: itemId,
                        name: item.name, 
                        price: item.price, 
                        count: item.count,
                        img: item.img,
                        isSelected: curSelectedItem === itemId,
                        cbItemClicked: curOnItemClicked,
                        cbItemRemoved: curOnItemRemoved,
                    }))
                }
            );

            bag.push(React.DOM.div({key: group.name, className:'Group'}, React.DOM.h3({}, group.name), items));

        });

        return React.DOM.div( {className:'MyComponent'}, bag );
    },

    onItemClicked: function(itemId){
        this.setState( {selectedItem:itemId} );
    },

    onItemRemoved: function(itemId){
        this.state.removedItems[itemId] = true;
        this.setState( {removedItems: this.state.removedItems} );
    },

});