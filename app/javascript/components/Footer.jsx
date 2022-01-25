import React from 'react';
import { TextField, TextArea, Button } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import { animateScroll as scroll, scrollSpy, scroller, Events } from 'react-scroll';
import { current_user, current_user_token, current_user_id } from '../features/auth/authSlice';
import { forgotPassword, forgotPasswordViewActive, resetPasswordToken, resetPasswordViewActive, resetPasswordTokenResponse, forgotPasswordResponse } from '../features/userProfile/userProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
import UserProfile from './UserProfile'
import Contact from './Contact'
import ReCaptchaV2 from 'react-google-recaptcha';
import {verifyForgotPasswordRecaptcha, verifyResetPasswordRecaptcha } from '../features/reCaptcha/reCaptchaSlice';
import {reCaptchaState} from '../features/reCaptcha/reCaptchaSlice';
const footerDiv={
    minHeight: '60vh',
    background: 'black',
    color: "#eee",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1rem',
    marginTop: '8rem',
    
}
const flexBetween = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
}
const center = {
    textAlign: 'center',

}
const socialsIcons = {
    padding: '7px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
}
const socialsIconsOuterDiv = {
    width: '10rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
}
const marginBottomNone = {
    marginBottom: '0',
    fontSize: '.75rem',
}
const forgotResetPasswordDiv={
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
}
const forgotResetPasswordSpan={
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
}
const forgotPassSubmitButton = {
    width: '50%',
    marginTop: '1rem',
}
const totalWidth = {
    width: '100%',
}
const resetPasswordSubmitButton = {
    marginTop: '1rem',
    marginBottom: '1rem',
}
const captchaErrorMessage = {
    display: 'none',
    width: '82%',
}
const marRigh = {
    marginRight: '.5rem',
}
export default function Footer(props){
    const dispatch = useDispatch()
    const user = useSelector(current_user)
    const token = useSelector(current_user_token)
    const userID = useSelector(current_user_id)
    const forgot_password_view = useSelector(forgotPasswordViewActive)
    const reset_password_view = useSelector(resetPasswordViewActive)
    const forgot_password_response = useSelector(forgotPasswordResponse)
    const reset_password_response = useSelector(resetPasswordTokenResponse)
    const user_logged_in = user != 'anon' && token.length > 0
    const re_captcha_state = useSelector(reCaptchaState)
    function forgotPasswordSubmit(){
        document.getElementById('forgotPasswordLoader').style.visibility = 'visible';
        if(document.getElementById('forgotPasswordUiEmail').value && document.getElementById('forgotPasswordUiEmail').value.length > 0){
            if(re_captcha_state.password.forgotPasswordRecaptchaVerified == 'yes'){
                dispatch(forgotPassword)
            }else
                document.getElementById('forgotPasswordRecaptchaErrorMessage').classList.add('recaptcha-error-active')
        }
    }
    function resetPasswordSubmit(){
        document.getElementById('resetPasswordLoader').style.visibility = 'visible';
        if(document.getElementById('resetPasswordUiEmail').value && document.getElementById('resetPasswordUiEmail').value.length > 0 && document.getElementById('resetPasswordUiPassword').value == document.getElementById('resetPasswordUiPasswordConfirm').value && document.getElementById('resetPasswordUiPasswordToken').value){
            if(re_captcha_state.password.resetPasswordRecaptchaVerified == 'yes')
                dispatch(resetPasswordToken)
            else
            document.getElementById('resetPasswordRecaptchaErrorMessage').classList.add('recaptcha-error-active')
        }
    }
    function handleForgotPasswordCaptchaChange(token){
        document.getElementById('uniqueRecaptchaForgotPasswordToken').value = token
        console.log(token)
        setTimeout(function(){
            dispatch(verifyForgotPasswordRecaptcha)
        },1000)
    }
    function handleResetPasswordCaptchaChange(token){
        document.getElementById('uniqueRecaptchaResetPasswordToken').value = token
        console.log(token)
        setTimeout(function(){
            dispatch(verifyResetPasswordRecaptcha)
        },1000)
    }
    return (
        <div style={footerDiv} className="footer-container-1">
            <div style={flexBetween} className="footer-container-2">
                <Contact />
                {
                    user_logged_in && 
                    <UserProfile />
                }
                {
                    forgot_password_view == 'yes' &&
                    <div style={forgotResetPasswordDiv} className="forgotResetPassword">
                        {
                            forgot_password_response.status !== 'ok' &&
                            <span style={forgotResetPasswordSpan}>
                                <h4>Forgot Password</h4>
                                <p>Enter the email address associated with your account below, and we'll help you set a new password.</p>
                                <p>Seems like a good deal, if you ask me.</p>
                                <TextField id="forgotPasswordUiEmail" label="Account Email" />
                                <br />
                                <span id="forgotPasswordRecaptchaErrorMessage" style={captchaErrorMessage}>
                                    please verify the captcha
                                </span>  
                                <ReCaptchaV2 theme="dark" id="forgotPasswordCaptcha" sitekey={process.env.REACT_APP_RCAPTCHA_SITE_KEY} onChange={(token) => {handleForgotPasswordCaptchaChange(token)}} onExpire={(e) => {handleCaptchaExpire()}} />
                                <div id="forgotPasswordLoader" className="loader">
                                    <div className="circle load1 whiteBG" />
                                    <div className="circle load2 whiteBG" />
                                    <div className="circle load3 whiteBG" />
                                </div>
                                <Button className="btn-grad" variant="contained" color="primary" onClick={(e)=>forgotPasswordSubmit()} style={forgotPassSubmitButton} >Help!</Button>
                            </span>
                        }
                        {
                            forgot_password_response.status == "ok" && 
                            <span style={forgotResetPasswordSpan}>
                                <h4>Check your email</h4>
                                <p>We sent you some instructions to help you get back into your account.</p>
                            </span>
                        }
                        
                    </div>
                }
                {
                    reset_password_view == 'yes' &&
                    <div style={forgotResetPasswordDiv} className="forgotResetPassword">
                        {
                            reset_password_response.status !== 'ok' && !user_logged_in &&
                            <span style={forgotResetPasswordSpan}>
                                <h4>Reset Password</h4>
                                <p>Supply the code we sent to you via email, confirm your new password and we'll get you all set.</p>
                                <div style={totalWidth}>
                                    <TextField id="resetPasswordUiEmail" className="revealable" label="Email:" style={totalWidth} />
                                    <TextField id="resetPasswordUiPasswordToken" className="revealable" label="Code we sent you (no spaces):" style={totalWidth} />
                                    <br />
                                    <span style={totalWidth}>
                                        <TextField id="resetPasswordUiPassword" className="revealable" label="Password:" style={totalWidth} />
                                        <TextField id="resetPasswordUiPasswordConfirm" className="revealable" label="Password Confirmation:" style={totalWidth} />
                                    </span>
                                    <span id="resetPasswordRecaptchaErrorMessage" style={captchaErrorMessage}>
                                        please verify the captcha
                                    </span>  
                                    <ReCaptchaV2 theme="dark" id="forgotPasswordCaptcha" sitekey={process.env.REACT_APP_RCAPTCHA_SITE_KEY} onChange={(token) => {handleResetPasswordCaptchaChange(token)}} onExpire={(e) => {handleCaptchaExpire()}} />
                                    <div id="resetPasswordLoader" className="loader">
                                        <div className="circle load1 whiteBG" />
                                        <div className="circle load2 whiteBG" />
                                        <div className="circle load3 whiteBG" />
                                    </div>
                                    <Button className="btn-grad" variant="contained" color="primary" style={resetPasswordSubmitButton} onClick={(e)=>resetPasswordSubmit()}>LET ME IN</Button>
                                </div>
                            </span>
                        }
                        {
                            reset_password_response.status == 'ok' &&
                            <span style={forgotResetPasswordSpan}>
                                <h4>All done!</h4>
                                <p>You can now sign in with your new password.</p>
                            </span>
                        }
                    </div>
                }
                <div>
                    <div style={socialsIconsOuterDiv}>
                        <span style={socialsIcons}>
                            <button className="actually-link revealable btn-grad2 nav-button"><InstagramIcon /></button>
                            <button className="actually-link revealable btn-grad2 nav-button"><LinkedInIcon /></button>
                            <button className="actually-link revealable btn-grad2 nav-button"><TwitterIcon /></button>
                        </span>
                        <span style={marRigh}>
                        <button className="actually-link revealable btn-grad2 nav-button"><FreeBreakfastIcon /></button>
                        </span>
                    </div>
                </div>
            </div>
            <p className="actually-link revealable" style={center} onClick={(e)=>scroll.scrollToTop()}>
                    Back to top
            </p>
            <p style={marginBottomNone}>If you require additional assistance using this application due its accessibility, please contact email@email.com, or fill out the above Contact form with an explanation of the problem and I will address it as soon as possible.  Thank you.</p>
            <input type="hidden" id="uniqueRecaptchaForgotPasswordToken" />
            <input type="hidden" id="uniqueRecaptchaResetPasswordToken" />
        </div>    
    )
}