import React, { useMemo, useState } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { Container } from './styles';
import { useCart } from '../../hooks/cart';

function AddProduct({ active, product, onCancel }) {
  const [units, setUnits] = useState(1);
  const { addProduct } = useCart();
  const formated_price = useMemo(
    () =>
      product
        ? `${parseFloat(
            `${product.price}`.substring(0, `${product.price}`.length - 2)
          ).toFixed(2)}`.replace('.', ',')
        : '0,00',
    [product]
  );
  const formated_total_price = useMemo(
    () =>
      product
        ? `${parseFloat(
            `${product.price * units}`.substring(
              0,
              `${parseFloat(product.price * units)}`.length - 2
            )
          ).toFixed(2)}`.replace('.', ',')
        : '0,00',
    [product, units]
  );
  function handleAddProduct() {
    const product_add = { ...product, amount: units };
    addProduct(product_add);
    onCancel();
  }
  return (
    <Container active={active}>
      <div className="content">
        <div className="product-content">
          <img src={product.img_path} alt={product.id} />
          <div className="product-info">
            <p className="title">{product.name}</p>
            <div className="price">
              <span className="price-value">
                R$ <span>{formated_price}</span>
              </span>
              <p className="suport-text">por unidade</p>
            </div>
            <div className="units">
              <input
                type="number"
                name="units"
                id="units"
                defaultValue={1}
                min={1}
                onChange={(e) => setUnits(parseInt(e.target.value, 10))}
              />
              <p>unidades</p>
            </div>
            <p className="total-product">
              Total do produto: <span>R${formated_total_price}</span>
            </p>
          </div>
        </div>
        <div className="buttons">
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" onClick={handleAddProduct}>
            <TiShoppingCart size={18} />
            <p>ADICIONAR AO CARRINHO</p>
          </button>
        </div>
      </div>
    </Container>
  );
}

export default AddProduct;
