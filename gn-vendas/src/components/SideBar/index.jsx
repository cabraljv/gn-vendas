import React from 'react';
import { BiShoppingBag, BiDollarCircle } from 'react-icons/bi';
import { CgMenuBoxed } from 'react-icons/cg';
import { Link, useLocation } from 'react-router-dom';
import { Container } from './styles';

function SideBar() {
  const location = useLocation();
  const currentRoute = location.pathname.split('/')[2];
  return (
    <Container>
      <h1>Gn-Vendas</h1>
      <ul>
        <li className={currentRoute === 'products' ? 'active' : 'menuItem'}>
          <Link to="/admin/products">
            <BiShoppingBag size={25} /> <p>Produtos</p>
          </Link>
        </li>
        <li className={currentRoute === 'categories' ? 'active' : 'menuItem'}>
          <Link to="/admin/categories">
            <CgMenuBoxed size={25} />
            <p>Categorias</p>
          </Link>
        </li>
        <li className={currentRoute === 'sales' ? 'active' : 'menuItem'}>
          <Link to="/admin/sales">
            <BiDollarCircle size={25} />
            <p>Vendas</p>
          </Link>
        </li>
      </ul>
    </Container>
  );
}

export default SideBar;
