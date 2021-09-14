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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingBottom: '1rem',
    marginBottom: '2rem',
    paddingTop: '1rem',
    borderRadius: '7px',
    background: 'rgb(35,45,61)',
    marginRight: '1rem',
    boxShadow: "11px 38px 226px 65px rgba(35,45,61,0.65)",
    WebkitBoxShadow: "11px 38px 226px 65px rgba(35,45,61,0.65)",
    MozBoxShadow: "11px 38px 226px 65px rgba(35,45,61,0.65)",
}
const wormInfoContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: '#eee',
    width: '100%',
    padding: '5px',
}
const wormTitle={
    width: '100%',
    fontStyle: 'italic',
    textAlign: 'center',

}
const wormContainer = {
    minHeight: "0",
}
const nonTitleWormAttrs = {
    paddingLeft: '5px',
    display: 'flex',
    flexDirection: 'column',
}
const wormAttr = {
    marginBottom: '0',
    lineHeight: '1.1',
}
const italics={fontStyle: 'italic',}
export default function Worm(props){
    return (
        <div style={ props.src ? flex : {}}>
            { props.src && 
            <span style={wormContainer}>
                <img src={props.src} style={wormStyle} download></img>
                
                <div style={wormInfoContainer}>
                    <p style={Object.assign({},wormTitle, wormAttr)}>{props.name}</p>
                    <span style={nonTitleWormAttrs}>
                        <span>
                            <p style={wormAttr}>
                                {props.author == 33 ? 'artist unknown.' : props.author}
                            </p>
                            
                        </span>
                        <p style={wormAttr}>
                            <span style={italics}>
                                c.a. {props.date.substring(0, props.date.indexOf('T'))} a.d.
                            </span>
                        </p>
                        <a href={props.src} download={props.name}>Export Worm</a>
                    </span>
                </div>
            </span>
            }
        </div>
    );
};