import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../hooks/auth';
import 'react-toastify/dist/ReactToastify.css';

import Home from '../pages/Home';
import Product from '../pages/Product';
import AuthRoutes from './auth.routes';

const StyledToastContainer = styled(ToastContainer).attrs({
  // custom props
})`
  .Toastify__toast-container {
  }
  .Toastify__toast {
  }
  .Toastify__toast--error {
    background: #fff;
    border: 1px solid #ff4a1c;
    border-radius: 5px;
    border-left: 8px solid #ff4a1c;
    color: #ff4a1c;
  }
  .Toastify__toast--warning {
  }
  .Toastify__toast--success {
    background: #fff;
    border: 1px solid #ff4a1c;
    border-radius: 5px;
    border-left: 8px solid #ff4a1c;
    color: #ff4a1c;
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
  }
`;

export default function AppRoutes() {
  return (
    <>
      <AuthProvider>
        <Route path="/" exact component={Home} />
        <Route path="/product/:id" component={Product} />

        <AuthRoutes />
      </AuthProvider>
      <StyledToastContainer />
    </>
  );
}
