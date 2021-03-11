import React from 'react';
import PropTypes from 'prop-types';

import './ShopProductModify.css';
import ModifyFormField from './ModifyFormField';

class ShopProductModify extends React.Component {

    static propTypes = {
        cbOnCommit: PropTypes.func.isRequired,
        cbOnCancel: PropTypes.func.isRequired,
        appliances: PropTypes.array.isRequired,
        item: PropTypes.shape({
          itemId: PropTypes.string.isRequired,
          applianceType: PropTypes.string,
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          count: PropTypes.number.isRequired,
          img: PropTypes.string.isRequired,
        }),
    };

    static defaultProps = {
      item: {
        itemId: "-1",
        applianceType: null,
        id: -1,
        name:'',
        price: 0,
        count: 0,
        img: "",
      },
    }
    
    constructor(props) {
      super(props);

      this.state = { newItem: this.getNewItem(this.props.item), };
  }

  render() {
      const { newItem } = this.state;

      let hasAnyError = !this.isValid();
      let applianceIterator = 0;

      let result = (
        <div className='ShopProductModify'>
            { newItem.itemId !== "-1" && <p>ID {newItem.id}</p> }

            {
              newItem.itemId === "-1" 
              ? <div>
                  <span>Appliance: </span>
                  <select onChange={this.onApplianceTypeChanged}>
                    {this.props.appliances.map(a => <option key={++applianceIterator}>{a}</option> )}
                  </select>
                </div>
              : <p>Appliance: {newItem.applianceType}</p>
            }

            <ModifyFormField fieldName='Name: ' defaultValue={newItem.name} 
                              errMessage='incorrect filling name' validateFunc={this.checkName} modifyFunc={this.onNameChanged} />
            <ModifyFormField fieldName='Price: ' defaultValue={newItem.price.toString()} 
                              errMessage='incorrect filling, only number' validateFunc={this.checkPrice} modifyFunc={this.onPriceChanged} />
            <ModifyFormField fieldName='Quantity: ' defaultValue={newItem.count.toString()} 
                              errMessage='incorrect filling, only number' validateFunc={this.checkQuantity} modifyFunc={this.onQuantityChanged} />
            <ModifyFormField fieldName='URL: ' defaultValue={newItem.img} 
                              errMessage='incorrect filling URL' validateFunc={this.checkUrl} modifyFunc={this.onUrlChanged} />

            <div className='Control' >
              { newItem.itemId !== "-1"
                ? <input type='button' value='Edit' onClick={this.onCommit} disabled={hasAnyError} /> 
                : <input type='button' value='Create' onClick={this.onCommit} disabled={hasAnyError} />
              }
              <input type='button' value='Cancel' onClick={this.onCancel} /> 
            </div>
        </div>
      );

      return result;
    }

    componentDidUpdate = (oldProps, oldState) => {
         if (oldProps.item && this.props.item && oldProps.item.itemId !== this.props.item.itemId)
            this.setState( { newItem: this.getNewItem(this.props.item), } );
    }
   
    getNewItem = (item) => {
      return {
        applianceType:item.applianceType === null ? this.props.appliances[0] : this.props.item.applianceType,
        itemId:       item.itemId,
        id:           item.id,
        name:         item.name,
        price:        item.price,
        count:        item.count,
        img:          item.img,
      }
    }

    onApplianceTypeChanged = (EO) => {
      this.setState( {newItem: {...this.state.newItem, applianceType:EO.target.value} } );
    }

    onNameChanged = (newValue) => {
      this.setState( { newItem: {...this.state.newItem, name:newValue }, });
    }

    checkName = (value) => (/\w{2,}/.test(value));

    onPriceChanged = (newValue) => {
      this.setState( { newItem: {...this.state.newItem, price:parseInt(newValue) }, });
    }

    checkPrice = (value) => (/^\d+$/.test(value));

    onQuantityChanged = (newValue) => {
      this.setState( { newItem: {...this.state.newItem, count:parseInt(newValue) }, });
    }

    checkQuantity = (value) => (/^\d+$/.test(value));

    onUrlChanged = (newValue) => {
      this.setState( { newItem: {...this.state.newItem, img:newValue }, });
    }

    checkUrl = (value) => (/^(http|https):\/\/.{3,}$/.test(value));

    onCommit = (EO) => {
      if (this.isValid()){
          this.props.cbOnCommit(this.state.newItem);
      }
    }

    onCancel = (EO) => {
      this.props.cbOnCancel();
    }

    isValid = () => {
        const { name, price, count, img } = this.state.newItem;
        return this.checkName(name) && this.checkPrice(price) && this.checkQuantity(count) && this.checkUrl(img);
    }

}

export default ShopProductModify;