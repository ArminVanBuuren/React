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
        const { fieldName, defaultValue, errMessage } = this.props;
      return (
        <div className='ModifyFormField' >
              <span className='Name'>{fieldName}</span>
              <input className='Value' type='text' value={defaultValue} onChange={this.validateAndChange} />
              {!this.state.isValid && <span className='Error'>{errMessage}</span>}
        </div>
      );
    }

    validateAndChange = (EO) => {
        const {validateFunc, modifyFunc} = this.props;

        let isValid = validateFunc(EO.target.value);
        if (isValid !== this.state.isValid)
            this.setState( { isValid } );

        modifyFunc(EO.target.value);
    }

}

export default ModifyFormField;