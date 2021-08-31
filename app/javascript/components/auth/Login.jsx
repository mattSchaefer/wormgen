import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
require('isomorphic-fetch');

const hunnitHeight = {
    height: "100%"
}
const justFlex = {display: "flex", minHeight: '56vh',}
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
    textDecorationThickness: 'bold',
    fontWeight: 'bold',
    
}
const hoverButtonStyle = {
    textDecoration: 'underline',
    textDecorationThickness: 'bold',
}
const flexRowJusBet = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
}
const justFlexTopContainer = {
    display: 'flex',
    height: '33vh',
}
const signUpTextContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '-webkit-fill-available',
    borderLeft: '1px solid grey',
    borderRadius: '3px',
}
const formContainer = {
    width: '17rem',
    padding: '1rem',
}
const centerPg = {
    textAlign: 'center',
    width: '66%',
   
}
const leftMargin={
    marginLeft: '2rem',
}
const flexColCenter={
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}
const red = {color: 'red',}
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            action: 'signup',
            requestPending: false,
            requestStarted: false,
            requestFinished: false,
            sectionCollapsed: false,
            activeHover: "",
            requestResponse: {},
        }
    }
    componentDidMount(){

    }
    formSubmit(){
        const url = "/api/v1/users";
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
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
                        requestFinished: true,
                        requestResponse: json,
                        requestStarted: false
                    })
                })
                .catch((e)=>console.log(e))
        }
        signUp();
    }
    logInSignUpClick(event, which){
        this.setState({action: which});
        if(this.state.sectionCollapsed == true)
            this.toggleCollapsed();

    }
    logInSignUpHover(event, which){
        this.setState({activeHover: which});
    }
    noMoreHover(){
        this.setState({activeHover: ''});
    }
    toggleCollapsed(){
        this.state.sectionCollapsed == false ? this.setState({sectionCollapsed: true}) : this.setState({sectionCollapsed: false});
        
    }
    render(){
        return(
            <div style={hunnitHeight}>
                <div style={flexRowJusBet}>
                    {
                        !this.state.requestFinished && 
                        <div style={logInSignUp}>
                            <div onClick={(e) => this.logInSignUpClick(e, 'login')} onMouseEnter={(e) => this.logInSignUpHover(e, 'login')} onMouseLeave={(e) => this.noMoreHover()}>
                                <span style={this.state.action == 'login' ? strongStyle : this.state.activeHover == 'login' ? hoverButtonStyle : {}} onClick={(e) => this.logInSignUpClick(e, 'login')}> 
                                    Log In
                                </span>
                            </div>
                            <span>/</span>
                            <div onClick={(e) => this.logInSignUpClick(e, 'signup')} onMouseEnter={(e) => this.logInSignUpHover(e, 'signup')} onMouseLeave={(e) => this.noMoreHover()}>
                                <span style={this.state.action == 'signup' ? strongStyle : this.state.activeHover == 'signup' ? hoverButtonStyle : {}} >
                                    Sign Up
                                </span>
                            </div>
                        </div>
                    }
                    {
                         this.state.requestFinished && this.state.requestResponse.status == 200  &&
                         <div>
                             <PersonOutlineSharpIcon />
                             {this.state.requestResponse.user.username}
                         </div>
                     }
                    <div>
                        
                        <Button onClick={(e) => this.toggleCollapsed(e)}>
                            {
                                this.state.sectionCollapsed && 
                                <MenuSharpIcon />
                            }
                            {
                                !this.state.sectionCollapsed &&
                                <CloseSharpIcon />
                            }
                        </Button>
                    </div>

                    
                </div>
                {
                    !this.state.sectionCollapsed &&
                    <div style={justFlex}>
                        {
                            !this.state.requestFinished && !this.state.requestResponse.status !== 200 &&
                            <div style={formContainer}>
                                <form noValidate autoComplete="off" >
                                    <span style={flexColumn}>
                                        <TextField id="username" label="Username" />
                                        {
                                            this.state.action == 'signup' &&
                                            <TextField id="email" label="Email" />
                                        }
                                        <TextField id="password" label="Password" password="true" />
                                        {
                                            this.state.action == 'signup' &&
                                            <TextField id="password-confirm" label="Password Confirmation" password="true" />
                                        }
                                        <Button id="form-submit" variant="contained" color="primary" style={submitButton} onClick={()=>this.formSubmit()}>Submit</Button>
                                    </span>
                                </form>
                            </div>
                        }
                        <div style={signUpTextContainer}>
                            { 
                                (!this.state.requestPending && !this.state.requestFinished) &&
                                <div>
                                {
                                    ( this.state.action == 'signup' && !this.state.requestFinished) && 
                                    <div style={flexColCenter}>
                                        <h3>Sign Up</h3>
                                        <p style={centerPg}>Create and publish worms on our platform.  Comment on worms.  Submit your worm to be a featured worm on our platform and on social media!</p>
                                    </div>
                                }
                                {
                                    (  this.state.action == 'login' && !this.state.requestFinished) && 
                                    <div style={flexColCenter}>
                                    <h3>Log On</h3>
                                        <p style={centerPg}>Log on with us and get to the good stuff you know and love.  Thanks for coming back.</p>
                                    </div>
                                }
                                </div>
                            }
                            {
                                this.state.requestPending &&
                                <div>loading animation..</div>
                            }
                            {
                                this.state.requestFinished && this.state.requestResponse.status != 200 &&
                                <div style={red}>
                                    error with credentials

                                </div>
                            }
                            {
                                this.state.requestFinished && this.state.requestResponse.status == 200 && 
                                <div>
                                    <h3>Thanks for signing up, {this.state.requestResponse.user.username}.</h3>
                                    <p>Hope you hang for a while and generate many worms.</p>
                                </div>
                            }
                            
                        </div>
                    
                    </div>
                }
            </div>
        )
    }
}