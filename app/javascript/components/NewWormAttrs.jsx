import React from 'react';
import { TextField, Button } from '@material-ui/core';
const flexCol={
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'flex-start',
}
const alignSelfCenter = {
    alignSelf: 'center',
}
export default function NewWormAttrs(props){
    return(
        <form style={flexCol}>
            <TextField id="new-worm-name"  className="revealable" label="worm name" placeholder="untitled" style={alignSelfCenter} />
            <span className="revealable" >Worm Creator: {props.user}</span>
            <span className="revealable" >Created around: {new Date(Date.now()).toLocaleDateString()}</span>
            <span>**only 1 worm per rcaptcha verification. patience is a virtue.</span>
        </form>
    )
}