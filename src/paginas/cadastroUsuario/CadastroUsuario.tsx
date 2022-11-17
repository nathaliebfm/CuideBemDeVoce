import { Box, Button, Grid, TextField } from '@mui/material';
import React, { ChangeEvent, useState, useEffect } from 'react';
import './CadastroUsuario.css';
import { Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import User from '../../model/User';
import { cadastroUsuario } from '../../service/Service';
import { toast } from 'react-toastify';

function CadastroUsuario() {

  let navigate = useNavigate();
  // state reservado para pegar apenas o campo de confirmação de senha, que não irá para o backend
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  // função para atualizar o campo de confirmação de senha
  function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  // oneWay data-binding

  // state que vai levar os dados para o backend
  const [user, setUser] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });

  // state que recebera os dados de retorno do backend (devido a senha que volta criptografada)
  const [userResult, setUserResult] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });

  // mesma coisa do componente de Login, função que irá atualizar o state junto com o formulário
  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  async function cadastrar(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    // verificação dos campos de senha

    // = => atribuição de valor
    // == => checa o conteudo
    // ===  => checa conteudo e tipagem

    // 123 == '123'
    if (confirmarSenha === user.senha && user.senha.length >= 3) {
      // caso senhas ok, tenta cadastrar no backend
      try {
        await cadastroUsuario('/usuarios/cadastrar', user, setUserResult);
        toast.success("Usuário cadastrado com sucesso!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "colored",
          progress: undefined,
        }); //msg em caso de sucesso
      } catch (error) {
        toast.error("Falha interna ao cadastrar, tente novamente mais tarde!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "colored",
          progress: undefined,
        }); //caso de erro no backend, cai aqui
        console.log(error);
      }
    } else {
      // msg de erro para o caso de não passar no if das senhas
      toast.warning("As senhas não conferem, tente novamente!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });

      setUser({ ...user, senha: '' }); //zerar o campo de senha
      setConfirmarSenha(''); // zerar o campo de confirmar senha
    }
  }

  // assim que receber o ID de retorno do cadastro do backend, redireciona pro Login.
  useEffect(() => {
    if (userResult.id !== 0) {
      navigate('/login');
    }
  }, [navigate, userResult]);

  //Verificação de campos do formulário para liberar o botão

  const [formCadastro, setFormCadastro] = useState(true)

  //Regex do padrão de senha: letras maiúsculas e minúsculas + números, com no mínimo 8 caracteres

  const padraoSenha = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/

  //Regex do padrão de email

  const padraoEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  useEffect(() => {
    if (user.nome.length >= 2 && user.usuario.match(padraoEmail) && user.senha.match(padraoSenha)) {
      setFormCadastro(false)
    } else {
      setFormCadastro(true)
    }
  }, [user])

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" className="fundo">
      <Grid item xs={6} className="fundoCadastro"></Grid>
      <Grid item xs={6} alignItems="center">
        <Box paddingX={10}>
          <form onSubmit={cadastrar}>
            <Typography variant="h4" gutterBottom align="center" className="textos2" style={{ color: "#449DD1" }}>Cadastro</Typography>
            <TextField
              value={user.nome}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
              id="nome"
              label="Nome"
              name="nome"
              fullWidth
              margin="normal"
              required
              variant="outlined" />
            <TextField
              value={user.usuario}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
              id="usuario"
              label="Usuário (e-mail)"
              name="usuario"
              fullWidth
              margin="normal"
              required
              placeholder="Digite um e-mail válido"
              variant="outlined" />
            <TextField
              value={user.foto}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
              id="foto"
              label="URL da Foto de Perfil"
              name="foto"
              fullWidth
              margin="normal"
              variant="outlined" />
            <TextField
              value={user.senha}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
              id="senha"
              label="Senha"
              name="senha"
              type="password"
              fullWidth
              margin="normal"
              required
              placeholder="8 caracteres, número e letras maiúsculas e minúsculas"
              variant="outlined" />
            <TextField
              value={confirmarSenha}
              onChange={(event: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(event)}
              id="confirmarSenha"
              label="Confirmar Senha"
              name="confirmarSenha"
              type="password"
              fullWidth
              margin="normal"
              required
              variant="outlined" />
            <Box marginTop={2} textAlign="center">
              <Link to="/login" className="text-decorator-none">
                <Button variant="contained" className="btnCancelar" style={{ backgroundColor: "#F18F01", color: "white" }}>
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" variant="contained" className="cadastroBtn" disabled={formCadastro}>
                Cadastrar
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>


    </Grid>
  );
}

export default CadastroUsuario;