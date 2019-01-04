import styled from 'styled-components';

export const Container = styled.div`
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.disableColor};
  font-family: ${props => props.theme.fontFamily}, sans-serif;
  line-height: ${props => props.theme.lineHeight}rem;
  letter-spacing: ${props => props.theme.letterSpacing}rem;
  box-shadow: 1px 2px 30px #aaaaaa;
`;

export const Link = styled.a`
  margin-bottom: 10px;
  width: 30px;
  transition: transform .3s ease-out;
  &:hover {
    color: ${props => props.theme.primaryColor};
  }
  &.selected {
    color: ${props => props.theme.primaryColor};
  }
`;

export const Links = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const Logo = styled.img`
`;

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  &:hover {
    visibility: visible;
  }
`;
