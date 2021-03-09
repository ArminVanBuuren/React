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
              <span className='Name'>{this.props.fieldName}</span>
              <input className='Value' type='text' value={this.props.defaultValue} onChange={this.validateAndChange} />
              {!this.state.isValid && <span className='Error'>{this.props.errMessage}</span>}
        </div>
      );
    }

    validateAndChange = (EO) => {
        let isValid = this.props.validateFunc(EO.target.value);
        if (isValid !== this.state.isValid)
            this.setState( { isValid } );

        this.props.modifyFunc(EO.target.value);
    }

}

export default ModifyFormField;