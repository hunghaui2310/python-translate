import React from 'react';
import './App.css';
import Header from "./components/Header";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import style from './assets/style';
import Container from "./components/Container";

const App = () => {

  return (
    <div>
      {/*<Loader/>*/}
      <Header/>
      <Container/>
      <hr/>
      <Footer/>
    </div>
  )
}

export default App;
