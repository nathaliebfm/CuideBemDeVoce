import React from 'react';
import Navbar from './components/estaticos/navbar/Navbar';
import Footer from './components/estaticos/footer/Footer';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ListaTema from './components/temas/listaTema/ListaTema';
import ListaPostagem from './components/postagens/listaPostagem/ListaPostagem';



function App() {
  return (
    <>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/cadastrousuario" element={<CadastroUsuario />}/>
            <Route path="/temas" element={<ListaTema />}/>
            <Route path="/posts" element={<ListaPostagem />}/>
          </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;