import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  header {
    margin-top: 50px;
  }
  div.content {
    background: #fff;
    width: 40%;
    margin: 40px auto;
    padding: 30px 40px;
    border-radius: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    div.texts {
      h2 {
        font-weight: normal;
        font-size: 2rem;
        color: ${theme.primary};
      }
      p.description {
        color: ${theme.text};
        font-size: 1.1rem;
        padding-top: 15px;
      }
    }
    div.footer-infos {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      p {
        display: flex;
        span {
          font-size: 2rem;
          font-weight: bold;
          color: ${theme.primary};
          margin-top: -8px;
          margin-left: 3px;
        }
      }
      a {
        cursor: pointer;
        background: none;
        border: 0;
        color: #fff;
        background: ${theme.primary};
        padding: 5px 10px;
        border-radius: 5px;
        font-weight: bold;
        display: flex;
        align-items: center;
        p {
          padding-left: 5px;
        }
      }
      a:hover {
        opacity: 0.7;
      }
    }
  }
`;
