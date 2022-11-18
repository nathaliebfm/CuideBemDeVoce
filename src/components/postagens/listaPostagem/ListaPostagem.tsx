import React, { useState, useEffect, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import Postagem from '../../../model/Postagem'
import { busca } from '../../../service/Service'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaPostagem.css';
import useLocalStorage from 'react-use-localstorage';
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([])
  // const [token, setToken] = useLocalStorage('token');
  let navigate = useNavigate();

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  )

  useEffect(() => {
    if (token == "") {
      toast.error("Você precisa estar logado!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      navigate("/login")

    }
  }, [token])

  const [postBuscado, setPostBuscado] = useState("")

  function updateBusca(event: ChangeEvent<HTMLInputElement>) {
    setPostBuscado(
      event.target.value
    )
  }

  async function getPost() {
    if (postBuscado !== "") {
      await busca(`/postagens/titulo/${postBuscado}`, setPosts, {
        headers: {
          Authorization: token
        }
      })
    } else {
      await busca("/postagens", setPosts, {
        headers: {
          'Authorization': token
        }
      })
    }
  }

  useEffect(() => {

    getPost()

  }, [posts.length])

  return (
    <>
      <div className="group">
        <input placeholder="Search" type="search" className="input" name='busca' onChange={(event: ChangeEvent<HTMLInputElement>) => updateBusca(event)} />
        <svg className="icon" onClick={getPost} aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
      </div>
      
      <Box className="containerLista">

      {posts.length === 0 && <div className="preloader-inner">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>}
        

        {posts.map(post => (
            <Box alignSelf="flex-start" >
              <Card variant="outlined" className="postagens">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {post.titulo}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {post.texto}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Postagem feita em: {new Date(Date.parse(post.data)).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Tema: {post.tema?.descricao}
                  </Typography>
                  <Typography>
                    Postado por: {post.usuario?.nome}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box display="flex" justifyContent="center" mb={1.5}>

                    <Link to={`/formularioPost/${post.id}`} className="text-decorator-none" >
                      <Box mx={1}>
                        <Button variant="contained" size='small' className="btnAtualizar" >
                          atualizar
                        </Button>
                      </Box>
                    </Link>
                    <Link to={`/deletarPost/${post.id}`} className="text-decorator-none">
                      <Box mx={1}>
                        <Button variant="contained" size='small' color="secondary" className="btnDeletar">
                          deletar
                        </Button>
                      </Box>
                    </Link>
                  </Box>
                </CardActions>
              </Card>
            </Box>
          ))
        }
      </Box>
    </>
  )
}

export default ListaPostagem;