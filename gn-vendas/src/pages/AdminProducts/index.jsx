import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { Container } from './styles';
import api from '../../services/api';
import NewProduct from '../../components/NewProduct';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [newProductOpen, setNewProductOpen] = useState(false);

  async function getData() {
    const response = await api.get('/admin/products');
    if (response.status === 200) {
      const aux = response.data.map((item) => ({
        ...item,
        category: item.category.name,
        price: `R$ ${`${item.price}`.substring(
          0,
          `${parseFloat(item.price)}`.length - 2
        )},${`${item.price}`.substring(
          `${item.price}`.length - 2,
          `${item.price}`.length
        )}`,
      }));
      setProducts(aux);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {newProductOpen && (
        <NewProduct handleClose={() => setNewProductOpen(false)} />
      )}

      <div className="content">
        <h2>Produtos</h2>
        <MaterialTable
          title=""
          columns={[
            { title: 'ID', field: 'id', type: 'numeric' },
            { title: 'Nome', field: 'name' },
            { title: 'Preço', field: 'price' },
            { title: 'Categoria', field: 'category' },
          ]}
          data={products}
          localization={{
            body: {
              emptyDataSourceMessage: 'Nenhum registro para exibir',
            },
            toolbar: {
              searchTooltip: 'Pesquisar',
            },
            pagination: {
              labelRowsSelect: 'linhas',
              labelDisplayedRows: '{count} de {from}-{to}',
              firstTooltip: 'Primeira página',
              previousTooltip: 'Página anterior',
              nextTooltip: 'Próxima página',
              lastTooltip: 'Última página',
            },
          }}
        />
        <footer>
          <button type="button" onClick={() => setNewProductOpen(true)}>
            Adicionar
          </button>
        </footer>
      </div>
    </Container>
  );
}

export default AdminProducts;
