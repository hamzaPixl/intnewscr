import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  > .addButton {
    float: right;
  }
  &.page {
    margin: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  &.full{
    height: 100%;
  }
`;

export default Container;
