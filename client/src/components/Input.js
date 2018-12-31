import React from 'react';
import classNames from 'classnames';
import MaskedInput from 'react-text-mask';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import styled from 'styled-components';
import Label from './Label';

const TextFieldContainer = styled.div`
  color: ${props => props.theme.textColor};
  display: block;
  height: 35px;
  line-height: 13.8px;
  text-align: left;
  width: 100%;
  font-size: 12px;
  position: relative;
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  width: ${props => props.width};
  input {
    width: 100%;
    font-family: 'Roboto', sans-serif;
    background-color: rgba(0, 0, 0, 0);
    border: 0;
    border-bottom: 2px solid ${props => props.theme.primaryColor};
    color: ${props => props.theme.textColor};
    display: inline-block;
    font-weight: 400;
    transition-delay: 0s;
    transition-duration: 0.18s;
    transition-property: border-bottom-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    word-spacing: 0px;
    outline: none;
    line-height: 25px;
    height: 33px;
    padding: 0;
    font-size: 22px;
    &::placeholder {
      color: ${props => props.theme.disableColor};
    }
    &:disabled {
      opacity: 0.4;
      cursor: no-drop;
    }
  }
`;

const Error = styled.div`
  color: ${props => props.theme.error};
  font-size: 12px;
  line-height: 12px;
  padding-top: 2px;
  font-family: 'Roboto', sans-serif;
`;

export default function Input(props) {
  const {
    children,
    disabled = false,
    id,
    input,
    inputClassName,
    label = null,
    labelId,
    margin = '0',
    mask,
    max,
    maxLength,
    meta = null,
    min,
    name,
    padding = '0',
    placeholder = '',
    type = 'text',
    value = '',
    width = '100%',
  } = props;

  const InputComponent = mask ? MaskedInput : 'input';
  const error = get(meta, 'error');
  const errorMessage =
    error && typeof error === 'object' && error.id ? (
      <FormattedMessage {...error} />
    ) : (
      error
    );
  const inputValue = input && input.value != null ? input.value : '';
  const val = inputValue != null ? inputValue : value;
  return (
    <TextFieldContainer
      width={width}
      padding={padding}
      margin={margin}
      className={classNames({ 'with-label': !!label })}
    >
      {label && (
        <div>
          <Label
            htmlFor={id}
            id={labelId || id}
            defaultMessage={label}
            width="auto"
          />
        </div>
      )}
      <InputComponent
        className={inputClassName}
        disabled={disabled}
        id={id}
        mask={mask}
        min={min}
        max={max}
        maxLength={maxLength}
        data-test={get(props, 'data-test', '')}
        onBlur={input ? input.onBlur : props.onBlur}
        onChange={input ? input.onChange : props.onChange}
        name={input ? input.name : name}
        placeholder={placeholder}
        type={type}
        value={val}
      />
      {children}
      <Error>{get(meta, 'touched') && errorMessage}</Error>
    </TextFieldContainer>
  );
}
