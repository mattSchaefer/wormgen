import {createSlice} from '@reduxjs/toolkit';
export const reCaptchaSlice = createSlice({
    name: 'reCaptcha',
    initialState: {
        login: {
            logInRecaptchaVerified: 'no',
            logInRecaptchaToken: ''
        },
        signup: {
            signUpRecaptchaVerified: 'no',
            signUpRecaptchaToken: ''
        },
        createWorm: {
            createWormRecaptchaVerified: 'no',
            createWormRecaptchaToken: ''
        },
        password: {
            forgotPasswordRecaptchaVerified: 'no',
            forgotPasswordRecaptchaToken: '',
            resetPasswordRecaptchaVerified: 'no',
            resetPasswordRecaptchaToken: '',
            changePasswordRecaptchaVerified: 'no',
            changePasswordRecaptchaToken: ''
        },
        email: {
            changeEmailRecaptchaVerified: 'no',
            changeEmailRecaptchaToken: '',
            confirmEmailRecaptchaVerified: 'no',
            confirmEmailRecaptchaToken: ''
        },
        misc: {
            activateAccountRecaptchaVerified: 'no',
            contactSubmitRecaptchaVerified: 'no'
        }
    },
    reducers: {
        setLoginRecaptchaVerified: (state, action) => {
            state.login.logInRecaptchaVerified = action.payload
        },
        setSignUpRecaptchaVerified: (state, action) => {
            state.signup.signUpRecaptchaVerified = action.payload
        },
        setCreateWormRecaptchaVerified: (state, action) => {
            state.createWorm.createWormRecaptchaVerified = action.payload
        },
        setForgotPasswordRecaptchaVerified: (state, action) => {
            state.password.forgotPasswordRecaptchaVerified = action.payload
        },
        setResetPasswordRecaptchaVerified: (state, action) => {
            state.password.resetPasswordRecaptchaVerified = action.payload
        },
        setChangePasswordRecaptchaVerified: (state, action) => {
            state.password.changePasswordRecaptchaVerified = action.payload
        },
        setChangeEmailRecaptchaVerified: (state, action) => {
            state.email.changeEmailRecaptchaVerified = action.payload
        },
        setConfirmEmailRecaptchaVerified: (state, action) => {
            state.email.confirmEmailRecaptchaVerified = action.payload
        },
        setActivateAccountRecaptchaVerified: (state, action) => {
            state.misc.activateAccountRecaptchaVerified = action.payload
        },
        setContactSubmitRecaptchaVerified: (state, action) => {
            state.misc.contactSubmitRecaptchaVerified = action.payload
        }
    }
});
export async function verifySignupRecaptcha(dispatch){
    const signup_recaptcha_token = document.getElementById('uniqueRecaptchaSignupToken').value.toString()
    generalCaptchaAsync(signup_recaptcha_token, function(json){
        console.log(json)
        if(json.success)
            dispatch(setSignUpRecaptchaVerified('yes'))
        else
            dispatch(setSignUpRecaptchaVerified('no'))
    })
}
export async function verifyLoginRecaptcha(dispatch){
    const login_recaptcha_token = document.getElementById('uniqueRecaptchaLoginToken').value.toString()
    generalCaptchaAsync(login_recaptcha_token, function(json){
        console.log(json)
        if(json.success)
            dispatch(setLoginRecaptchaVerified('yes'))
        else
            dispatch(setLoginRecaptchaVerified('no'))
    })
}
export async function verifyCreateWormRecaptcha(dispatch){
    const create_worm_recaptcha_token = document.getElementById('uniqueRecaptchaSaveWormToken').value.toString()
    generalCaptchaAsync(create_worm_recaptcha_token, function(json){
        console.log(json)
        if(json.success)
            dispatch(setCreateWormRecaptchaVerified('yes'))
        else
            dispatch(setCreateWormRecaptchaVerified('no'))
    })
}
export async function verifyForgotPasswordRecaptcha(dispatch){
    const forgot_password_recaptcha_token = document.getElementById('uniqueRecaptchaForgotPasswordToken').value.toString()
    generalCaptchaAsync(forgot_password_recaptcha_token, function(json){
        console.log(json)
        if(json.success)
            dispatch(setForgotPasswordRecaptchaVerified('yes'))
        else
            dispatch(setForgotPasswordRecaptchaVerified('no'))
    })
}
export async function verifyResetPasswordRecaptcha(dispatch){
    const reset_password_recaptcha_token = document.getElementById('uniqueRecaptchaResetPasswordToken').value.toString()
    generalCaptchaAsync(reset_password_recaptcha_token, function(json){
        console.log(json)
        if(json.success)
            dispatch(setResetPasswordRecaptchaVerified('yes'))
        else
            dispatch(setResetPasswordRecaptchaVerified('no'))
    })
}
export async function verifyChangePasswordRecaptcha(dispatch){
    const change_password_recaptcha_token = document.getElementById('uniqueRecaptchaChangePasswordToken').value.toString()
    generalCaptchaAsync(change_password_recaptcha_token, function(json){
        console.log(json)
        if(json.success)
            dispatch(setChangePasswordRecaptchaVerified('yes'))
        else
            dispatch(setChangePasswordRecaptchaVerified('no'))
    })
}
export async function verifyChangeEmailRecaptcha(dispatch){
    const change_email_recaptcha_token = document.getElementById('uniqueRecaptchaChangeEmailToken').value.toString()
    generalCaptchaAsync(change_email_recaptcha_token, function(json){
        console.log(json)
        if(json.success)
            dispatch(setChangeEmailRecaptchaVerified('yes'))
        else
            dispatch(setChangeEmailRecaptchaVerified('no'))
    })
}
export async function verifyConfirmEmailRecaptcha(dispatch){
    const confirm_email_recaptcha_token = document.getElementById('uniqueRecaptchaConfirmEmailToken').value.toString()
    generalCaptchaAsync(confirm_email_recaptcha_token, function(json){
        console.log(json)
        if(json.success)
            dispatch(setConfirmEmailRecaptchaVerified('yes'))
        else
            dispatch(setConfirmEmailRecaptchaVerified('no'))
    })
}
export async function verifyActivateAccountRecaptcha(dispatch){
    const activate_account_recaptcha_token = document.getElementById('uniqueRecaptchaActivateAccountToken').value.toString()
    generalCaptchaAsync(activate_account_recaptcha_token, function(json){
        console.log(json)
        if(json.success)
            dispatch(setActivateAccountRecaptchaVerified('yes'))
        else
            dispatch(setActivateAccountRecaptchaVerified('no'))
    })
}
export async function verifyContactSubmitRecaptcha(dispatch){
    const contact_submit_recaptcha_token = document.getElementById('uniqueRecaptchaSubmitContactToken').value.toString()
    generalCaptchaAsync(contact_submit_recaptcha_token, function(json){
        console.log(json)
        if(json.success)
            dispatch(setContactSubmitRecaptchaVerified('yes'))
        else
            dispatch(setContactSubmitRecaptchaVerified('no'))
    })
}
export async function generalCaptchaAsync(rel_token, callback){
    const secret = process.env.REACT_APP_RCAPTCHA_SECRET_KEY.toString()
    const secret_test = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"//public secret supplied by google for anyone to test
    const url = "https://www.google.com/recaptcha/api/siteverify?secret="+secret+"&response="+rel_token
    const body = JSON.stringify({
        secret: secret,
        response: rel_token
    })
    const options = {
        headers: {
            
        },
        method: "POST",
    }
    fetch(url, options)
    .then((response) => response.json())
    .then((json) => {
        callback(json)
    })
}

export default reCaptchaSlice.reducer;
export const reCaptchaState = state => state.reCaptcha;
export const { setLoginRecaptchaVerified, setSignUpRecaptchaVerified, setCreateWormRecaptchaVerified, setForgotPasswordRecaptchaVerified, setResetPasswordRecaptchaVerified, setChangePasswordRecaptchaVerified, setChangeEmailRecaptchaVerified, setConfirmEmailRecaptchaVerified, setActivateAccountRecaptchaVerified, setContactSubmitRecaptchaVerified } = reCaptchaSlice.actions;