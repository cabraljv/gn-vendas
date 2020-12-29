import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from '../../components/NavBar';
import { useAuth } from '../../hooks/auth';
import { Container, Campo } from './styles';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const { signIn } = useAuth();
  async function handleSubmit() {
    if (email && password) {
      const signed = await signIn(email, password);
      if (signed) {
        history.push('/');
      } else {
        toast('Falha no login', {
          position: 'top-right',
          type: 'error',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      }
    } else {
      toast('Preencha todos os campos corretamente', {
        position: 'top-right',
        type: 'error',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
  }
  return (
    <Container>
      <NavBar />
      <div className="login-container">
        <p className="login-header">Login</p>
        <form>
          <Campo>
            <input
              id="email"
              type="email"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </Campo>
          <Campo>
            <input
              id="passwd"
              type="password"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="passwd">Senha</label>
          </Campo>
        </form>
        <button type="button" className="signin" onClick={handleSubmit}>
          ENTRAR
        </button>
        <button
          type="button"
          className="signup"
          onClick={() => history.push('/signup')}
        >
          Cadastrar
        </button>
      </div>
    </Container>
  );
}

export default Login;
