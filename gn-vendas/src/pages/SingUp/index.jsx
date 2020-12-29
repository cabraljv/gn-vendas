import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import NavBar from '../../components/NavBar';
import { Container, Campo } from './styles';
import validateCPF from '../../services/validateCPF';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [cpf, setCpf] = useState();
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  async function handleSubmit() {
    setLoading(true);
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      name: Yup.string().required(),
      cpf: Yup.string().required().length(14),
      phone: Yup.string().required().length(17),
    });
    const req_body = {
      email,
      password,
      cpf,
      name,
      phone,
    };
    try {
      await schema.validate(req_body);
    } catch (err) {
      toast('Preencha todos os campos corretamente', {
        position: 'top-right',
        type: 'error',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
      await signIn(req_body.email, req_body.password);
      setLoading(false);

      return 0;
    }
    req_body.cpf = req_body.cpf.replaceAll('.', '').replaceAll('-', '');
    if (!validateCPF(req_body.cpf)) {
      toast('CPF inválido', {
        position: 'top-right',
        type: 'error',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
      setLoading(false);

      return 0;
    }
    try {
      const response = await api.post('/user', req_body);
      if (response.status === 201) {
        toast('Usuário criado com sucesso', {
          position: 'top-right',
          type: 'success',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      } else {
        toast('Ocorreu um erro ao criar o usuário', {
          position: 'top-right',
          type: 'error',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast('Ocorreu um erro ao criar o usuário', {
        position: 'top-right',
        type: 'error',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
    setLoading(false);

    return 1;
  }

  return (
    <Container>
      <NavBar />
      <div className="login-container">
        <p className="login-header">Cadastrar</p>
        <form>
          <Campo>
            <input
              id="name"
              type="text"
              placeholder=" "
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Nome</label>
          </Campo>
          <Campo>
            <InputMask
              mask="+55 99 99999 9999"
              maskChar=" "
              placeholder=" "
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="phone">Telefone</label>
          </Campo>
          <Campo>
            <InputMask
              mask="999.999.999-99"
              maskChar=" "
              placeholder=" "
              id="cpf"
              onChange={(e) => setCpf(e.target.value)}
            />
            <label htmlFor="cpf">CPF</label>
          </Campo>
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
          {loading ? (
            <ClipLoader size={25} color="#fff" loading />
          ) : (
            <p>Cadastrar</p>
          )}
        </button>
        <button type="button" className="signup">
          Entrar na minha conta
        </button>
      </div>
    </Container>
  );
}

export default SignUp;
