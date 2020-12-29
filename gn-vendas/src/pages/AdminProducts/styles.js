import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  width: 100%;
  div.content {
    margin: 40px auto;
    background: #fff;
    padding: 20px 30px;
    border-radius: 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    div.MuiPaper-elevation2 {
      box-shadow: none;
    }
    h2 {
      font-weight: normal;
      color: ${theme.primary};
    }
    footer {
      width: 100%;
      display: flex;
      margin-top: 10px;
      button {
        margin-left: auto;
        padding: 10px 20px;
        font-size: 14px;
        text-transform: uppercase;
        color: #fff;
        font-weight: bold;
        background: ${theme.primary};
        border-radius: 5px;
        border: 0;
      }
      button:hover {
        opacity: 0.7;
      }
    }
  }
`;
