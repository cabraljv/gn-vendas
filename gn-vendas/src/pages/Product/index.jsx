import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { TiShoppingCart } from 'react-icons/ti';
import HomeProduct from '../../components/HomeProduct';
import NavBar from '../../components/NavBar';
import { Container } from './styles';
import api from '../../services/api';
import AddProduct from '../../components/AddProduct';

function Product() {
  const [product, setProduct] = useState();
  const [recomended, setRecomended] = useState([]);
  const [addOpen, setAddOpen] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    async function getData() {
      const response = await api.get(`/products/${id}`);
      if (response.status === 200) {
        setProduct(response.data);
        const recomended_resp = await api.get(
          `/products?categories=${response.data.category.id}`
        );
        if (recomended_resp.status === 200) setRecomended(recomended_resp.data);
      }
    }
    getData();
  }, []);
  const formated_price = useMemo(
    () =>
      product
        ? `${parseFloat(
            `${product.price}`.substring(0, `${product.price}`.length - 2)
          ).toFixed(2)}`.replace('.', ',')
        : '0,00',
    [product]
  );
  return (
    <>
      <Container>
        <header>
          <NavBar />
        </header>
        <div className="content">
          {product && (
            <div className="product-data">
              <img src={product.img_path} alt="" />
              <div className="info">
                <div className="header">
                  <h1>{product.name}</h1>
                  <span>
                    <p>{product.category.name}</p>
                    <p>{product.sale_amount} vendidos</p>
                  </span>
                </div>
                <p className="description">{product.description}</p>
                <div className="footer">
                  <div className="price">
                    <span className="price-value">
                      R$ <span>{formated_price}</span>
                    </span>
                  </div>
                  <button type="button" onClick={() => setAddOpen(true)}>
                    <TiShoppingCart size={25} />
                    <p>ADICIONAR AO CARRINHO</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          <p className="recomended-text">
            Outros produtos que talvez você goste
          </p>
          <div className="recomended-products">
            {recomended.map(
              (item) =>
                `${item.id}` !== id && (
                  <HomeProduct
                    name={item.name}
                    key={item.id}
                    img_path={item.img_path}
                    price={item.price}
                    id={item.id}
                  />
                )
            )}
          </div>
        </div>
      </Container>
      {product && (
        <AddProduct
          active={addOpen}
          product={product}
          onCancel={() => setAddOpen(false)}
        />
      )}
    </>
  );
}

export default Product;
