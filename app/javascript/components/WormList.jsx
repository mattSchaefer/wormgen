import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import Worm from './Worm';
require('isomorphic-fetch');
const flexWrap = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
}
export default class WormList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            worm_list: []
        }
    }
    componentDidMount(){
        this.getListOfWorms();  
    }
    getListOfWorms(){
        const getWormsURL = '/api/v1/worms'
        fetch(getWormsURL)
            .then((response) => response.json())
            .then((json) => {
                
                console.log(json);
                this.setState({worm_list: json.worms});
                return json.worms;
            })
            .catch((error) => {
                console.log(error);
                return [error];
            })
    }
    render(){
        const worms = this.state.worm_list;
        const listOfWorms = worms.reverse().map((worm) => 
             
                <Worm key={worm.id} src={worm.data_url} name={worm.name} author={worm.user_id} date={worm.created_at} />
            
        )
        return(
            <div style={flexWrap} id="mainWormList">
                { 
                    listOfWorms
                }
            </div>
        )
    }
};