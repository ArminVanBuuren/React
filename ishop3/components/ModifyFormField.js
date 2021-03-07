import React from 'react';
import PropTypes from 'prop-types';

import './ModifyFormField.css';

class ModifyFormField extends React.Component {

    static propTypes = {
        fieldName: PropTypes.string.isRequired,
        defaultValue: PropTypes.string.isRequired,
        errMessage: PropTypes.string.isRequired,
        validateFunc: PropTypes.func.isRequired,
        modifyFunc: PropTypes.func.isRequired,
    };
  
    state = {
        isValid: true,
    };

    render() {
      return (
        <div className='ModifyFormField' >
              <span>{this.props.fieldName}</span>
              <input className='Value' type='text' defaultValue={this.props.defaultValue} onChange={this.validate} />
              {!this.state.isValid && <span className='Error'>{this.props.errMessage}</span>}
        </div>
      );
    }

    validate = (EO) =>{
        let isValid = this.props.validateFunc(EO.target.value);
        this.props.modifyFunc(EO.target.value);
        this.setState( { isValid } );
    }

}

export default ModifyFormField;