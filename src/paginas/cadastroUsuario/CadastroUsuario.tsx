import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import "./CadastroUsuario.css";
import { cadastroUsuario } from '../../service/Service';
import User from '../../model/User';
import { useNavigate } from 'react-router-dom';

function CadastroUsuario() {

    let navigate = useNavigate();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: ""
        })

    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: ""
        })

    useEffect(() => {
        if (userResult.id != 0) {
            navigate("/login")
        }
    }, [navigate, userResult])


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }


    function updateModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if (confirmarSenha == user.senha) {
            cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
            alert('Usuario cadastrado com sucesso')
        } else {
            alert('Dados inconsistentes. Favor verificar as informações de cadastro.')
        }
    }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6} className="imagem2"></Grid>
            <Grid item xs={6} alignItems="center">
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
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