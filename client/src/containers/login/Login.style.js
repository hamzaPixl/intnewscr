import styled from 'styled-components';

export const Container = styled.div`
  background: ${props => props.theme.bodyColor};
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

export const Error = styled.div`
  background: ${props => props.theme.disableColor};
  color: ${props => props.theme.error};
  border-radius: 10px;
  font-family: ${props => props.theme.fontFamily}, sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.56;
  text-align: center;
  margin-top: 5%;
`;

export const Background = styled.img`
  height: 200px;
  position: relative;
  padding: 2%;
`;

export const FormContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  min-height: 600px;
`;

export const Form = styled.form`
  border-radius: 15px;
  border-style: solid;
  border-color: ${props => props.theme.disableColor};
  background-color: ${props => props.theme.bodyColor};
  box-sizing: border-box;
  max-width: 350px;
  padding: 20px;
  width: 100%;
`;

export const FormTitle = styled.h3`
  color: ${props => props.theme.primaryColor};
  font-family: ${props => props.theme.fontFamily}, sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.56;
  text-align: center;
`;

export const Submit = styled.button.attrs({ type: 'submit' })`
  border-style: none;
  border: solid ${props => props.theme.textColor} 2px;
  margin-top: 20px;
  border-radius: 10px;
  color: ${props => props.theme.textColor};
  font-family: ${props => props.theme.fontFamily}, sans-serif;
  font-size: 14px;
  font-weight: bold;
  height: 45px;
  text-align: center;
  width: 100%;
  cursor: pointer;
  &:focus {
    outline:0;
  }
  &:hover {
    color: ${props => props.theme.bodyColor};
    background: ${props => props.theme.primaryColor};
    border: solid ${props => props.theme.primaryColor} 2px;
  }
`;

export const Footer = styled.div`
  color: ${props => props.theme.primaryColor};
  flex-shrink: 0;
  font-family: ${props => props.theme.fontFamily}, sans-serif;
  font-size: 11px;
  height: 50px;
  letter-spacing: 0.2px;
  line-height: 50px;
  text-align: center;
  width: 100%;
`;
