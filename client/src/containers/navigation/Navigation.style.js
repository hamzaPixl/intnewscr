import styled from 'styled-components';

export const Container = styled.div`
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.bodyColor};
  font-family: ${props => props.theme.fontFamily}, sans-serif;
  line-height: ${props => props.theme.lineHeight}rem;
  letter-spacing: ${props => props.theme.letterSpacing}rem;
`;

export const Link = styled.a`
  padding: 5px 15px;
  transition: transform .3s ease-out;
  &:hover {
    color: ${props => props.theme.primaryColor};
    transform: translateX(-5px);
  }
`;

export const Links = styled.div`
  cursor: pointer;
`;