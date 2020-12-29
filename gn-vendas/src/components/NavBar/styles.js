import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.nav`
  display: flex;
  margin: 0 auto;
  background: #fff;
  width: 90%;
  max-width: 1170px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  position: relative;
  padding: 27px 20px;
  color: ${theme.light_text};
  button {
    color: ${theme.light_text};
  }
  a {
    margin-left: 46%;
    font-family: Righteous;
    font-size: 30px;
    color: ${theme.text};
  }
  ul {
    display: flex;
    align-items: center;
    li:first-of-type {
      button {
        p {
          padding-right: 5px;
        }
      }
    }
  }

  ul:last-of-type {
    margin-left: auto;
    li:first-of-type {
      div.cart {
        display: flex;
        span.cart-items {
          background: ${theme.primary};
          width: 15px;
          height: 15px;
          border-radius: 15px;
          display: flex;
          position: relative;
          left: -15px;
          bottom: -10px;
          p {
            color: #fff;
            margin: auto;
            font-size: 10px;
            padding-left: 4px;
          }
        }
      }
    }
    li:last-of-type {
      button {
        p {
          padding-left: 5px;
        }
      }
    }
  }
  button {
    display: flex;
    align-items: center;
    padding: 3px;
    background: none;
    border: 0;
  }
  .divisor {
    height: 90%;
    margin: 0 23px;
    width: 1px;
    background: #7a7a7a;
  }

  div.menu-list {
    background: #fff;
    padding: 10px;
    width: 150px;
    border-radius: 10px;
    position: absolute;
    margin-left: -75px;
    padding-top: 40px;
    display: ${(props) => (props.menu_open ? 'flex' : 'none')};
    ul {
      display: flex;
      flex-direction: column;
      li {
        padding: 5px 0;
        button.sales {
          cursor: pointer;
          font-size: 14px;
        }
        button.sales:hover {
          color: ${theme.primary};
        }
        button.exit:hover {
          color: #ef3030;
        }
      }
    }
  }
  div.cart-list {
    position: absolute;
    z-index: 5;
    ul {
      background: #fff;
      padding: 10px;
      position: relative;
      left: -70px;
      top: 10px;
      display: ${(props) => (props.cart_open ? 'flex' : 'none')};
      flex-direction: column;
      border-radius: 0 0 30px 30px;
      padding-top: 30px;
      z-index: -10;
      button.finish {
        margin-top: 10px;
        color: ${theme.primary};
        font-weight: bold;
        padding: 5px 10px;
        z-index: 10;
      }
      button.finish:hover {
        opacity: 0.7;
      }
    }
  }
`;
export const CartContainer = styled.li`
  display: flex;
  padding: 5px 10px;
  border-bottom: 1px solid #e2e2e2;
  div.product-info {
    display: flex;
    img {
      height: 40px;
      padding-right: 15px;
    }
    div.product-texts {
      width: 120px;
      p.title {
        font-size: 13px;
        color: ${theme.text};
      }
      p.amount {
        font-size: 9px;
        color: ${theme.text};
      }
    }
  }
  button {
    font-size: 9px;

    margin-left: auto;
  }
  button:hover {
    color: #ef3030;
  }
`;
