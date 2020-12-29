import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  background: rgba(0, 0, 0, 0.4);
  display: ${(props) => (props.open ? 'flex' : 'none')};
  div.content {
    margin: auto;
    width: 40%;
    background: #fff;
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    h3 {
      font-weight: normal;
      font-size: 22px;
      color: ${theme.primary};
    }
    div.image-crop-container {
      display: flex;
      flex-direction: column;
      button {
        margin-left: auto;
        margin-top: 10px;
        background: ${theme.primary};
        padding: 10px 20px;
        border-radius: 5px;
        color: #fff;
        text-transform: uppercase;
        font-weight: bold;
        border: 0;
      }
      button:hover {
        opacity: 0.7;
      }
    }
    div.top {
      display: flex;
      margin-top: 15px;
      div.add-image {
        width: 200px;
        border: 2px dashed ${theme.primary};
        border-radius: 20px;

        color: ${theme.primary};
        label {
          display: flex;
          align-items: center;
          justify-content: center;
          display: pointer;
          width: 100%;
          height: 100%;
          cursor: pointer;
          input {
            display: none;
          }
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      div.product-data {
        display: flex;
        flex-direction: column;
        margin-left: 30px;
        width: 80%;
        input {
          border-radius: 5px;
          border: 1px solid ${theme.light_text};
          padding: 5px 10px;
          font-size: 14px;
          margin: 10px 0;
        }
        textarea {
          border-radius: 5px;
          border: 1px solid ${theme.light_text};
          padding: 5px 10px;
          font-size: 14px;
          font-family: Noto Sans;
        }
      }
    }
    div.bottom {
      margin-top: 10px;
    }
  }
`;
