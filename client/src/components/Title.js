import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const StyledTitle = styled.div`
  font-size: ${props => props.theme.fontsize}px;
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  font-family: ${props => props.theme.fontFamily}, sans-serif;
  color: ${props => props.theme.primaryColor};
  text-align: left;
  line-height: 8px;
  letter-spacing: 2px;
  font-weight: 500;
`;

function Title({
  defaultMessage,
  id,
  margin = '0',
  padding = '6px 0',
}) {
  return (
    <StyledTitle
      margin={margin}
      padding={padding}
    >
      <FormattedMessage id={id} defaultMessage={defaultMessage} />
    </StyledTitle>
  );
}

export default Title;
