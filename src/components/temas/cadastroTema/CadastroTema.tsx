import React, { useState, useEffect, ChangeEvent } from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import Tema from '../../../model/Tema';
import { buscaId, post, put } from '../../../service/Service';
import "./CadastroTema.css"
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { findByDisplayValue } from '@testing-library/react';
import { Grid } from '@mui/material';


function CadastroTema() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [token, setToken] = useLocalStorage("token");

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ""
    })

    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado")
            navigate("/login")
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedTema(e: ChangeEvent<HTMLInputElement>) {

        setTema({
            ...tema,
            [e.target.name]: e.target.value,
        })

    }

    /*Define o comportamento no momento do envio das novas informações */
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault() /*Previne o comportamento do botão para ele não atualizar a tela */
        console.log("tema " + JSON.stringify(tema))

        /*Se o id não for indefinido, significa que ele existe */
        if (id !== undefined) {
            console.log(tema)
            put(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema atualizado com sucesso');
            /*Se não tiver o id, significa que ele não existe, e portanto já direciona para o cadastro desse tema */
        } else {
            post(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema cadastrado com sucesso');
        }
        back()
        /*Função back redireciona para o componente /temas, mostrando todos os temas existentes */
    }

    function back() {
        navigate('/temas')
    }

    return (
            <Container maxWidth="sm" className="topo">
                <form onSubmit={onSubmit}>
                    <Typography variant="h4" color="textSecondary" component="h1" align="center" >Formulário de Cadastro de Tema:</Typography>
                    <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="Descrição" variant="outlined" name="descricao" margin="normal" fullWidth />
                    <Button type="submit" variant="contained" style={{ backgroundColor: "#449DD1", color: "white" }}>
                        Finalizar
                    </Button>
                </form>
            </Container>
    )
}

export default CadastroTema;