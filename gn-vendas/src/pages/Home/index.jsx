import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { Container } from './styles';
import api from '../../services/api';
import ProductsArea from '../../components/ProductsArea';

function Home() {
  const [headerProduct, setHeaderProduct] = useState();
  const history = useHistory();

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products');
      if (response.status === 200) {
        if (response.data.length > 0) setHeaderProduct(response.data[0]);
      }
    }

    getProducts();
  }, []);
  function handleReadMore() {
    history.push(`/product/${headerProduct.id}`);
  }

  return (
    <Container>
      <header id="page-header">
        <NavBar />

        <div className="content">
          <div className="bg" />
          {headerProduct && (
            <div className="header-content">
              <div className="left">
                <h2>{headerProduct.name}</h2>
                <p className="categoria">{headerProduct.category.name}</p>
                <p className="descricao">{headerProduct.description}</p>
                <button type="button" onClick={handleReadMore}>
                  LER MAIS
                </button>
              </div>
              <div className="right">
                <img src={headerProduct.img_path} alt="" />
              </div>
            </div>
          )}
        </div>
      </header>
      <ProductsArea />
      <footer>
        Feito por{' '}
        <a href="https://www.linkedin.com/in/cabraljv/">João Victor Cabral</a>
      </footer>
    </Container>
  );
}

export default Home;
