import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import HomeProduct from '../HomeProduct';
import { Container, CategoryItem } from './styles';

function ProductsArea() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterDate, setFilterDate] = useState();
  const [filterPrice, setFilterPrice] = useState();
  async function handleApplyFilters() {
    const filterCategories = categories.filter((item) => item.active);
    const categoriesSend = filterCategories.map((item) => item.id);
    const response = await api.get(
      `/products?${filterPrice ? `price=${filterPrice}` : ''}${
        filterDate ? `&date=${filterDate}` : ''
      }${categoriesSend.length > 0 && `&categories=${categoriesSend.join()}`}`
    );
    if (response.status === 200) {
      setProducts(response.data);
    }
  }
  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products');
      if (response.status === 200) {
        setProducts(response.data);
      }
    }
    async function getCategories() {
      const response = await api.get('/categories');
      if (response.status === 200) {
        setCategories(response.data);
      }
    }
    getProducts();
    getCategories();
  }, []);
  function handleSelectCategory(index) {
    let aux = categories;
    if (aux[index].active) {
      aux[index].active = !aux[index].active;
    } else {
      aux[index].active = true;
    }
    setCategories(aux);
  }
  return (
    <Container>
      <header>
        <h3>Novidades</h3>
        <p>Confira os ultimos produtos cadastrados na loja</p>
      </header>
      <div className="products-content">
        <section className="filtros">
          <p className="filtros-title">Filtros</p>
          <span className="divisor-horizontal" />
          <span className="radio-item">
            <input
              type="radio"
              name="data"
              id="recente"
              onClick={() => setFilterDate('ascending')}
            />
            <label htmlFor="recente">Mais recentes</label>
          </span>
          <span className="radio-item">
            <input
              type="radio"
              name="data"
              id="antigos"
              onClick={() => setFilterDate('descending')}
            />
            <label htmlFor="antigos">Mais antigos</label>
          </span>
          <span className="divisor-horizontal" />
          <span className="radio-item">
            <input
              type="radio"
              name="preco"
              id="caros"
              onClick={() => setFilterPrice('descending')}
            />
            <label htmlFor="caros">Mais caros</label>
          </span>
          <span className="radio-item">
            <input
              type="radio"
              name="preco"
              id="baratos"
              onClick={() => setFilterPrice('ascending')}
            />
            <label htmlFor="baratos">Mais baratos</label>
          </span>
          <span className="divisor-horizontal" />
          <p className="filtros-subtitle">Categorias</p>
          <div className="categories-list">
            <ul>
              {categories.map((item, index) => (
                <CategoryItem
                  key={item.id}
                  active={item.active}
                  onClick={() => handleSelectCategory(index)}
                >
                  {item.name}
                </CategoryItem>
              ))}
            </ul>
          </div>
          <button type="button" onClick={handleApplyFilters}>
            Aplicar filtros
          </button>
        </section>
        <section className="show-products">
          {products.map((item) => (
            <HomeProduct
              name={item.name}
              key={item.id}
              img_path={item.img_path}
              price={item.price}
              id={item.id}
            />
          ))}
        </section>
      </div>
    </Container>
  );
}

export default ProductsArea;
