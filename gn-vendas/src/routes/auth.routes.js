import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SingUp';
import { useAuth } from '../hooks/auth';
import AdminRoutes from './admin.routes';
import SaleSuccess from '../pages/SaleSuccess';

function AuthRoutes() {
  const { signed, user } = useAuth();
  return (
    <>
      {!signed && (
        <>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
        </>
      )}
      {signed && user.is_admin && <AdminRoutes />}
      {signed && (
        <>
          <Route path="/sale/success" component={SaleSuccess} />
        </>
      )}
    </>
  );
}

export default AuthRoutes;
