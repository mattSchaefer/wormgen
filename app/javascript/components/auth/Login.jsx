import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
require('isomorphic-fetch');

const hunnitHeight = {
    height: "100%"
}
const flexColumn = {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
}
const logInSignUp = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '9em',
    padding: '5px 12px',
    border: '2px solid black',
    borderRadius: '30px',
    cursor: 'pointer',
}
const submitButton = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: '1em',
    marginBottom: '2em',
}
const strongStyle={
    textDecoration: 'underline',
    textDecorationThickness: 'bold'
}
const flexRowJusBet = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
}
const justFlex = {
    display: 'flex',
}
const signUpTextContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '-webkit-fill-available',
}
const thirdWidth = {
    width: '33%',
}
const centerPg = {
    textAlign: 'center',
    width: '66%',
}
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            action: 'signup',
            requestPending: false,
            requestStarted: false,
            requestFinished: false,
            sectionCollapsed: false,
            requestResponse: {}
        }
    }
    componentDidMount(){

    }
    formSubmit(){
        const url = "/api/v1/users";
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value;

        const options = {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        }
        const signUp = () => {
            this.setState({requestStarted: true, requestPending: true})
            fetch(url, options)
                .then((response) => response.json())
                .then((json)=> {
                    console.log(json)
                    this.setState({
                        requestPending: false,
                        requestFinshed: true,
                        requestResponse: json,
                        requestStarted: false
                    })
                })
                .catch((e)=>console.log(e))
        }
        signUp();
    }
    render(){
        return(
            <div style={hunnitHeight}>
                <div style={flexRowJusBet}>
                    <div style={logInSignUp}>
                        <div>Log In</div>
                        <span>/</span>
                        <div><strong style={strongStyle}> Sign Up</strong></div>
                    </div>
                    <div>
                         <Button>***</Button>
                     </div>
                </div>
                <div style={justFlex}>
                    <div style={thirdWidth}>
                        <form noValidate autoComplete="off" >
                            <span style={flexColumn}>
                                <TextField id="username" label="Username" />
                                <TextField id="email" label="Email" />
                                <TextField id="password" label="Password" password="true" />
                                <TextField id="password-confirm" label="Password Confirmation" password="true" />
                                <Button id="form-submit" variant="contained" color="primary" style={submitButton} onClick={()=>this.formSubmit()}>Submit</Button>
                            </span>
                        </form>
                    </div>
                    <div style={signUpTextContainer}>
                    
                        <h1>Sign Up Today!</h1>
                        <p style={centerPg}>Create and publish worms on our platform.  Comment on worms.  Submit your worm to be a featured worm on our platform and on social media!</p>
                    
                        <h1>Log On</h1>
                        <p style={centerPg}>Log on with us and get to the good stuff you know and love.  Thanks for coming back.</p>
                    
                    </div>
                </div>
               
            </div>
        )
    }
}