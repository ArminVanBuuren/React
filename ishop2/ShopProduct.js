
var ShopProduct = React.createClass({

    displayName: 'ShopProduct',

    propTypes: {
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        count: React.PropTypes.number.isRequired,
        img: React.PropTypes.string.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
        cbItemClicked: React.PropTypes.func.isRequired,
        cbItemRemoved: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function(){
        return {
            id: 0,
            name: 'None',  
            price: 0, 
            count: 0, 
            img: '',
            cbItemClicked: null,
        };
    },

    getInitialState: function() {
        return { };
    },

    render: function(){
        return React.DOM.div({className: this.props.isSelected ? 'ShopProduct selected' : 'ShopProduct', onClick: this.onItemClicked }, 
                    React.DOM.img({src:this.props.img}),
                    React.DOM.span({className:'Name'}, this.props.name),
                    React.DOM.span({className:'Count'}, this.props.count),
                    React.DOM.span({className:'Price'}, this.props.price),
                    React.DOM.input({className:'Button', type:'button', onClick:this.onItemRemoved, value:'Remove'}, ),
            );
    },

    onItemClicked : function(EO){
        if (this.props.cbItemClicked)
            this.props.cbItemClicked(this.props.id);
    },

    onItemRemoved: function(EO){
        if (this.props.cbItemRemoved)
            this.props.cbItemRemoved(this.props.id);
    },
});