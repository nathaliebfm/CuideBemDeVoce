import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import React, { ChangeEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { login } from "../../service/Service";
import UserLogin from "../../model/UserLogin";
import './Login.css'

function Login() {

    let navigate = useNavigate();
    const [token, setToken] = useLocalStorage("token");
    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: "",
        usuario: "",
        foto: "",
        senha: "",
        token: ""
    })

    function updateModel(event: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value
        });
        console.log(userLogin);
    } //atualiza a model com os dados de input do usuário

    useEffect(() => {
        if (token != "") {
            navigate("/home")
        }
    }, [token]) /*Redireciona o usuário para a Home se o token for diferente de vazio, ou seja, se ele existir */

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            await login("/usuarios/logar", userLogin, setToken)

            alert("Usuário logado com sucesso!")
        } catch (error) {
            alert("Dados incorretos. Erro ao logar!")
        }
    }

    return (
        <>
            <Grid container direction="row" alignItems="center" justifyContent="center">
                <Grid item xs={6}>
                    <Box paddingX={20}>
                        <form onSubmit={onSubmit}>
                            <Typography variant="h4" gutterBottom align="center" className="textos1" style={{ color: "#449DD1" }}>
                                Entrar
                            </Typography>
                            <TextField
                                value={userLogin.usuario}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                id="usuario"
                                label="Usuário (e-mail)"
                                name="usuario"
                                fullWidth
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                value={userLogin.senha}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                id="senha"
                                label="Senha"
                                name="senha"
                                type="password"
                                fullWidth
                                margin="normal"
                                variant="outlined" />
                            <Box marginTop={2} textAlign="center">
                                <Button type="submit" variant="contained" style={{ backgroundColor: "#C589E8", color: "white" }}>
                                    Logar
                                </Button>
                            </Box>
                        </form>
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Box marginRight={1}>
                                <Typography variant="subtitle1" align="center" gutterBottom>
                                    Ainda não tem uma conta?
                                </Typography>
                            </Box>
                            <Link to="/cadastrousuario">
                                <Typography variant="subtitle1" align="center" gutterBottom className="textos1">
                                    Cadastre-se
                                </Typography>
                            </Link>

                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={6} className="fundoLogin"></Grid>
            </Grid>
        </>
    )
}

export default Login;