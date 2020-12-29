import React from 'react';
import AppRoutes from './app.routes';
import { CartProvider } from '../hooks/cart';

function Routes() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default Routes;
