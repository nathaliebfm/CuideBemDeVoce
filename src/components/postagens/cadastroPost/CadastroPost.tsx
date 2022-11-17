import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import './CadastroPost.css';
import { useNavigate, useParams } from 'react-router-dom';
import Tema from '../../../model/Tema';
import Postagem from '../../../model/Postagem';
import { busca, buscaId, post, put } from '../../../service/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import User from '../../../model/User';

function CadastroPost() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([])
    const token = useSelector<TokenState,TokenState["tokens"]>(
        (state) => state.tokens
      )
    /*Informação fixa fica no LocalStorage, informação temporária para mandar para o back, fica no useState */
    const userId = useSelector<TokenState, TokenState["id"]>(
        (state) => state.id
    ) //Busca o id dentro do Redux

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

    const [tema, setTema] = useState<Tema>(
        {
            id: 0,
            descricao: ''
        })
    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: "",
        texto: "",
        data: "",
        tema: null,
        usuario: null //linha adicionada para inserir o usuário dono da postagem
    })

    const [user, setUser] = useState<User>({
        id: +userId,
        nome: "",
        usuario: "",
        senha: "",
        foto:"",
    }) //essa State serve para controlar o usuário autor da postagem, o + antes do userID transforma o id que está como string no Redux, em um número

    useEffect(() => { 
        setPostagem({
            ...postagem,
            tema: tema,
            usuario: user //Adiciona o usuário dentro da postagem para o backend
        })
    }, [tema])

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await busca("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {

        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success("Postagem atualizada com sucesso!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "colored",
                progress: undefined,
              });
        } else {
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success("Postagem cadastrada com sucesso!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "colored",
                progress: undefined,
              });
        }
        back()

    }

    function back() {
        navigate('/posts')
    }

    return (
        <Container maxWidth="sm">
            <form onSubmit={onSubmit}>
                <Typography variant="h4" color="textSecondary" component="h1" align="center" >Nova Postagem:</Typography>
                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="Título" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="Texto" name="texto" variant="outlined" margin="normal" fullWidth multiline minRows={4}/>

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            temas.map((tema) => (
                                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                            )) 
                        }
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type='submit' variant='contained' color='primary' disabled={tema.id === 0}>Finalizar</Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroPost;