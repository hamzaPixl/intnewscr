import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  &.page {
    margin: 50px;
    width: 100%;
    display: block;
  }
  &.full{
    height: 100%;
  }
`;

export default Container;
