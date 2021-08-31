import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
require('isomorphic-fetch');
const wormStyle={
    width: '25vw',
    borderRadius: '7px',
}
const flex = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '.5rem',
    paddingRight: '.5rem',
}
export default function Worm(props){
    return (
        <div style={flex}>
            <img src={props.src} style={wormStyle}></img>
            <strong>{props.name}</strong>
        </div>
    );
};