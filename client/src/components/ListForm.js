import React, { Fragment } from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Message,
} from 'semantic-ui-react';
import styled from 'styled-components';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import SaveButton from './SaveButton';
import Input from './Input';
import Dropdown from './Dropdown';

const componentMap = {
  input: {
    component: Input,
  },
  dropdown: {
    component: Dropdown,
  },
};

const ReadOnlyFormValue = styled.div`
  height: 64px;
  padding-left: 15px;
  padding-top: 12px;
  &.dropdown {
    padding-top: 9px;
  }
`;

const NoPaddingGridRow = styled(Grid.Row)`
  &&& {
    padding-bottom: 0;
  }
`;

function ListForm(props) {
  return (
    <FinalForm
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validate={props.validate}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid columns={2}>
            <NoPaddingGridRow verticalAlign="middle">
              <Grid.Column>
                <Header>
                  <FormattedMessage
                    id="general.edit.header"
                    defaultMessage="Update information"
                  />
                </Header>
              </Grid.Column>
              <Grid.Column textAlign="right">
                {props.editable ? (
                  <Fragment>
                    <SaveButton
                      data={props.initialValues}
                      error={props.formError}
                      onSaved={props.toggleEditable}
                      removeEditable={props.removeEditable}
                      saving={props.saving}
                    />
                    <Button icon="remove" onClick={props.toggleEditable} />
                  </Fragment>
                ) : (
                  <Button color="teal" animated onClick={props.toggleEditable}>
                    <Button.Content visible><FormattedMessage id="edit" defaultMessage="Edit" /></Button.Content>
                    <Button.Content hidden>
                      <Icon name="edit" />
                    </Button.Content>
                  </Button>
                )}
              </Grid.Column>
            </NoPaddingGridRow>
            <Divider />
            {props.formError && (
              <Grid.Row>
                <Grid.Column width={16}>
                  <Message negative>
                    <Message.Header>{props.formError.message}</Message.Header>
                  </Message>
                </Grid.Column>
              </Grid.Row>
            )}
            {props.fields.map((field, idx) => {
              let comp = componentMap.input;
              if (
                field.type &&
                Object.prototype.hasOwnProperty.call(componentMap, field.type)
              ) {
                comp = componentMap[field.type];
              }
              return (
                <Grid.Row key={idx}>
                  <Grid.Column verticalAlign="middle">
                    <strong>{field.label}</strong>
                  </Grid.Column>
                  <Grid.Column>
                    {props.editable && !field.disabled ? (
                      <Field
                        component={comp.component}
                        id={field.id}
                        name={field.name}
                        {...field.componentProps}
                        {...comp.props}
                      />
                    ) : (
                      <Field
                        component={(p) => {
                          let { value } = p.input;

                          if (field.type === 'dropdown') {
                            const option = field.componentProps.options
                            .find(opt => opt.value === p.input.value);
                            value = option && option.text;
                          }

                          return (
                            <ReadOnlyFormValue
                              className={classNames({
                                dropdown: field.type === 'dropdown',
                              })}
                            >
                              {value}
                            </ReadOnlyFormValue>
                          );
                        }}
                        disabled
                        id={field.id}
                        name={field.name}
                        {...field.componentProps}
                      />
                    )}
                  </Grid.Column>
                </Grid.Row>
              );
            })}
          </Grid>
        </Form>
      )}
    />
  );
}
export default ListForm;
