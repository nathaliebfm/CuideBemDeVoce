import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography, CardActionArea, CardMedia } from '@material-ui/core';
import './ListaPostagem.css';
import { Box } from '@mui/material';

function ListaPostagem() {

  return (
    <>
      <Box m={2} >
        <Card variant="outlined">
        <CardActionArea>
        <CardMedia
          component="img"
          alt="Logo Cuide Bem de Você"
          height="300vh"
          width= "20vw"
          image="https://i.imgur.com/chU9RlH.png"
          title="Logo CBDV"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Primeiro Post - Cuide Bem de Você
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Lick left leg for ninety minutes, still dirty at four in the morning wake up owner meeeeeeooww scratch at legs and beg for food then cry and yowl until they wake up at two pm jump on window and sleep while observing the bootyful cat next door that u really like but who already has a boyfriend end up making babies with her and let her move in meow meow.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" size='small' style={{ backgroundColor: "#C589E8", color: "white" }}>
          Atualizar
        </Button>
        <Button variant="contained" size='small' style={{ backgroundColor: "#F18F01", color: "white" }}>
          Deletar
        </Button>
      </CardActions>
        </Card>
      </Box>
    </>)
}

export default ListaPostagem;