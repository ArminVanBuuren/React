
var MyComponent = React.createClass({

    displayName: 'MyComponent',

    getDefaultProps: function(){
        return [
            {
                name: 'None',
                value: [
                    { id: 1, name: 'None',  price: 0, count: 0, img: '', },
                ],
            }
        ];
    },

    render: function(){

        let bag = [];
        this.props.shopItems.forEach(function(group){
            
            let items = [];
            group.value.forEach(function(item){
                items.push(React.DOM.div({key: group.name + '_' + item.id, className:'Item'}, 
                    React.DOM.img({src:item.img}),
                    React.DOM.span({className:'Name'}, item.name),
                    React.DOM.span({className:'Count'}, item.count),
                    React.DOM.span({className:'Price'}, item.price),
                ));
            });

            bag.push(
                React.DOM.div({key: group.name, className:'Group'}, React.DOM.h3({}, group.name), items)
            );

        });

        return React.DOM.div( {className:'MyComponent'}, bag );
    },

});