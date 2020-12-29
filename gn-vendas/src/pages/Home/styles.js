import styled from 'styled-components';
import theme from '../../styles/themes';
import bg from '../../assets/icons/bg.svg';

export const Container = styled.div`
  footer {
    width: 100%;
    height: 150px;
    margin-top: 30px;
    background: ${theme.primary};
    color: #fff;
    a {
      color: #fff;
    }
    padding: 50px;
  }
  header#page-header {
    height: 660px;
    background: ${theme.background_secondary};
    padding-top: 54px;
    z-index: 10;
    div.content {
      display: flex;
      width: 100%;
      div.header-content {
        display: flex;
        justify-content: space-between;
        position: relative;
        z-index: 5;
        width: 90%;
        height: 500px;
        max-width: 1170px;
        margin: 0 auto;
        div.left {
          padding-top: 78px;
          padding-left: 30px;
          width: 50%;
          color: #fff;
          h2 {
            font-weight: bold;
            font-size: 48px;
            line-height: 65px;
            text-transform: uppercase;
          }
          p.categoria {
            font-size: 36px;
            line-height: 49px;
            font-weight: lighter;
            padding: 13px 0;
          }
          p.descricao {
            font-size: 20px;
            line-height: 27px;
            font-weight: lighter;
          }
          button {
            margin-left: -30px;
            margin-top: 20px;
            background: none;
            border: 2px solid #fff;
            border-radius: 20px;

            color: #fff;
            font-style: normal;
            font-weight: 500;
            font-size: 22px;
            line-height: 30px;
            letter-spacing: 0.04em;
            padding: 5px 50px;
            transition: background 0.2s;
            transition: color 0.2s;
          }
          button:hover {
            background: #fff;
            color: ${theme.primary};
          }
        }
        div.right {
          img {
            height: 440px;
          }
        }
      }
      div.bg {
        background-image: url(${bg});
        background-position-x: right;
        background-size: cover;
        background-repeat: no-repeat;
        width: 60%;
        height: 660px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
      }
    }
  }
`;
export const ProductsSection = styled.section``;
