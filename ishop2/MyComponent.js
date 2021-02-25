
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
        };
    },

    render: function(){

        let bag = [];
        let curSelectedItem = this.state.selectedItem;
        let curOnItemClicked = this.onItemClicked;

        this.props.shopItems.forEach(group => {
            
            let items = group.value.map(item => {

                    let itemId = group.name + '_' + item.id;
                    return React.createElement(ShopProduct, {
                        key: itemId, 
                        id: itemId,
                        name: item.name, 
                        price: item.price, 
                        count: item.count,
                        img: item.img,
                        isSelected: curSelectedItem === itemId,
                        cbItemClicked: curOnItemClicked,
                    });
                }
            );

            bag.push(React.DOM.div({key: group.name, className:'Group'}, React.DOM.h3({}, group.name), items));

        });

        return React.DOM.div( {className:'MyComponent'}, bag );
    },

    onItemClicked: function(itemId){
        this.setState( {selectedItem:itemId} );
    },

});