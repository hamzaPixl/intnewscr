import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const StyledLabel = styled.label`
  font-size: ${props => props.fontsize};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  width: ${props => props.width};
  font-family: ${props => props.theme.fontFamily}, sans-serif;
  color: ${props => props.theme.textColor};
  display: inline-block;
  text-align: left;
  font-size: 12px;
  line-height: 14px;
`;

export default function Label({
  id,
  defaultMessage,
  htmlFor = '',
  fontsize = 'inherit',
  margin = '0',
  padding = '6px 0',
  width = '100%',
  children,
}) {
  return (
    <StyledLabel
      htmlFor={htmlFor}
      fontsize={fontsize}
      margin={margin}
      padding={padding}
      width={width}
    >
      {children || <FormattedMessage id={id} defaultMessage={defaultMessage} />}
    </StyledLabel>
  );
}
