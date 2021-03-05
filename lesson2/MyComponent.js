
var MyComponent = React.createClass({

    displayName: 'MyComponent',

    propTypes:{
        comboItems: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.number.isRequired,
                text: React.PropTypes.string.isRequired,
        })).isRequired, // обязательный пропс на вход
    },

    getDefaultProps: function(){
        return {
            comboItems:[],
        };
    },

    getInitialState: function() {
        return { 
            isChecked: false,
            currentText: "",
        };
    },

    render: function(){

        let collar = new Intl.Collator();
        let curItems = this.props.comboItems.slice();
        curItems = this.state.isChecked ? curItems.sort((x, y) => collar.compare(x.text, y.text)) : curItems;

        let bag = [];
        curItems.forEach(element => {
            if (this.state.currentText == "" || element.text.includes(this.state.currentText)){
                bag.push(React.DOM.option( {key:element.id, className:'Option'} , element.text));
            }
        });

        return React.DOM.div({className:'MyComponent'}, 
            React.DOM.input( {className:'Checkbox', type:'checkbox', onChange:this.onCbClicked,   checked: this.state.isChecked }  ),
            React.DOM.input( {className:'Text',     type:'text',     onChange:this.onTextChanged, value: this.state.currentText} ),
            React.DOM.input( {className:'Button',   type:'button',   onClick:this.onBtnClicked,   value:'сброс'}, ),
            React.DOM.select({className:'Select',   size:'7'}, bag )
        );
    },

    onCbClicked: function(EO){
        this.setState( {isChecked:EO.target.checked} );
    },

    onTextChanged: function(EO){
        this.setState( {currentText:EO.target.value} );
    },

    onBtnClicked(EO){
        this.setState( {
            isChecked: false,
            currentText: "",
        } );
    },

});