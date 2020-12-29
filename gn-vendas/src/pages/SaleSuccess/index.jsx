import React from 'react';
import { AiOutlinePrinter } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { Container } from './styles';

function SaleSuccess() {
  const location = useLocation();
  return (
    <Container>
      <header>
        <NavBar />
      </header>
      <div className="content">
        <div className="texts">
          <h2>Compra registrada com sucesso</h2>
          <p className="description">
            Seu boleto está disnponível para pagamento
          </p>
        </div>
        <div className="footer-infos">
          <p className="total">
            Total: <span>R$ {location.state.price}</span>
          </p>
          <a href={location.state.billet}>
            <AiOutlinePrinter size={18} /> <p>IMPRIMIR</p>
          </a>
        </div>
      </div>
    </Container>
  );
}

export default SaleSuccess;
