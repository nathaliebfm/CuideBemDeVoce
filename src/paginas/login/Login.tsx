import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { fontWeight } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import './Login.css'

function Login() {
    return (
        <>
            <Grid container direction="row" alignItems="center" justifyContent="center">
                <Grid item xs={6}>
                    <Box paddingX={20}>
                        <form>
                            <Typography variant="h4" gutterBottom align="center" className="textos1" style={{ color: "#449DD1"}}>Entrar</Typography>
                            <TextField id="usuario" label="Usuário (e-mail)" name="usuario" fullWidth margin="normal" variant="outlined" />
                            <TextField id="senha" label="Senha" name="senha" type="password" fullWidth margin="normal" variant="outlined" />
                            <Box marginTop={2} textAlign="center">
                                <Link to="/home" className="text-decorator-none">
                                    <Button type="submit" variant="contained" style={{ backgroundColor: "#C589E8", color: "white" }}>Logar</Button>
                                </Link>
                            </Box>
                        </form>
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Box marginRight={1}>
                                <Typography variant="subtitle1" align="center" gutterBottom>Ainda não tem uma conta? </Typography>
                            </Box>
                            <Typography variant="subtitle1" align="center" gutterBottom className="textos1">Cadastre-se</Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={6} className="fundoLogin"></Grid>
            </Grid>
        </>
    )
}

export default Login;