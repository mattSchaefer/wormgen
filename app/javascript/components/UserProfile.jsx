import React, { useEffect } from 'react';
import store from '../store/store';
import { Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector, useStore } from 'react-redux';
import  {current_user, current_user_token, current_user_id} from '../features/auth/authSlice';
import { login, signup, authState, updateUser, toggleUserProfileUiEditEmail, toggleUserProfileUiChangePassword } from '../features/auth/authSlice';
import { forgotPassword, resetPasswordOldPass, resetPasswordToken, resetEmail, confirmUnconfirmedEmailWithToken } from '../features/userProfile/userProfileSlice';
import { resetPasswordOldPassResponse, forgotPasswordResponse, forgotPasswordViewActive, resetPasswordViewActive, resetEmailViewActive, resetEmailResponse, toggleResetPasswordView, toggleResetEmailView, confirmUnconfirmedEmailResponse } from '../features/userProfile/userProfileSlice';
import { worms } from '../features/wormList/wormListSlice';
import ReCaptchaV2 from 'react-google-recaptcha';
import {verifyChangePasswordRecaptcha, verifyChangeEmailRecaptcha, verifyConfirmEmailRecaptcha } from '../features/reCaptcha/reCaptchaSlice';
import {reCaptchaState} from '../features/reCaptcha/reCaptchaSlice';
require('isomorphic-fetch');

