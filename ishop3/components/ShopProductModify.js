import React from 'react';
import PropTypes from 'prop-types';

import './ShopProductModify.css';

class ShopProductModify extends React.Component {

    static propTypes = {
        cbOnCommit: PropTypes.func.isRequired,
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

        this.state = {
          newItem: this.getSourceItem(),
          status: {
            nameCorrect: true,
            priceCorrect: true,
            quantityCorrect: true,
            urlCorrect: true,
          },
        };
    }

    getSourceItem(){
      return {
        applianceType:this.props.item.applianceType === null ? this.props.appliances[0] : this.props.item.applianceType,
        itemId:this.props.item.itemId,
        id: this.props.item.id,
        name:this.props.item.name,
        price: this.props.item.price,
        count: this.props.item.count,
        img: this.props.item.img,
      }
    }

    render() {

      let hasAnyError = !this.isValid();
      let applianceIterator = 0;

      let result = (
        <div className='ShopProductModify'>
            { this.state.newItem.itemId !== "-1" && <p>ID {this.state.newItem.id}</p> }

            {
              this.state.newItem.itemId === "-1" 
              ? <div>
                <span>Appliance: </span>
                <select onChange={this.onApplianceTypeChanged.bind(this)}>
                  {this.props.appliances.map(a => {
                    applianceIterator++;
                    return (<option key={applianceIterator}>{a}</option>);
                  })}
                </select>
              </div>
              : <p>Appliance: {this.state.newItem.applianceType}</p>
            }

            <div>
              <span>Name: </span>
              <input className='Value' type='text' defaultValue={this.state.newItem.name} onChange={this.onNameChanged.bind(this)} />
              {!this.state.status.nameCorrect && <span className='Error'>incorrect filling name</span>}
            </div>

            <div>
              <span>Price: </span>
              <input type='text' defaultValue={this.state.newItem.price} onChange={this.onPriceChanged.bind(this)} />
              {!this.state.status.priceCorrect && <span className='Error'>incorrect filling, only number</span>}
            </div>

            <div>
              <span>Quantity: </span>
              <input type='text' defaultValue={this.state.newItem.count} onChange={this.onQuantityChanged.bind(this)} />
              {!this.state.status.quantityCorrect && <span className='Error'>incorrect filling, only number</span>}
            </div>

            <div>
              <span>URL: </span>
              <input type='text' defaultValue={this.state.newItem.img} onChange={this.onUrlChanged.bind(this)} />
              {!this.state.status.urlCorrect && <span className='Error'>incorrect filling URL</span>}
            </div>

            { this.state.newItem.itemId !== "-1"
              ? <input type='button' value='Edit' onClick={this.onCommit.bind(this)} disabled={hasAnyError} /> 
              : <input type='button' value='Create' onClick={this.onCommit.bind(this)} disabled={hasAnyError} />
            }
        </div>
      );

      return result;
    }

    onApplianceTypeChanged(EO){
      this.setState( {newItem: {...this.state.newItem, applianceType:EO.target.value} } );
    }

    onNameChanged(EO){
      this.setState( {
        newItem: {...this.state.newItem, name:EO.target.value },
        status: {...this.state.status, nameCorrect: this.checkName(EO.target.value)},
      });
    }

    checkName = (value) => {
      return (/\w{2,}/.test(value));
    }

    onPriceChanged(EO){
      const parsed = parseInt(EO.target.value);
      this.setState( {
          newItem: {...this.state.newItem, price:parsed },
          status: {...this.state.status, priceCorrect: this.checkPrice(EO.target.value) },
        });
    }

    checkPrice = (value) => {
      return (/^\d+$/.test(value));
    }

    onQuantityChanged(EO){
      const parsed = parseInt(EO.target.value);
      this.setState( {
          newItem: {...this.state.newItem, count:parsed },
          status: {...this.state.status, quantityCorrect: this.checkQuantity(EO.target.value) },
        });
    }

    checkQuantity = (value) => {
      return (/^\d+$/.test(value));
    }

    onUrlChanged(EO){
      this.setState( {
        newItem: {...this.state.newItem, img:EO.target.value },
        status: {...this.state.status, urlCorrect: this.checkUrl(EO.target.value), }
      });
    }

    checkUrl(value){
      return (/^(http|https):\/\/.{3,}$/.test(value));
    }

    onCommit(EO){
      if (this.isValid()){
        this.props.cbOnCommit(this.state.newItem);
      }
    }

    isValid(){
      return this.checkName(this.state.newItem.name) &&
      this.checkPrice(this.state.newItem.price) &&
      this.checkQuantity(this.state.newItem.count) &&
      this.checkUrl(this.state.newItem.img);
    }

}

export default ShopProductModify;