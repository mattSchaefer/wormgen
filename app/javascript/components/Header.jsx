import { Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import { Button, Textfield } from '@material-ui/core';
// import './bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/popper.min.js';
// global.jQuery = require('jquery');
// require('bootstrap');
const headerWrap = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    
}
const leftSideContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
}
const hunnitHeight = {
    height: "100%"
}
const eightyHeight = {height: "80%"}
const rowFlexCenter = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
}
const white = {
    color: '#eee',
    fontSize: '7rem !important',
    marginTop: '48vh',
    maxWidth: '100%',
    fontSize: '3rem !important',
}
const borderWhite = {
    border: '2px solid #eee'
}
const flexColStart = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
}
export default () => (
    <div style={headerWrap}>
        <div style={flexColStart}>
            <h1 style={white}>wormcreate.com</h1>
            <div style={hunnitHeight, flexColStart}>
                {/* <Button style={eightyHeight, white, borderWhite} color="primary">
                    <div style={white}>Log In</div>
                    <span style={white}>/</span>
                    <div style={white}>Sign Up</div>
                </Button> */}
            </div>
        </div>
        <div>
           
        </div>
        <div>
            
        </div>
        <div>

        </div>
    </div>
)