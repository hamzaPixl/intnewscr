import React from 'react';
import { Form } from 'semantic-ui-react';

import Error from './Error';

function Dropdown(props) {
  return (
    <div className="field">
      <Form.Dropdown
        {...props.input}
        disabled={props.disabled}
        error={props.meta.submitFailed && !!props.meta.error}
        fluid
        id={props.id}
        label={<label htmlFor={props.id}>{props.label}</label>}
        onChange={(e, data) => props.input.onChange(data.value)}
        options={[{ text: '', value: '' }].concat(props.options)}
        search
        selection
        type={props.type}
      />
      <Error submitFailed={props.meta.submitFailed} error={props.meta.error} />
    </div>
  );
}

export default Dropdown;
