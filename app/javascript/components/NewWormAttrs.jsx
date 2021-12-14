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
            <TextField id="new-worm-name" label="worm name" placeholder="untitled" style={alignSelfCenter} />
            <span>Worm Creator: {props.user}</span>
            <span>Created around: {new Date(Date.now()).toLocaleDateString()}</span>
        </form>
    )
}