import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  div.login-container {
    display: flex;
    flex-direction: column;
    width: 30%;
    max-width: 470px;
    margin: auto;
    background: #fff;
    padding: 30px 40px;
    border-radius: 20px;
    margin-top: 100px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    p.login-header {
      color: ${theme.primary};
      font-size: 30px;
      font-weight: bold;
      padding-bottom: 30px;
    }
    input {
      padding: 5px 20px;
    }
    button.signin {
      width: 100%;
      background: ${theme.primary};
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      padding: 10px 0;
      border: 0;
      border-radius: 5px;
      transition: opacity 0.3s;
    }
    button:hover {
      opacity: 0.7;
    }
    button.signup {
      margin-top: 20px;
      background: 0;
      border: 0;
      font-size: 14px;
      color: ${theme.light_text};
    }
  }
`;
export const Campo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-bottom: 30px;
  input {
    height: 45px;
    padding-left: 10px;
    border-radius: 5px;
    border: 2px solid #d9d9d9;
    font-size: 16px;
    color: #1f1f1f;
  }
  input:focus {
    outline: none;
    border: 2px solid ${theme.primary};
  }
  label {
    font-size: 16px;
    position: absolute;
    top: 11px;
    left: 10px;
    color: #d9d9d9;
    transition: 0.5s ease;
  }

  input:not(:placeholder-shown) + label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transform-origin: left bottom;
    transform: translate(0, -0.8rem);
    font-size: 0.8em;
    color: #d9d9d9;
  }
  input:focus + label,
  input:active + label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transform-origin: left bottom;
    transform: translate(0, -1.7rem);
    font-size: 0.8em;
    color: ${theme.primary};
  }
`;
