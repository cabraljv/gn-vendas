import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { Container } from './styles';
import api from '../../services/api';

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  async function getData() {
    const response = await api.get('/categories');
    if (response.status === 200) {
      setCategories(response.data);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <div className="categories-content">
        <MaterialTable
          title="Categorias"
          columns={[{ title: 'Categoria', field: 'name' }]}
          editable={{
            onRowAdd: async (newData) => {
              await api.post('/categories', newData);
              await getData();
            },
          }}
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
          data={categories}
        />
      </div>
    </Container>
  );
}

export default AdminCategories;
