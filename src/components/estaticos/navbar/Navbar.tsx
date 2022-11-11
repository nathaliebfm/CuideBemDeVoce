import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, alpha, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Box } from '@mui/material';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

export default function Navbar() {
  const token = useSelector<TokenState,TokenState["tokens"]>(
    (state) => state.tokens
  )
  let navigate = useNavigate()
  const dispatch = useDispatch()

  function goLogout(): void {
    dispatch(addToken(""))
    toast.info("Usuário deslogado com sucesso!", {
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
  const classes = useStyles();

  var navbarComponent;

  if(token !== ""){
    navbarComponent = <AppBar position="static">
    <Toolbar className="barra">


      <div>
        <Link to="/home" className='text-decorator-none'>
          <Typography className="typo" variant="h6" title="Home">
            Cuide Bem de Você
          </Typography>
        </Link>
      </div>

      <Box className="textos">
        <Link to="/posts" className='text-decorator-none'>
          <Typography variant="h6" className="typo">
            Postagens
          </Typography>
        </Link>
        <Link to="/temas" className='text-decorator-none'>
          <Typography variant="h6" className="typo">
            Temas
          </Typography>
        </Link>
        <Link to="/formularioTema" className='text-decorator-none'>
          <Typography variant="h6" className="typo">
            Cadastrar Tema
          </Typography>
        </Link>
        <Box onClick={goLogout}>
          <Typography variant="h6" className="typo">
            Sair
          </Typography>
        </Box>


        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </Box>

    </Toolbar>
  </AppBar>
  }

  return (
    <>
      {navbarComponent}
    </>
  );
}

function setToken(arg0: string) {
  throw new Error('Function not implemented.');
}
