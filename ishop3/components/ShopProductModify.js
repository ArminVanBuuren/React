import React from 'react';
import PropTypes from 'prop-types';

import './ShopProductModify.css';

class ShopProductModify extends React.Component {

    static propTypes = {
        cbOnCommit: PropTypes.func.isRequired,
        models: PropTypes.array.isRequired,
        item: PropTypes.object,
    };

    static defaultProps = {
      item: {
        itemId: "-1",
        model: null,
        id: -1,
        name:'',
        count: 0,
        price: 0,
        img: "",
      },
    }
  
    state = {
      newItem: {
        model:this.props.item.model === null ? this.props.models[0] : this.props.item.model,
        itemId:this.props.item.itemId,
        id: this.props.item.id,
        name:this.props.item.name,
        price: this.props.item.price,
        count: this.props.item.count,
        img: this.props.item.img,
      },
      status: {
        nameCorrect: true,
        priceCorrect: true,
        quantityCorrect: true,
        urlCorrect: true,
      },
    };

    render() {

      let hasAnyError = !this.isValid();

      let modelIterator = 0;
      return (
        <div className='ShopProductModify'>
            { this.state.newItem.itemId !== "-1" && <p>ID {this.state.newItem.id}</p> }

            {
              this.state.newItem.itemId === "-1" &&
              <div>
                <span>Model: </span>
                <select onChange={this.onModelChanged.bind(this)}>
                  {this.props.models.map(item => {
                    modelIterator++;
                    return (<option key={modelIterator} defaultValue={item === this.state.newItem.model}>{item}</option>);
                  })}
                </select>
              </div>
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
    }

    onModelChanged(EO){
      this.setState( {newItem: {...this.state.newItem, model:EO.target.value} } );
    }

    onNameChanged(EO){
      this.setState( {
        newItem: {...this.state.newItem, name:EO.target.value },
        status: {...this.state.status, nameCorrect: this.checkName(EO.target.value)},
      });
    }

    checkName = (value) => {
      return (/\w{3,}/.test(value));
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