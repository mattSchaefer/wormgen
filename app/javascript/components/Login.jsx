import React from 'react';
import store from '../store/store';
import { Button, TextField } from '@material-ui/core';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { tryAgain, loginSignUpClick, loginSignUpHover, noMoreHover, toggleCollapsed, requestStarted, loggedInUser, signUpFailure, signedUpUser } from '../features/auth/authSlice';
import { login, signup, authState } from '../features/auth/authSlice';
import { animateScroll as scroll, scrollSpy, scroller, Events, Element, Link } from 'react-scroll';
import { fetchWorms } from '../features/wormList/wormListSlice';
import UserProfile from './UserProfile';

require('isomorphic-fetch');
const hunnitHeight = {
    height: "100%"
}
const welcomeBackHeader = {
    width: '57%',
    marginBottom: '2rem',
    marginLeft: '2rem',
}
const justFlex = {display: "flex", minHeight: '18rem',}
const flexBet = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '18vh',
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
    width: '11em',
    padding: '5px 12px',
    color: '#eee',
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
const tryAgainButton = {
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
const leftTwo = {
    marginLeft: '2rem',
}
const flexRowJusBet = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '4rem',
    marginBottom: '1rem',
}
const justFlexTopContainer = {
    display: 'flex',
    height: '33vh',
}
const signUpTextContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '-webkit-fill-available',
    borderRadius: '3px',
}
const formContainer = {
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
const formStyle = {
    width: '23em',
}
const fillContainer = {
    width: "100%",
}
const red = {color: 'red',}
const dontDisplay = {
    display: 'none',
}
const loggedInHeaderContainer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
}
const eeeColor = {
    color: '#eee',
}
const headLink = {
    margin: '1rem',
}
const underline = {
    textDecoration: 'underline',
}
const flex = {
    display: 'flex',
}
export default function Login(props){
    const dispatch = useDispatch();
    const state = useSelector(authState);
    function tryAgain1(){
        alert("try gain");
        dispatch(tryAgain)
    }
    function logInSignUpClick1(event, which){
        dispatch(loginSignUpClick(which))
        if(state.sectionCollapsed == true)
            toggleCollapsed1();
        scroll.scrollToTop()
    }
    function logInSignUpHover(event, which){
        //dispatch(logInSignUpHover(which))
    }
    function noMoreHover(){
        //dispatch(noMoreHover())
    }
    function toggleCollapsed1(){
        dispatch(toggleCollapsed())
    }
    function logIn(){
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const payload = {};
        payload.username = username;
        payload.password = password;
        dispatch(login)
        setTimeout(function(){
            dispatch(fetchWorms)
        },3000)
    }
    function signUp(){
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const email =  document.getElementById('email').value
        const password_confirm = document.getElementById('password-confirm').value
        const no_empty_fields = username.length > 0 && password.length > 0 && email.length > 0 && password_confirm.length > 0
        if(password == password_confirm && no_empty_fields){
            const new_user = {
                payload:{
                    username: username,
                    email: email,
                    password: password,
                    password_confirm: password_confirm
                }
            }
            const signedUpQuestion = dispatch(signup)
        }else{
            dispatch(signUpFailure({status: 400, message: 'passwords do not match'}))
        }
    }
    function formSubmit(){
        if(state.displayedSection == 'signup')
            signUp()
        else if(state.displayedSection == 'login')
            logIn()
    }
    function headLinkClick(link){
        var options = {
            smooth: 'easeInOutQuint',
            duration: 336,
            delay: 75,
            offset: -72,
            isDynamic: true
        }
        switch(link){
            case "generate_worms":
                scroller.scrollTo('tryIt', options)
                break;
            case "my_worms":
            case "favorite_worms":
                scroller.scrollTo('wormGallHead', options)
                break;
            case "why_were_here":
                scroller.scrollTo('whyWereHere', options)
                break;
            case "footer": 
                scroller.scrollTo('footer', options)
                break;
            case "note": 
                scroller.scrollTo('aNote', options)
                break;
            default:
                break;
        }
    }
    return(
        <div style={hunnitHeight}>
            {state.sectionCollapsed}
            <div style={flexRowJusBet} id="header-bar">
                {
                    state.current_user == 'anon' &&
                    <div style={logInSignUp}>
                        <div onClick={(e) => logInSignUpClick1(e, 'login')} onMouseEnter={(e) => logInSignUpHover(e, 'login')} onMouseLeave={(e) => noMoreHover()}>
                            <span style={state.displayedSection == 'login' ? strongStyle : state.activeHover == 'login' ? hoverButtonStyle : {}} onClick={(e) => logInSignUpClick1(e, 'login')}> 
                                Log On
                            </span>
                        </div>
                        <span>/</span>
                        <div onClick={(e) => logInSignUpClick1(e, 'signup')} onMouseEnter={(e) => logInSignUpHover(e, 'signup')} onMouseLeave={(e) => noMoreHover()}>
                            <span style={state.displayedSection == 'signup' ? strongStyle : {}} >
                                Sign Up
                            </span>
                        </div>
                    </div>
                }
                {
                    state.current_user == 'anon' &&
                    <div>
                        wormcreate.com
                    </div>    
                }
                {
                    state.requestFinished && state.requestResponse.status == 200  &&
                    <span style={loggedInHeaderContainer}>
                        <div className="scrollToTopHeaderDiv" onClick={() => scroll.scrollToTop()}>
                            <ArrowUpward />
                        </div>
                        <div className="account-info-link" onClick={() => headLinkClick("footer")}>
                            <PersonOutlineSharpIcon />
                            {state.requestResponse.user.username}
                            <TextField id="token" disabled value={state.current_user_token} onChange={() => dispatch(fetchWorms)} style={dontDisplay} />
                            <TextField id="userID" disabled value={state.current_user_id} style={dontDisplay} />
                        </div>
                        <div style={flex} >
                            <Link style={headLink} onClick={() => headLinkClick('generate_worms')} >Generate Worms</Link>
                            <Link style={headLink} onClick={() => headLinkClick('favorite_worms')}>Worm Gallary</Link>
                            <Link style={headLink} onClick={() => headLinkClick('why_were_here')}>Our Mission</Link>
                            <Link style={headLink} onClick={() => headLinkClick('note')}>A Note</Link>
                        </div>
                    </span>
                }
                <div>
                    <Button onClick={(e) => toggleCollapsed1(e)}>
                        {
                            !state.sectionCollapsed && 
                            <MenuSharpIcon style={eeeColor} />
                        }
                        {
                            state.sectionCollapsed &&
                            <CloseSharpIcon style={eeeColor}  />
                        }
                    </Button>
                </div>
            </div>
            {
                !state.sectionCollapsed &&
                <div style={flexBet}>
                    {
                        state.requestResponse && !state.requestResponse.status !== 200 && state.current_user == 'anon' &&
                        <div style={formContainer}>
                            <form autoComplete="off" style={formStyle}>
                                <span style={Object.assign({}, flexColumn, formStyle)}>
                                    <TextField id="username" label="Username" style={fillContainer} error={ state.signupError == 'yes' && document.getElementById('username').value.length == 0} />
                                    {
                                        state.displayedSection == 'signup' &&
                                        <TextField id="email" label="Email" style={fillContainer} error={state.signupError == 'yes' && document.getElementById('email').value.length == 0} />
                                    }
                                    <TextField id="password" label="Password" error={state.signupError == 'yes'} type="password" style={fillContainer} />
                                    {
                                        state.displayedSection == 'signup' &&
                                        <TextField id="password-confirm" label="Password Confirmation" type="password" error={state.signupError == 'yes'} style={fillContainer} />
                                    }
                                    <Button id="form-submit" variant="contained" color="primary" style={submitButton} onClick={()=>formSubmit()}>Submit</Button>
                                    {state.displayedSection == 'login' && <span>forgot your password?  too bad.</span>}
                                </span>
                            </form>
                        </div>
                    }
                    <div style={signUpTextContainer}>
                        { 
                            (!state.requestPending && !state.requestFinished) &&
                            <div>
                            {
                                ( state.displayedSection == 'signup' && !state.requestFinished) && 
                                <div style={flexColCenter}>
                                    <h3>Sign Up</h3>
                                    <p style={centerPg}>Create and publish worms on our platform.  Comment on worms.  Submit your worm to be a featured worm on our platform and on social media!</p>
                                </div>
                            }
                            {
                                (  state.displayedSection == 'login' && !state.requestFinished) && 
                                <div style={flexColCenter}>
                                <h3>Log On</h3>
                                    <p style={centerPg}>Log on with us and get to the good stuff.  Thanks for coming back.</p>
                                </div>
                            }
                            </div>
                        }
                        {
                            state.requestPending &&
                            <div>loading animation..</div>
                        }
                        {
                            state.requestFinished && state.requestResponse.status != 200 &&
                            <div style={red}>
                                error with credentials
                                
                            </div>
                        }
                        {
                            state.requestFinished && state.requestResponse.status == 200 && state.displayedSection == 'signup' &&
                            <div>
                                <h2 style={welcomeBackHeader}>Thanks for signing up, {state.requestResponse.user.username}.</h2>
                            </div>
                        }
                        {
                            state.requestFinished && state.requestResponse.status == 200 &&
                            <div>
                                {state.displayedSection == 'login' &&
                                    <span> 
                                        <h2 style={welcomeBackHeader}>Welcome back, <span style={underline}>{state.requestResponse.user.username}</span>.</h2>
                                        <h3 style={welcomeBackHeader}>  Remember?... The early bird gets the worm...</h3>
                                    </span>
                                }
                               
                            </div>
                        }
                    </div>
                
                </div>
            }
        </div>
    )
}