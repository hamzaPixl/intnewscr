import styled from 'styled-components';

export const Container = styled.div`
  color: ${props => props.theme.bodyColor};
  font-family: ${props => props.theme.fontFamily}, sans-serif;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  height: 40px;
  background-color: ${props => props.theme.darkColor};
  box-shadow: 1px 1px 21px #aaaaaa;
`;

export const UserPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const User = styled.div`
  padding-left: 10px;
  padding-right: 20px;
`;

export const Avatar = styled.img`
  width: 2%;
`;

export const AppName = styled.div`
`;

export const Logout = styled.img`
  width: 2%;
  padding-right: 10px;
  cursor: pointer;
  &:focus {
    outline:0;
  }
`;
