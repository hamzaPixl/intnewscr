import React, { PureComponent } from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import { Form, Input } from 'semantic-ui-react';

export default class UserForm extends PureComponent {
  render() {
    return (
      <FinalForm
        initialValues={this.props.initialValues}
        onSubmit={this.props.onSubmit}
        validate={this.props.validate}
        render={({ handleSubmit }) => (
          <Form method="post" onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Field
                component={Form.Field}
                control={Input}
                id="users.form.firstName"
                label="First Name"
                placeholder="First Name"
                name="firstName"
              />
              <Field
                component={Form.Field}
                control={Input}
                id="users.form.lastName"
                label="Last Name"
                name="lastName"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Field
                component={Form.Field}
                control={Input}
                id="users.form.email"
                label="Email"
                name="email"
              />
              <Field
                component={Form.Field}
                control={Input}
                id="users.form.password"
                label="Password"
                name="password"
                type="password"
              />
            </Form.Group>
            <Form.Button color="green">
              {this.props.actionLabel}
            </Form.Button>
          </Form>
        )}
      />
    );
  }
}
