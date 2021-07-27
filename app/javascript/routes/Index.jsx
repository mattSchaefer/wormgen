import React from 'react';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Header from "../components/Header";
export default (
    <Router>
        <Header />
        <Switch>
            <Route path="/" exact component={Home} />

        </Switch>
    </Router>
);