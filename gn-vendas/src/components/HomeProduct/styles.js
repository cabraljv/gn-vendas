import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.div`
  background: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 100%;
  max-width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  img {
    padding: 20px;
    width: 80%;
    object-fit: contain;
    transition: transform 0.5s;
  }
  &&:hover > img {
    transform: scale(1.3) rotate(5deg);
  }
  div.product-footer {
    margin-top: auto;
    margin-bottom: 20px;
    p.product-title {
      color: ${theme.text};
      text-transform: uppercase;
      font-size: 18px;
      font-weight: bold;
      padding-bottom: 10px;
    }
    div.price {
      display: flex;
      width: 100%;
      justify-content: space-between;
      span.price-value {
        font-size: 9px;
        color: #666;
        display: flex;
        span {
          color: ${theme.primary};
          font-size: 24px;
          font-weight: bold;
          margin-top: -6px;
          margin-left: 2px;
        }
      }
      p.suport-text {
        color: #666;
        font-size: 9px;
        padding-left: 8px;
      }
    }
  }
`;
