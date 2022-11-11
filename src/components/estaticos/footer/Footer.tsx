import React from "react";
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Box, Grid, Typography } from "@mui/material";
import "./Footer.css"
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";

function Footer() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    var footerComponent;

    if (token !== "") {
        footerComponent = <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid alignItems="center" item xs={12}>
                <Box className="box1">
                    <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                        <Typography variant="h6" align="center" gutterBottom className="textos">Nossas redes sociais:</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <a href="https://www.facebook.com/generationbrasil" target="_blank">
                            <FacebookIcon className="redes" />
                        </a>
                        <a href="https://www.instagram.com/generationbrasil/" target="_blank">
                            <InstagramIcon className="redes" />
                        </a>
                        <a href="https://www.linkedin.com/sch6ool/generationbrasil/" target="_blank">
                            <WhatsAppIcon className="redes" />
                        </a>
                    </Box>
                </Box>
                <Box className="box2">
                    <Box paddingTop={1} display="flex" justifyContent="center" alignItems="center">
                        <Typography variant="subtitle2" align="center" gutterBottom className="textos" >© 2022 Copyright:</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Typography variant="subtitle2" gutterBottom className="textos" align="center">Cuide Bem de Você - Érika Brasil</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    }

    return (
        <>
            {footerComponent}
        </>
    )
}

export default Footer;