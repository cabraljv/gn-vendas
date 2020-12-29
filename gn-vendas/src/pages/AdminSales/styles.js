import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  div.categories-content {
    margin: 0 auto;
    min-width: 700px;
    margin-top: 100px;
    border-radius: 20px;
    padding: 30px 40px;
    h2 {
      font-size: 1.8rem;
      padding-bottom: 20px;
      color: ${theme.primary};
    }
  }
`;
