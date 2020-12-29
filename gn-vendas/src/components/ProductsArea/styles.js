import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  max-width: 1160px;
  margin: 0 auto;
  header {
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
      font-style: normal;
      font-weight: 600;
      font-size: 36px;
      line-height: 49px;
    }
    p {
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 40px;
      color: #787878;
    }
  }
  div.products-content {
    display: flex;
    width: 100%;
    section.filtros {
      display: flex;
      flex-direction: column;
      background: #fff;
      height: 100%;
      width: 320px;
      min-width: 220px;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
      button {
        margin-top: 10px;
        padding: 5px;
        border: 0;
        border-radius: 4px;
        color: ${theme.secondary};
        font-size: 0.8rem;
        background: none;
      }
      p.filtros-title {
        font-size: 24px;
      }
      p.filtros-subtitle {
        font-size: 14px;
      }
      div.categories-list {
        height: 200px;
        overflow-y: auto;
        border: 1px solid rgba(0, 0, 0, 0.09);
        padding: 5px 10px;
        border-radius: 5px;
        ul {
          li {
          }
          margin: 4px 0;
          color: #666666;
          font-size: 10px;
        }
      }
      span.radio-item {
        display: flex;
        align-items: center;
        font-size: 12px;
        input {
          margin-right: 5px;
        }
      }
    }
    section.show-products {
      display: grid;
      width: 100%;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 50px;
      margin-left: 20px;
    }
  }
  span.divisor-horizontal {
    height: 1px;
    width: 90%;
    background: #c4c4c4;
    margin: 20px 0;
  }
`;
export const CategoryItem = styled.li`
  cursor: pointer;
  ${(props) => (props.active ? `color: ${theme.primary};` : '')}
`;
