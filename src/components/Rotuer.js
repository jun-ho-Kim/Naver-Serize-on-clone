import React from "react";
import Header from "./common/Header";
import {Footer} from "./common/footer";
import {HashRouter as Router, 
    Route, 
    Redirect, 
    Switch
} from "react-router-dom";
import Movie from "./views/Movie";
import TV from "./views/TV";
import Detail from "./views/Detail";
import Auth from "../hoc/auth";
import {LoginPage} from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import FavoriteLists from "./views/Section/favoriteLists";
import { Logout } from "./views/Logout";
import { Search } from "./views/Section/Search";

export default () => (
    <Router>
        <>
        <Header />
        <Switch>
            <Route exact path="/" component={Movie} />
            <Route exact path="/search" component={Auth(Search, false)} />
            <Route exact path="/show" component={TV} />
            <Route exact path="/movie/:id" component={Detail} />
            <Route exact path="/show/:id" component={Detail} />
            <Route exact path="/my/library" component={Auth(FavoriteLists, 1)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/create-account" component={Auth(RegisterPage, false)} />
            <Route exact path="/logout" component={Auth(Logout, true)} />
        </Switch>
        <Footer />
        </>
    </Router>
)