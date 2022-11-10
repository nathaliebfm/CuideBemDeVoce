import { Box, Button, Grid, TextField } from '@mui/material';
import React, { ChangeEvent, useState, useEffect } from 'react';
import './CadastroUsuario.css';
import { Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import User from '../../model/User';
import { cadastroUsuario } from '../../service/Service';

function CadastroUsuario() {

    let history = useNavigate();
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
        alert('Usuário cadastrado com sucesso'); //msg em caso de sucesso
      } catch (error) {
        alert('Falha interna ao cadastrar'); //caso de erro no backend, cai aqui
        console.log(error);
      }
    } else {
      // msg de erro para o caso de não passar no if das senhas
      alert('As senhas não conferem. Favor verificar novamente');

      setUser({ ...user, senha: '' }); //zerar o campo de senha
      setConfirmarSenha(''); // zerar o campo de confirmar senha
    }
  }

  // assim que receber o ID de retorno do cadastro do backend, redireciona pro Login.
  useEffect(() => {
    if (userResult.id !== 0) {
      history('/login');
    }
  }, [history, userResult]);

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" className="fundo">
            <Grid item xs={6} className="imagem2"></Grid>
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
                            placeholder="Digite pelo menos 8 caracteres"
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
                            <Button type="submit" variant="contained" style={{ backgroundColor: "#C589E8", color: "white" }}>
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