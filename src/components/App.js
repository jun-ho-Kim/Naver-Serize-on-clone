import React from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import Rotuer from './Rotuer';
import Movie from "./views/Movie"
// pages for this product
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";



//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
      <div>
          <Rotuer />
      </div>
  );
}

export default App;