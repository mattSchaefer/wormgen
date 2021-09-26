
import React from "react";
import { render } from "react-dom";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from "../components/App";
import { useStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import store from '../store/store';

document.addEventListener("DOMContentLoaded", () => {

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});