import styled from 'styled-components';

export const Container = styled.div`
  color: ${props => props.theme.bodyColor};
  font-family: ${props => props.theme.fontFamily}, sans-serif;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  height: 50px;
  background: linear-gradient(to right, #0083B0, #00B4DB);
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

export const Avatar = styled.div`
  width: 30px;
`;

export const AppName = styled.div`
  font-size: 20px;
`;

export const Logout = styled.img`
  width: 30px;
  padding-right: 10px;
  cursor: pointer;
  &:focus {
    outline:0;
  }
`;
