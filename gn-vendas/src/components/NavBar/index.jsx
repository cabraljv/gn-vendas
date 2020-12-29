import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import shop_icon from '../../assets/icons/shop.svg';
import menu_icon from '../../assets/icons/menu.svg';
import { Container, CartContainer } from './styles';
import { useCart } from '../../hooks/cart';
import { useAuth } from '../../hooks/auth';

function CartItem({ product }) {
  const { removeProduct } = useCart();
  function handleRemove() {
    removeProduct(product);
  }
  return (
    <CartContainer>
      <div className="product-info">
        <img src={product.img_path} alt="" />
        <div className="product-texts">
          <p className="title">{product.name}</p>
          <p className="amount">Quantidadee: {product.amount} unid</p>
        </div>
      </div>
      <button type="button" onClick={handleRemove}>
        REMOVER
      </button>
    </CartContainer>
  );
}

function NavBar() {
  const { products } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const history = useHistory();
  const { user, signOut, signed } = useAuth();

  return (
    <Container cart_open={cartOpen} menu_open={menuOpen}>
      <a href="/">Gn-Vendas</a>
      <ul>
        <li>
          <button type="button" onClick={() => setCartOpen(!cartOpen)}>
            <p>Sacola</p>
            <div className="cart">
              <img src={shop_icon} alt="sacola" />
              <span className="cart-items">
                <p>{products.length}</p>
              </span>
            </div>
          </button>
          <div className="cart-list">
            <ul>
              {products.map((item) => (
                <CartItem key={item.id} product={item} />
              ))}
              {products.length === 0 && <p>Nenhum produto no carrinho</p>}

              <li>
                <button
                  className="finish"
                  type="button"
                  disabled={products.length === 0}
                  onClick={() => history.push('/cart')}
                >
                  FINALIZAR PEDIDO
                </button>
              </li>
            </ul>
          </div>
        </li>
        <span className="divisor" />
        <li>
          {signed ? (
            <>
              <button type="button" onClick={() => setMenuOpen(!menuOpen)}>
                <img src={menu_icon} alt="menu" />
                <p>Menu</p>
              </button>
              <div className="menu-list">
                <ul>
                  <li>{user.name}</li>
                  <li>{user.email}</li>
                  <li>
                    <button className="exit" type="button" onClick={signOut}>
                      Sair
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <button type="button" onClick={() => history.push('/login')}>
              Entrar
            </button>
          )}
        </li>
      </ul>
    </Container>
  );
}

export default NavBar;
