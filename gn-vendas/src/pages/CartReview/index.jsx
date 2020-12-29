import React, { useEffect, useMemo, useState } from 'react';
import { BiDollarCircle } from 'react-icons/bi';
import { Redirect, useHistory } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import NavBar from '../../components/NavBar';
import { Container, CartItemContainer } from './styles';
import { useCart } from '../../hooks/cart';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

function CartItem({ product }) {
  const { removeProduct } = useCart();

  function handleRemove() {
    removeProduct(product);
  }
  const formated_total_price = useMemo(
    () =>
      product
        ? `${parseFloat(
            `${product.price * product.amount}`.substring(
              0,
              `${parseFloat(product.price * product.amount)}`.length - 2
            )
          ).toFixed(2)}`.replace('.', ',')
        : '0,00',
    [product]
  );
  return (
    <CartItemContainer>
      <img src={product.img_path} alt="" />
      <div className="info">
        <p className="name">{product.name}</p>
        <p className="amount">Quantidade: {product.amount} unidades</p>
      </div>
      <div className="price">
        <p className="price-text">Preço:</p>
        <p className="price-value">R$ {formated_total_price}</p>
      </div>
      <button type="button" onClick={handleRemove}>
        REMOVER
      </button>
    </CartItemContainer>
  );
}

function CartReview() {
  const { products, resetCart } = useCart();
  const { signed } = useAuth();
  const [totalPrice, setTotalPrice] = useState(100);
  const [loading, setLoading] = useState(false);

  const formated_total_price = useMemo(
    () =>
      totalPrice
        ? `${parseFloat(
            `${totalPrice}`.substring(0, `${parseFloat(totalPrice)}`.length - 2)
          ).toFixed(2)}`.replace('.', ',')
        : '0,00',
    [totalPrice]
  );
  useEffect(() => {
    let price = 0;
    for (let i = 0; i < products.length; i += 1) {
      price += products[i].price * products[i].amount;
    }
    setTotalPrice(price);
  }, [products]);

  const history = useHistory();

  async function handleSubmit() {
    setLoading(true);
    const products_body = products.map((item) => ({
      id: item.id,
      amount: item.amount,
    }));
    const response = await api.post('/sale', { products: products_body });
    if (response.status === 200) {
      resetCart();
      history.push({
        pathname: '/sale/success',
        state: {
          billet: response.data.sale.boleto_url,
          price: formated_total_price,
        },
      });
    }
    setLoading(false);
  }

  if (!signed) {
    return <Redirect to="/login" />;
  }
  return (
    <Container loading={loading}>
      <div className="loading">
        <div className="loading-content">
          <ClipLoader size={100} color="#fff" loading />
          <p>Processando...</p>
        </div>
      </div>
      <header>
        <NavBar />
      </header>
      <div className="content">
        <ul>
          {products.map((item) => (
            <CartItem product={item} key={item.id} />
          ))}
        </ul>
        <footer>
          <p className="total-price">
            Total: <span>R$ {formated_total_price}</span>
          </p>
          <button type="button" onClick={handleSubmit}>
            <BiDollarCircle size={25} />
            <p>FINALIZAR COMPRA</p>
          </button>
        </footer>
      </div>
    </Container>
  );
}

export default CartReview;
