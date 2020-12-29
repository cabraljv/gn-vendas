import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import AdminCategories from '../pages/AdminCategories';
import AdminMain from '../pages/AdminMain';
import AdminProducts from '../pages/AdminProducts';
import AdminSales from '../pages/AdminSales';

export const Container = styled.div`
  display: flex;
  width: 100%;
  div.routes {
    margin-left: 250px;
  }
`;

function AdminRoutes() {
  const location = useLocation();
  const currentRoute = location.pathname.split('/')[1];
  return (
    <Container>
      {currentRoute === 'admin' && <SideBar />}
      <div className="routes">
        <Route path="/admin" exact component={AdminMain} />
        <Route path="/admin/categories" component={AdminCategories} />
        <Route path="/admin/products" component={AdminProducts} />
        <Route path="/admin/sales" component={AdminSales} />
      </div>
    </Container>
  );
}

export default AdminRoutes;
