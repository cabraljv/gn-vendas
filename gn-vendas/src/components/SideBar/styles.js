import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.div`
  width: 250px;
  background: ${theme.primary};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 10;
  h1 {
    color: #fff;
    font-family: Righteous;
    font-size: 2rem;
    margin: 20px auto;
  }
  ul {
    margin: 0 10px;
    li {
      border-radius: 10px;
      margin: 10px 0;
      a {
        padding: 10px 30px;
        background: none;
        border: 0;
        color: #fff;
        display: flex;
        align-items: center;
        p {
          font-size: 16px;
          margin-left: 4px;
          font-weight: bold;
        }
      }
    }
    li.active {
      background: #fff;
      a {
        color: ${theme.primary};
      }
    }
  }
`;
