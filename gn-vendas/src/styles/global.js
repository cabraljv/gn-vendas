import { createGlobalStyle } from 'styled-components';
import theme from './themes';

const global = createGlobalStyle`

 *{
    margin: 0;
    padding:0;
    outline:0;
    box-sizing: border-box;
  }
  html, border-style, #root {
    height: 100%;
  } 
  body{
    font: 14px 'Noto sans', sans-serif;
    background: ${theme.background};
    color: ${theme.text};
    -webkit-font-smoothing: antaliased !important;
  }
  ul{
    list-style: none;
  }
  a{
    text-decoration: none;
  }
  button{
    cursor: pointer;
  }
`;

export default global;
