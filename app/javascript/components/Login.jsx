import React from 'react';
import store from '../store/store';
import { Button, TextField, Checkbox } from '@material-ui/core';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { tryAgain, loginSignUpClick, loginSignUpHover, noMoreHover, toggleCollapsed, requestStarted, loggedInUser, signUpFailure, signedUpUser } from '../features/auth/authSlice';
import { login, signup, authState, logout } from '../features/auth/authSlice';
import { animateScroll as scroll, scrollSpy, scroller, Events, Element, Link } from 'react-scroll';
import { fetchWorms } from '../features/wormList/wormListSlice';
import { toggleForgotPasswordView, toggleResetPasswordView, activateAccount, accountActivationResponse } from '../features/userProfile/userProfileSlice';
import UserProfile from './UserProfile';
import ReCaptchaV2 from 'react-google-recaptcha';
import {verifySignupRecaptcha, verifyLoginRecaptcha, verifyActivateAccountRecaptcha} from '../features/reCaptcha/reCaptchaSlice';
import {reCaptchaState} from '../features/reCaptcha/reCaptchaSlice';


require('isomorphic-fetch');
const hunnitHeight = {
    height: "100%"
}
const fullWidth = {
    width: '100%',
}
const welcomeBackHeader = {
    width: '57%',
    marginBottom: '2rem',
    marginLeft: '2rem',
    marginTop: '6rem',
}
const justFlex = {display: "flex", minHeight: '18rem',}
const flexBet = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column-reverse',
    minHeight: '100vh',
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
    maxHeight: '3rem',
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
    //backgroundImage: 'linear-gradient(to right, #00d2ff 0%, #3a7bd5  51%, #00d2ff  100%)',
    borderBottom: '3px solid rgb(250, 226, 92)',
    padding: '5px',
    textAlign: 'center',
    transition: '0.5s',
    backgroundSize: '200% auto',
    color: 'white',
    borderRadius: '3px',
    backgroundPosition: 'right center',
    textDecoration: 'none',
    
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
    textAlign: 'start',
    width: '66%',
    alignSelf: 'start',
    display: 'none',
}
const alignStart = {
    alignSelf: 'start',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    transition: '.2s ease',
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
const errorMessage = {
    color: 'red',
}
const flexSpaceAround = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
}
const checkboxLabelContainer = {
    position: 'absolute',
    right: '26vw',
}
const captchaErrorMessage = {
    display: 'none',
    width: '82%',
}
const cursor = {
    cursor: 'pointer !important',
}
export default function Login(props){
    const dispatch = useDispatch();
    const state = useSelector(authState);
    const account_activate_response = useSelector(accountActivationResponse)
    var captcha_state = useSelector(reCaptchaState)
    function tryAgain1(){
        alert("try gain");
        dispatch(tryAgain)
    }
    function logInSignUpClick1(event, which){
        dispatch(loginSignUpClick(which))
       
        var options = {
            smooth: 'easeInOutQuint',
            duration: 336,
            delay: 0,
            offset: -1000,
            isDynamic: true
        }
        scroll.scrollTo('footer', options)
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
        scroll.scrollMore(50)
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
        document.getElementById('loginSignupLoader').style.visibility = 'visible';

        if(state.displayedSection == 'signup'){
            if(captcha_state.signup.signUpRecaptchaVerified == 'yes')
                signUp()
            else
                document.getElementById('loginSignupCaptchaErrorMessage').classList.add('recaptcha-error-active')
        }
        else if(state.displayedSection == 'login'){
            if(captcha_state.login.logInRecaptchaVerified == 'yes')
                logIn()
            else
                document.getElementById('loginSignupCaptchaErrorMessage').classList.add('recaptcha-error-active')
        }
    }
    function headLinkClick(link){
        var options = {
            smooth: 'easeInOutQuint',
            duration: 336,
            delay: 0,
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
    function toggleForgotPass(){
        var options = {
            smooth: 'easeInOutQuint',
            duration: 336,
            delay: 75,
            offset: -72,
            isDynamic: true
        }
        dispatch(toggleForgotPasswordView())
        scroller.scrollTo("footer", options)
    }
    function toggleResetPass(){
        var options = {
            smooth: 'easeInOutQuint',
            duration: 336,
            delay: 75,
            offset: -72,
            isDynamic: true
        }
        dispatch(toggleResetPasswordView())
        scroller.scrollTo("footer", options)
    }
    function activateAccountSubmit(){
        //if(captcha_state.misc.activateAccountRecaptchaVerified == 'yes'){
            dispatch(activateAccount)
            setTimeout(function(){
                dispatch(fetchWorms)
            },3000)
       // }else{
            //document.getElementById('accountActivationCaptchaErrorMessage').classList.add('recaptcha-error-active')
        //}
    }
    function handleLoginSignupCaptchaChange(token, which){
        if(which == 'signup'){
            document.getElementById('uniqueRecaptchaSignupToken').value = token
            console.log(token)
            setTimeout(function(){
                dispatch(verifySignupRecaptcha)
            },300)
        }else{
            document.getElementById('uniqueRecaptchaLoginToken').value = token
            console.log(token)
            setTimeout(function(){
                dispatch(verifyLoginRecaptcha)
            },300)
        }
    }
    function handleActivateAccountCaptchaChange(token){
        document.getElementById('uniqueRecaptchaActivateAccountToken').value = token
        console.log(token)
        setTimeout(function(){
            dispatch(verifyActivateAccountRecaptcha)
        },300)
    }
    function handleCaptchaExpre(){

    }
    function logoutClick(){
        dispatch(logout(dispatch))
    }
    function toggleMobileMenuDisplay(){
        if(document.getElementById('nav').classList.contains('visible')){
            document.getElementById('nav').classList.add('hidden')
            document.getElementById('nav').classList.remove('visible')
            document.getElementById('mobileMenuSharpSpan').classList.add('visible')
            document.getElementById('mobileMenuSharpSpan').classList.remove('hidden')
            document.getElementById('mobileCloseSharpSpan').classList.remove('visible')
            document.getElementById('mobileCloseSharpSpan').classList.add('hidden')
        }else{
            document.getElementById('nav').classList.add('visible')
            document.getElementById('nav').classList.remove('hidden')
            document.getElementById('mobileMenuSharpSpan').classList.remove('visible')
            document.getElementById('mobileMenuSharpSpan').classList.add('hidden')
            document.getElementById('mobileCloseSharpSpan').classList.add('visible')
            document.getElementById('mobileCloseSharpSpan').classList.remove('hidden')
        }
    }
    return(
        <div style={hunnitHeight}>
            {state.sectionCollapsed}
            <div style={flexRowJusBet} id="header-bar">
                {
                    (!state.requestFinished || state.requestResponse.status !== 200) &&
                    <div style={logInSignUp}>
                        <button className="btn-grad2 nav-button" onClick={(e) => logInSignUpClick1(e, 'login')} onMouseEnter={(e) => logInSignUpHover(e, 'login')} onMouseLeave={(e) => noMoreHover()} tabindex="0" role="button">
                            <span style={state.displayedSection == 'login' ? strongStyle : state.activeHover == 'login' ? hoverButtonStyle : {}} onClick={(e) => logInSignUpClick1(e, 'login')}> 
                                Log On
                            </span>
                        </button>
                        <span>/</span>
                        <button className="btn-grad2 nav-button" onClick={(e) => logInSignUpClick1(e, 'signup')} onMouseEnter={(e) => logInSignUpHover(e, 'signup')} onMouseLeave={(e) => noMoreHover()} tabindex="0" role="button">
                            <span style={state.displayedSection == 'signup' ? strongStyle : {}} >
                                Sign Up
                            </span>
                        </button>
                    </div>
                }
                {
                    state.current_user == 'anon' &&
                    <div>
                        
                    </div>    
                }
                {
                    state.requestFinished && state.requestResponse.status == 200  &&
                    <span style={loggedInHeaderContainer} className="mobile-flex-col-full-width">
                        <button className="account-info-link btn-grad2 nav-button" onClick={(e) => headLinkClick("footer")} tabindex="0" role="button">
                            <PersonOutlineSharpIcon />
                            {state.requestResponse.user.username}
                            <TextField id="token" disabled value={state.current_user_token} onChange={() => dispatch(fetchWorms)} style={dontDisplay} />
                            <TextField id="userID" disabled value={state.current_user_id} style={dontDisplay} />
                        </button>
                        <div style={flex} className="mobile-flex-col-full-width nav-links" id="nav">
                            <button className="btn-grad2 nav-button" style={headLink} onClick={() => headLinkClick('generate_worms')}  tabindex="0" role="button">Generate Worms</button>
                            <button className="btn-grad2 nav-button" style={headLink} onClick={() => headLinkClick('favorite_worms')} tabindex="0" role="button">The Collection</button>
                            <button className="btn-grad2 nav-button" style={headLink} onClick={() => headLinkClick('why_were_here')} tabindex="0" role="button">What We Want</button>
                            <button className="btn-grad2 nav-button" style={headLink} onClick={() => headLinkClick('note')} tabindex="0" role="button">A Note</button>
                        </div>
                        <button className="btn-grad2 logout-button nav-button" style={cursor} onClick={(e) => logoutClick()} tabindex="0" role="button">
                            <span>Logout</span>
                            <MeetingRoomIcon />
                        </button>
                        <div className="mobileMenuToggle" onClick={ (e) => toggleMobileMenuDisplay()}>
                                <span id="mobileMenuSharpSpan" className="visible">
                                    <MenuSharpIcon />
                                </span>
                                <span id="mobileCloseSharpSpan" className="hidden">
                                    <CloseSharpIcon />
                                </span>
                        </div>
                    </span>
                }
                <div>
                    <button className="scrollToTopHeaderDiv btn-grad2 nav-button" onClick={() => scroll.scrollToTop()}>
                            <ArrowUpward />
                    </button>
                    {/* <Button onClick={(e) => toggleCollapsed1(e)}>
                        {
                            !state.sectionCollapsed && 
                            <MenuSharpIcon style={eeeColor} />
                        }
                        {
                            state.sectionCollapsed &&
                            <CloseSharpIcon style={eeeColor}  />
                        }
                    </Button> */}

                </div>
            </div>
            {
                !state.sectionCollapsed &&
                <div style={flexBet}>
                   {    (!state.requestFinished || state.requestResponse.status !== 200) &&
                        <div style={formContainer}>
                            {state.signupError == 'yes' || state.loginError == 'yes' &&
                                <div>
                                    <h6 style={errorMessage} >There was an issue with those credentials.</h6>
                                    <h6 style={errorMessage}>Please try again.</h6>
                                </div>
                            }
                            <form autoComplete="off" style={formStyle}>
                                <Element name="logIn" id="logIn"></Element>
                                <span style={Object.assign({}, flexColumn, formStyle)}>
                                    <TextField id="username" label="Username"  className="revealable" style={fillContainer} error={ state.signupError == 'yes' || state.loginError == 'yes'} />
                                    {
                                        state.displayedSection == 'signup' &&
                                        <TextField id="email" label="Email"  className="revealable" style={fillContainer} error={state.signupError == 'yes'} />
                                    }
                                    <span style={fullWidth}>
                                        <TextField id="password" label="Password"  className="revealable" error={state.signupError == 'yes' || state.loginError == 'yes'} type={document.getElementById('loginSignupShowPass') && document.getElementById('loginSignupShowPass').checked ? '' : 'password'} style={fillContainer} />
                                        <span style={checkboxLabelContainer} className="revealable">
                                            <Checkbox id="loginSignupShowPass" label="Show password" color="primary" /> 
                                            <span>show password{ state.displayedSection == 'signup' && <span>s</span>}</span>
                                        </span>
                                    </span>
                                    {
                                        state.displayedSection == 'signup' &&
                                        <span style={fullWidth}>
                                            <TextField id="password-confirm" className="revealable" label="Password Confirmation" type="password" error={state.signupError == 'yes'} style={fillContainer} type={document.getElementById('loginSignupShowPass') && document.getElementById('loginSignupShowPass').checked ? 'text' : 'password'} style={fillContainer} />
                                        </span>
                                    }
                                    <span id="loginSignupCaptchaErrorMessage" style={captchaErrorMessage}>
                                        please verify the captcha
                                    </span>
                                    <ReCaptchaV2 theme="dark" id="loginSignupCaptcha" className="revealable" sitekey={process.env.REACT_APP_RCAPTCHA_SITE_KEY} onChange={(token) => {handleLoginSignupCaptchaChange(token, state.displayedSection)}} onExpire={(e) => {handleCaptchaExpire()}} />
                                    <input type="hidden" id="uniqueRecaptchaSignupToken" />
                                    <input type="hidden" id="uniqueRecaptchaLoginToken" />
                                    
                                    <div id="loginSignupLoader" className="loader">
                                            <div className="circle load1 whiteBG" />
                                            <div className="circle load2 whiteBG" />
                                            <div className="circle load3 whiteBG" />
                                    </div>  
                                    
                                    <Button className="btn-grad revealable"  className="revealable" id="form-submit" variant="contained" color="primary" className="btn-grad" style={submitButton} onClick={(e)=>formSubmit()}>Submit</Button>
                                    { (!state.requestFinished || state.requestResponse.status !== 200) && 
                                        <span style={flexSpaceAround} className="revealable">
                                            <span class="actually-link btn-grad2" onClick={(e) => toggleForgotPass()}>forgot password</span>
                                            <span class="actually-link btn-grad2" onClick={(e)=> toggleResetPass()}>reset password</span>
                                        </span>
                                    }
                                </span>
                            </form>
                        </div>
                    }
                    <div style={signUpTextContainer}>
                        { 
                            ((!state.requestPending && !state.requestFinished) || state.requestResponse.status !== 200)  &&
                            <div>
                            {
                                ( state.displayedSection == 'signup' && (!state.requestFinished || state.requestResponse.status !== 200)) && 
                                <div style={flexColCenter}>
                                    <h3>Sign Up</h3>
                                    <p style={centerPg}>Create and publish worms on our platform.  Comment on worms.  Submit your worm to be a featured worm on our platform and on social media!</p>
                                </div>
                            }
                            {
                                (  state.displayedSection == 'login' && (!state.requestFinished || state.requestResponse.status !== 200)) && 
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
                            state.requestFinished && state.requestResponse.status == 200 && state.displayedSection == 'signup' && account_activate_response.status !== 200 &&
                            <div>
                                <h2 style={welcomeBackHeader}>Thanks for signing up, {state.requestResponse.user.username}.</h2>
                                <p>One last thing...</p>
                                <p>We need you to activate your account before you can create worms.  To do this, please check your email, enter the code below, and click 'activate' to activate your account</p>
                                <TextField id="activationCode" label="Activation Code (no spaces):" error={account_activate_response.status == 401 || account_activate_response.status == 500} />
                                <span id="accountActivationCaptchaErrorMessage" style={captchaErrorMessage}>
                                    please verify the captcha
                                </span>
                                <ReCaptchaV2 theme="dark" id="loginSignupCaptcha" sitekey={process.env.REACT_APP_RCAPTCHA_SITE_KEY} onChange={(token) => {handleActivateAccountCaptchaChange(token)}} onExpire={(e) => {handleCaptchaExpire()}} />
                                <Button className="btn-grad revealable" variant="contained" color="primary" style={submitButton} onClick={(e) => activateAccountSubmit()} >Activate</Button>
                                <input type="hidden" id="uniqueRecaptchaActivateAccountToken" />
                                
                            </div>
                        }
                        {
                            state.requestFinished && state.requestResponse.status == 200 && state.displayedSection == 'signup' && account_activate_response.status == 200 &&
                            <div>
                                <h2>Boom!</h2>
                                <p>You're all set.  Scroll down to generate some worms and view the Worm Gallary.</p>
                            </div>
                        }
                        {
                            state.requestFinished && state.requestResponse.status == 200 &&
                            <div style={flexColCenter} className="welcomeBackHeadContainer">
                                {state.displayedSection == 'login' && state.requestResponse.user.activated &&
                                    <span style={flexColCenter} className="welcomeBackHeadContainer"> 
                                        <h2 className="revealable welcomeHeader" style={welcomeBackHeader}>Welcome back, <span className="revealable">{state.requestResponse.user.username}</span>.</h2>
                                        <h3 className="revealable" style={welcomeBackHeader}>  Never forget that the early bird gets the worm...</h3>
                                    </span>
                                }
                                {state.displayedSection == 'login' && !state.requestResponse.user.activated && account_activate_response.status !== 200 &&
                                    <div>
                                        <p>One last thing...</p>
                                        <p>We need you to activate your account before you can create worms.  To do this, please check your email, enter the code below, and click 'activate' to activate your account</p>
                                        <TextField id="activationCode" label="Activation Code (no spaces):" error={account_activate_response.status == 401 || account_activate_response.status == 500} />
                                        <Button className="btn-grad" variant="contained" color="primary" style={submitButton} onClick={(e) => activateAccountSubmit()} >Activate</Button>
                                    </div>
                                }
                                {
                                    state.requestFinished && state.requestResponse.status == 200 && state.displayedSection == 'login' && account_activate_response.status == 200 &&
                                    <div>
                                        <h2>Boom!</h2>
                                        <p>You're all set.  Scroll down to generate some worms and view the Worm Gallary.</p>
                                    </div>
                                }
                               
                            </div>
                        }
                    </div>
                
                </div>
            }
        </div>
    )
}