const flexCol={
    display: 'flex',
    flexDirection: 'column',
    width: '24rem',
    alignItems: 'start',
}
const whiteButtonSmallText = {
    color: '#eee',
    fontSize: '.75rem',
    minWidth: '10rem',
    height: '1.5rem',
}
const currentEmailSpan = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '24rem',
    marginRight: '-4rem',
    marginTop: '2rem',
}
const userProfileTextField = {
    width: '24rem',
    marginTop: '2rem',
}
const userProfileTextFieldEmail = {
    width: '24rem',
    marginRight: '-4rem',
}
const changePasswordButtonContainer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '2rem',
}
const yourWormsFavContain = {
    marginTop: '2rem',
}
const allGoodHead = {
    textAlign: 'center',
    marginTop: '3rem',
}
const allGoodPara = {
    textAlign: 'center',
}
const numTimes = {
    fontWeight: 'bold',
    textDecoration: 'underline',
}
const changeEmailAddressButton = {
    fontSize: '.75rem !important',
    height: '1.5rem !important',
    width: '10rem !important',
}
const profileForm = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
}
const oneHundW = {
    width: '100%',
}
const changeEmailSubButton = {
    marginTop: '1rem',
}
const wootHead = {
    marginTop: '1rem',
}
const wootPara = {
    marginBottom: '12rem',
}
const confirmSubmitButton = {
    marginTop: '1rem',
    marginBottom: '2rem',
}
const sentYouSomething = {
    marginTop: '2rem',
}
export default function UserProfile(props){
    var dispatch = useDispatch()
    var passwords_dont_match = false
    const selectedAuthState = useSelector(authState)
    const current_user1 = useSelector(current_user)
    var current_userId1 = useSelector(current_user_id)
    const current_user_token1 = useSelector(current_user_token)
    const current_email = selectedAuthState.requestResponse.user.email
    const reset_status = useSelector(resetPasswordOldPassResponse)
    const reset_email_status = useSelector(resetEmailResponse)
    const confirm_unconfirmed_email_status = useSelector(confirmUnconfirmedEmailResponse)
    const list_of_worms = useSelector(worms)
    const worm_list_copy = Array.from(list_of_worms)
    const reset_email_view = useSelector(resetEmailViewActive)
    const reset_password_view = useSelector(resetPasswordViewActive)
    const re_captcha_state = useSelector(reCaptchaState)
    useEffect(()=>{
        //get total count of favorites among the user's worms
        setTimeout(function(){
            var filtered_arr = list_of_worms.filter((w) =>{
                return w.user_id.toString() == current_userId1.toString()
            })
            var initialValue = 0;
            var list = [];
            for(var i = 0; i < filtered_arr.length; i++){
                if(filtered_arr[i].favorited_by)
                    list.push(filtered_arr[i].favorited_by.toString().split(',').filter((x)=>{return x.length > 0}).length)
                
            }console.log(list);
            var num_favs = list.reduce((previousValue, currentValue) => {
                return previousValue + currentValue;
            })
            document.getElementById('numTimes').innerText = num_favs.toString();
        },6000)
    },[current_userId1, list_of_worms])
    function editEmailToggle(){
        dispatch(toggleResetEmailView())
    }
    function changePasswordToggle(){
        dispatch(toggleResetPasswordView())
    }
    function editEmailSubmit(){
        if(re_captcha_state.email.changeEmailRecaptchaVerified == 'yes')
            dispatch(resetEmail(dispatch))
        else
            alert('please verify the captcha')
    }
    function changePasswordSubmit(){
        var old_pass = document.getElementById('userProfileUiOldPassword').value
        var old_pass_confirm = document.getElementById('userProfileUiOldPasswordConfirm').value
        var new_pass = document.getElementById('userProfileUiPassword').value
        var new_pass_confirm = document.getElementById('userProfileUiPasswordConfirm').value
        if(old_pass == old_pass_confirm && new_pass == new_pass_confirm){
            if(re_captcha_state.password.changePasswordRecaptchaVerified == 'yes')
                dispatch(resetPasswordOldPass(dispatch))
            else
                alert('please verify the captcha')
        }else{
            passwords_dont_match = true
        }
    }
    function confirmEmailSubmit(){
        if(re_captcha_state.email.confirmEmailRecaptchaVerified == 'yes')
            dispatch(confirmUnconfirmedEmailWithToken(dispatch))
        else
            alert('please verify the captcha')
    }
    function handleChangePasswordCaptchaChange(token){
        document.getElementById('uniqueRecaptchaChangePasswordToken').value = token
        console.log(token)
        setTimeout(function(){
            dispatch(verifyChangePasswordRecaptcha)
        },1000)
    }
    function handleChangeEmailCaptchaChange(token){  
        document.getElementById('uniqueRecaptchaChangeEmailToken').value = token
        console.log(token)
        setTimeout(function(){
            dispatch(verifyChangeEmailRecaptcha)
        },1000)
    }
    function handleEmailConfirmCaptchaChange(token){
        document.getElementById('uniqueRecaptchaConfirmEmailToken').value = token
        console.log(token)
        setTimeout(function(){
            dispatch(verifyConfirmEmailRecaptcha)
        },1000)
    }
    return (
        <div>
            <span style={flexCol}>
                <h5>User Profile</h5>
                <div style={yourWormsFavContain}><p>Your worms have been favorited <span id="numTimes" style={numTimes} ></span> times!</p></div>
                <TextField id="userProfileUsernameField" label="Username" value={current_user1} style={userProfileTextField} disabled />
                <span style={currentEmailSpan}>
                    <TextField id="userProfileCurrEmailField" label="Current Email" value={current_email} style={userProfileTextFieldEmail}  disabled />
                    {
                        reset_email_view == 'no' && reset_password_view == 'no' &&
                        <Button className="btn-grad" style={whiteButtonSmallText} variant="contained" color="primary" onClick={(e) => editEmailToggle()}  >change email</Button>
                    }
                </span>
                {
                    (reset_email_view == 'yes' || reset_password_view == 'yes') && 
                    <span>
                        {
                            reset_status.status !== 200 && reset_email_status.status !== 200 &&
                            <span style={profileForm} >
                                { 
                                    reset_email_view == 'yes' && 
                                    <span style={flexCol}>
                                        <TextField id="userProfileUiNewEmail" label="New Email" style={oneHundW} error={reset_email_status.status == 401} />
                                        <TextField id="userProfileUiNewEmailConfirm" label="New Email Confirm" style={oneHundW} error={reset_email_status.status == 401} /> 
                                    </span>
                                }
                                {
                                    reset_password_view == 'yes' &&
                                    <span style={flexCol}>
                                        <TextField id="userProfileUiOldPassword" label="OldPassword" style={oneHundW} error={reset_status.status == 401 || reset_status.status == 500} />
                                        <TextField id="userProfileUiOldPasswordConfirm" label="Old Password Confirm" style={oneHundW} error={reset_status.status == 401 || reset_status.status == 500} />
                                    </span>
                                }
                                <TextField id="userProfileUiPassword" label="Password" style={oneHundW} />
                                {
                                    reset_password_view == 'yes' &&
                                    <span style={flexCol}>
                                        <TextField id="userProfileUiPasswordConfirm" label="Password Confirm"  style={oneHundW} error={reset_status.status == 401 || reset_status.status == 500} />
                                        <ReCaptchaV2 theme="dark" id="changePasswordCaptcha" sitekey={process.env.REACT_APP_RCAPTCHA_SITE_KEY} onChange={(token) => {handleChangePasswordCaptchaChange(token)}} onExpire={(e) => {handleCaptchaExpire()}} />

                                        <Button className="btn-grad" id="userProfileUiChangePasswordSubmit" variant="contained" color="primary" onClick={(e) => changePasswordSubmit()}>Change Password</Button>
                                    </span>
                                }
                                {reset_email_view == 'yes' && 
                                    <div>
                                        <ReCaptchaV2 theme="dark" id="changePasswordCaptcha" sitekey={process.env.REACT_APP_RCAPTCHA_SITE_KEY} onChange={(token) => {handleChangeEmailCaptchaChange(token)}} onExpire={(e) => {handleCaptchaExpire()}} />
                                        <Button className="btn-grad" id="userProfileUiChangeEmailSubmit" variant="contained" color="primary" onClick={(e) => editEmailSubmit()} style={changeEmailSubButton} >Change Email Address</Button>
                                    </div>
                                }
                                
                            </span>
                        }
                        {
                            reset_email_status.status == 200 && confirm_unconfirmed_email_status.status !== 200 &&
                            <span style={flexCol}>
                                <h4 style={sentYouSomething}>We sent you something to {reset_email_status.email}</h4>
                                <p>Check your email and report back with the code, so that we can get you swapped out.</p>
                                <TextField id="userProfileUnconfirmedEmailField" label="Unconfirmed Email" value={reset_email_status.email} style={userProfileTextFieldEmail} disabled />
                                <TextField id="confirmEmailCode" label="Code we sent you (no spaces):" style={oneHundW} error={confirm_unconfirmed_email_status.status == 401} />
                                <ReCaptchaV2 theme="dark" id="confirmEmailCaptcha" sitekey={process.env.REACT_APP_RCAPTCHA_SITE_KEY} onChange={(token) => {handleEmailConfirmCaptchaChange(token)}} onExpire={(e) => {handleCaptchaExpire()}} />
                                <Button className="btn-grad" id="confirmEmailSubmit" variant="contained" color="primary" onClick={(e) => confirmEmailSubmit()} style={confirmSubmitButton}>Submit</Button>
                            </span>
                        }
                        {
                            confirm_unconfirmed_email_status.status == 200 &&
                            <span style={flexCol}>
                                <h5 style={wootHead}>w00t!</h5>
                                <p style={wootPara}>The email associated with your account has been swapped.</p>
                            </span>
                        }
                        {
                            reset_status.status == 200 &&
                            <span>
                                <h3 style={allGoodHead}>You're all good!</h3>
                                <h3 style={allGoodPara}>Use your new password the next time you log in.</h3>
                            </span>
                        }
                    </span>
                }
                {
                    reset_password_view == 'no' && reset_email_view == 'no' &&
                    <div style={changePasswordButtonContainer}><Button className="btn-grad" style={whiteButtonSmallText} variant="contained" color="primary" onClick={() => changePasswordToggle()} >change password</Button></div>
                }
                
            </span>
            <input type="hidden" id="uniqueRecaptchaChangePasswordToken" />
            <input type="hidden" id="uniqueRecaptchaConfirmEmailToken" />
            <input type="hidden" id="uniqueRecaptchaChangeEmailToken" />
        </div>
    )
}