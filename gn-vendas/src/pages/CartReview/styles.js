import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  div.loading {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
    display: ${(props) => (props.loading ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    z-index: 20;
    div.loading-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    p {
      color: #fff;
      font-size: 1.5rem;
    }
  }
  header {
    padding-top: 50px;
  }
  div.content {
    max-width: 850px;
    margin: auto;
    background: #fff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    margin-top: 60px;
    width: 100%;
    ul {
      padding: 10px;
      li {
        display: flex;
        padding: 5px 20px;
        border-bottom: 1px solid #d8d8d8;
        img {
          height: 80px;
        }
        div.info {
          padding: 10px 30px;
          p.name {
            font-size: 18px;
            color: ${theme.text};
            padding-bottom: 5px;
          }
          p.amount {
            font-size: 12px;
          }
        }
        div.price {
          padding: 10px 40px;
          p.price-text {
          }
        }
        button {
          margin-left: auto;
          background: none;
          border: 0;
          color: ${theme.light_text};
        }
        button:hover {
          color: #ef3030;
        }
      }
    }
    footer {
      display: flex;
      padding: 20px 50px;
      justify-content: space-between;
      align-items: center;
      p.total-price {
        font-size: 14px;
        span {
          color: ${theme.primary};
          font-size: 24px;
          font-weight: bold;
        }
      }
      button {
        background: none;
        border: 2px solid ${theme.primary};
        color: ${theme.primary};
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.04em;
        padding: 10px 15px;
        border-radius: 15px;
        transition: background 0.4s;
        display: flex;
        align-items: center;
        p {
          padding-left: 5px;
        }
      }
      button:hover {
        background: ${theme.primary};
        color: #fff;
        filter: drop-shadow(0px 0px 5px rgba(243, 112, 33, 0.7));
      }
    }
  }
`;
export const CartItemContainer = styled.li``;
