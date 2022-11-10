import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
import './ModalPost.css';
import CadastroPost from '../cadastroPost/CadastroPost';
import { Box, Modal } from '@mui/material';

/*No modal criamos essas funções fora do componente, pois quando ele rodar, elas já precisam estar carregadas, não roda só quando abrimos ele */

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

/*Não podemos usar o display flex/grid, pois ele vai por cima da página, senão ia estragar todo o layout */

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

function ModalPostagem() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false); /*Fica como falso, pois ele fica fechado enquanto não clicar para abrir o modal */

  function handleOpen() {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  }

  /*Não precisa de return nessas funções, pois elas só rodam, não dão retorno*/

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box display="flex" justifyContent="flex-end" className="cursor">
        <CloseIcon onClick={handleClose} />

      </Box>

      <CadastroPost />

    </div>
  );

  return (
    <div>
      <Button
        variant="outlined"
        className="btnModal"
        onClick={handleOpen}>Nova Postagem</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
export default ModalPostagem

/*O CadastroPost é todo importado para a modal quando colocamos a sua tag e no body é renderizado todo o conteúdo da const body*/
/*O getModalStyle é responsável por centralizar o modal */