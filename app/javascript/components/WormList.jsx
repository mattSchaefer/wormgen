import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { useStore, useSelector, useDispatch } from 'react-redux';
import store from '../store/store';
import { fetchWorms } from '../features/wormList/wormListSlice';
import {getWorms, worms} from '../features/wormList/wormListSlice';
import { addMultiWormsToList } from '../features/wormList/wormListSlice';
import Worm from './Worm';

require('isomorphic-fetch');
const flexWrap = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
}  

export default function WormList(props){
    
    //constructor(props){
    //    super(props);
        // this.state = {
        //     worm_list: []
        // } 
  //  }
  
    // getListOfWorms(){
    //     const getWormsURL = '/api/v1/worms'
    //     fetch(getWormsURL)
    //         .then((response) => response.json())
    //         .then((json) => {
                
    //             console.log(json);
                
    //             this.setState({worm_list: json.worms});
    //             if (json.status !== 500)
    //                 return json.worms;
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             return [error];
    //         })
    // }
    //render(){
        //const worms = this.state.worm_list || [];
        
        
       //useStore(store);
        
        //useStore(store)
        // const wormmL = dispatch(fetchWorms(dispatch));
        // console.log(wormmL);
        
        //useStore(store);
        //const worms = store.dispatch(fetchWorms);
        //store.dispatch(addMultiWormsToList, worms);
        const dispatch = useDispatch();
            
        useEffect( () =>{
            dispatch(fetchWorms);
        },[worms]);
        var wormsList = useSelector(worms);
        //const wormsList = store.getState().wormList.worms;
        var listOfWorms = [];
        var wormsListCopy = Array.from(wormsList); 
        
        // console.log(store.getState());
        // console.log("wormsList \n");
        // console.log(wormsList);
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
   // }
};