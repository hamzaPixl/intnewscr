import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const StyledLabel = styled.label`
  font-size: ${props => props.fontsize};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  width: ${props => props.width};
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.textColor};
  display: inline-block;
  text-align: left;
`;

const styles = [
  StyledLabel.extend`
    font-size: 12px;
    line-height: 14px;
  `,
  StyledLabel.extend`
    font-size: 15px;
  `,
  StyledLabel.extend`
    font-size: 15px;
    font-weight: bold;
  `,
];

export default function Label({
  id,
  defaultMessage,
  htmlFor = '',
  fontsize = 'inherit',
  margin = '0',
  padding = '6px 0',
  width = '100%',
  size = 1,
  children,
}) {
  const Component = styles[size - 1];

  return (
    <Component
      htmlFor={htmlFor}
      fontsize={fontsize}
      margin={margin}
      padding={padding}
      width={width}
    >
      {children || <FormattedMessage id={id} defaultMessage={defaultMessage} />}
    </Component>
  );
}
