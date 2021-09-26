import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { useStore, useSelector, useDispatch } from 'react-redux';
import store from '../store/store';
import { fetchWorms } from '../features/wormList/wormListSlice';
import {getWorms, worms} from '../features/wormList/wormListSlice';
import { addMultiWormsToList } from '../features/wormList/wormListSlice';
import Worm from './Worm';
const flexWrap = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
}  
export default function WormList(props){
        const dispatch = useDispatch();
        useEffect( () =>{
            dispatch(fetchWorms);
        },[worms]);
        var wormsList = useSelector(worms);
        var listOfWorms = [];
        var wormsListCopy = Array.from(wormsList); 
        if( wormsListCopy.length > 0){
            listOfWorms = wormsListCopy.reverse().map((worm) => 
                <Worm key={worm.id} src={worm.data_url} name={worm.name} author={worm.user_id} date={worm.created_at} />
            )
        }
        return(
            <div style={flexWrap} id="mainWormList">
                { 
                    listOfWorms
                }
            </div>
        )
};