import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';

function HomeProduct({ img_path, name, price, id }) {
  const history = useHistory();
  function handleClick() {
    history.push(`/product/${id}`);
  }
  const formated_price = useMemo(
    () =>
      `${`${price}`.substring(
        0,
        `${parseFloat(price)}`.length - 2
      )},${`${price}`.substring(`${price}`.length - 2, `${price}`.length)}`,
    [price]
  );
  return (
    <Container onClick={handleClick}>
      <img src={img_path} alt="" />
      <div className="product-footer">
        <p className="product-title">{name}</p>
        <div className="price">
          <span className="price-value">
            R$ <span>{formated_price}</span>
          </span>
          <p className="suport-text">À VISTA NO BOLETO</p>
        </div>
      </div>
    </Container>
  );
}

export default HomeProduct;
