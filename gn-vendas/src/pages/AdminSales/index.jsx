import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

import { Container } from './styles';
import api from '../../services/api';

function AdminSales() {
  const [sales, setSales] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await api.get('/admin/sales');
      if (response.status === 200) {
        setSales(response.data);
      }
    }
    getData();
  }, []);
  return (
    <Container>
      <Container>
        <div className="categories-content">
          <MaterialTable
            title="Vendas"
            columns={[
              { title: 'ID', field: 'id' },
              { title: 'Usuário', field: 'user' },
              { title: 'Boleto vencido', field: 'vencido' },
              { title: 'Total', field: 'price' },
            ]}
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
            data={sales}
          />
        </div>
      </Container>
    </Container>
  );
}

export default AdminSales;
