import { createSlice, combineReducers } from '@reduxjs/toolkit';
export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {
        forgotPasswordResponse: {status: ''},
        resetPasswordOldPassResponse: {status: ''},
        resetPasswordTokenResponse: {status: ''},
        resetEmailResponse: {status: ''},
        confirmUnconfirmedEmailResponse: {status: ''},
        accountActivationResponse: {status: ''},
        password_confirm: {},
        forgotPasswordViewActive: 'no',
        resetPasswordViewActive: 'no',
        resetEmailViewActive: 'no',
        profile_user_is_activated: 'no'
    },
    reducers: {
        changeAttribute: (state, action) =>{
            const attr = action.payload.which
            const new_value = action.payload.which_value
        },
        activateAccountDone: (state, action) => {
            state.accountActivationResponse = action.payload
            if (action.payload.status == 200)
                state.profile_user_is_activated = 'yes'
        },
        forgotPasswordDone: (state, action) => {
            state.forgotPasswordResponse = action.payload
        },
        resetPasswordOldPassDone: (state, action) => {
            state.resetPasswordOldPassResponse = action.payload
        },
        resetPasswordTokenDone: (state, action) => {
            state.resetPasswordTokenResponse = action.payload
        },
        resetEmailDone:(state, action)=>{
            state.resetEmailResponse = action.payload
        },
        confirmUnconfirmedEmailDone: (state, action) => {
            state.confirmUnconfirmedEmailResponse = action.payload
        },
        toggleResetEmailView: (state) => {
            state.resetEmailViewActive == 'yes' ? state.resetEmailViewActive = "no" : state.resetEmailViewActive = "yes"
        },
        toggleForgotPasswordView: (state) => {
            state.forgotPasswordViewActive == 'yes' ? state.forgotPasswordViewActive = "no" : state.forgotPasswordViewActive = "yes"
        },
        toggleResetPasswordView: (state) => {
            state.resetPasswordViewActive == 'yes' ? state.resetPasswordViewActive = "no" : state.resetPasswordViewActive = "yes"
        }
    },
})
export async function activateAccount(dispatch){
    const activate_url = "/api/v1/users/activate_account"
    const csrf = document.querySelector('meta[name="csrf-token"]').content
    const activate_token = document.getElementById('activationCode').value || ''
    const bearer = document.getElementById('token').value
    const bearer_token = "Bearer " + bearer
    //const rcaptcha_token = document.getElementById('uniqueRecaptchaActivateAccountToken').value
    const body = JSON.stringify({
        token: activate_token
    })
    const options = {
        method: 'POST',
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': bearer_token,
            'X-CSRF-Token': csrf
        }
    }
    fetch(activate_url, options)
    .then((response) => response.json())
    .then((json) => {
        //console.log(json)
        document.getElementById('token').value = json.new_token.token
        dispatch(activateAccountDone(json))
    })
    .catch((e) => {
        //console.log(e)
        var string_e = JSON.stringify({e: e})
        dispatch(activateAccountDone(string_e))
    })
};
export async function forgotPassword(dispatch){
    const forgot_url = '/password/forgot'
    const csrf =  document.querySelector('meta[name="csrf-token"]').content
    const email = document.getElementById('forgotPasswordUiEmail').value
    const rcaptcha_token = document.getElementById('uniqueRecaptchaForgotPasswordToken').value.toString()
    const body = JSON.stringify({
        email: email
    })
    const options = {
        method: "POST",
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrf,
            'Captcha-Token': rcaptcha_token
        }
    }
    fetch(forgot_url, options)
    .then((response) => response.json())
    .then((json) => {
        //console.log(json)
        document.getElementById('forgotPasswordLoader').style.visibility = 'hidden';
        dispatch(forgotPasswordDone(json))
    })
    .catch((e) => {
        //console.log(e)
        dispatch(forgotPasswordDone(e))
    })
};
export async function resetPasswordOldPass(dispatch){
    const token = document.getElementById('token').value
    const user_id = document.getElementById('userID').value
    const email = document.getElementById('userProfileCurrEmailField').value
    const old_password = document.getElementById('userProfileUiOldPassword').value
    const old_password_confirm = document.getElementById('userProfileUiOldPasswordConfirm').value
    const new_password = document.getElementById('userProfileUiPassword').value
    const new_password_confirm = document.getElementById('userProfileUiPasswordConfirm').value
    const csrf =  document.querySelector('meta[name="csrf-token"]').content
    const rcaptcha_token = document.getElementById('uniqueRecaptchaChangePasswordToken').value.toString()
    const reset_url = '/password/reset-with-old'
    const bearer = "Bearer " + token
    const body = JSON.stringify({
        email: email,
        old_password: old_password,
        new_password: new_password
    })
    const options = {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrf,
            'Captcha-Token': rcaptcha_token
        },
        body: body
    }
    fetch(reset_url, options)
    .then((response) => response.json())
    .then((json) => {
        //console.log(json)
        document.getElementById('token').value = json.new_token.token
        document.getElementById('changePasswordLoader').style.visibility = 'hidden';
        dispatch(resetPasswordOldPassDone(json))
    })
    .catch((e) => {
        //console.log(e)
        dispatch(resetPasswordOldPassDone(e))
    })
};
export async function resetPasswordToken(dispatch){
    const password_token = document.getElementById('resetPasswordUiPasswordToken').value
    const email = document.getElementById('resetPasswordUiEmail').value
    const new_pass = document.getElementById('resetPasswordUiPassword').value
    const reset_url = "/password/reset-with-token"
    const csrf = document.querySelector('meta[name="csrf-token"]').content
    const rcaptcha_token = document.getElementById('uniqueRecaptchaResetPasswordToken').value
    const body = JSON.stringify({
        email: email,
        token: password_token,
        new_password: new_pass
    })
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrf,
            'Captcha-Token': rcaptcha_token
        },
        body: body
    }
    fetch(reset_url, options)
    .then((response)=>response.json())
    .then((json)=>{
        //console.log(json)
        document.getElementById('resetPasswordLoader').style.visibility = 'hidden';
        dispatch(resetPasswordTokenDone(json))
    })
    .catch((e)=>{
        //console.log(e)
        dispatch(resetPasswordTokenDone(e))
    })
};
export async function resetEmail(dispatch){
    var unconfirmed_email_url = '/api/v1/users/set_unconfirmed_email'
    var email = document.getElementById('userProfileCurrEmailField').value
    var new_email = document.getElementById('userProfileUiNewEmail').value
    var password = document.getElementById('userProfileUiPassword').value
    const csrf = document.querySelector('meta[name="csrf-token"]').content
    const token = document.getElementById('token').value
    const bearer = 'Bearer ' + token
    var rcaptcha_token = document.getElementById('uniqueRecaptchaChangeEmailToken').value
    var body = JSON.stringify({
        email: email,
        new_email: new_email,
        password: password
    })
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrf,
            'Authorization': bearer,
            'Captcha-Token': rcaptcha_token
        },
        body: body
    }
    fetch(unconfirmed_email_url, options)
    .then((response) => response.json())
    .then((json) => {
        //console.log(json)
        document.getElementById('token').value = json.new_token.token
        document.getElementById('changeEmailLoader').style.visibility = 'hidden';
        dispatch(resetEmailDone(json))
    })
    .catch((e) => {
        var string_e = JSON.stringify({e: e})
        dispatch(resetEmailDone(string_e))
    })
}
export async function confirmUnconfirmedEmailWithToken(dispatch){
    const new_email = document.getElementById('userProfileUnconfirmedEmailField').value
    const reset_token = document.getElementById('confirmEmailCode').value
    const csrf = document.querySelector('meta[name="csrf-token"]').content
    const bearer_token = document.getElementById('token').value
    const bearer = "Bearer " + bearer_token
    const confirm_url = '/api/v1/users/email_update'
    const rcaptcha_token = document.getElementById('uniqueRecaptchaConfirmEmailToken').value

    var body = JSON.stringify({
        email: new_email,
        token: reset_token
    })
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrf,
            'Authorization': bearer,
            'Captcha-Token': rcaptcha_token
        },
        body: body
    }
    fetch(confirm_url, options)
    .then((response) => response.json())
    .then((json) => {
        //console.log(json)
        document.getElementById('token').value = json.new_token.token
        document.getElementById('userProfileCurrEmailField').value = json.email
        document.getElementById('userProfileCurrEmailField').classList.add('new-email-confirm')
        document.getElementById('resetEmailLoader').style.visibility = 'hidden';
        dispatch(confirmUnconfirmedEmailDone(json))
        
    })
    .catch((e) => {
        var string_e = JSON.stringify({e: e})
        dispatch(confirmUnconfirmedEmailDone(string_e))
    })
}
export default userProfileSlice.reducer;
export const forgotPasswordResponse = state => state.userProfile.forgotPasswordResponse;
export const resetPasswordOldPassResponse = state => state.userProfile.resetPasswordOldPassResponse;
export const resetPasswordTokenResponse = state => state.userProfile.resetPasswordTokenResponse;
export const forgotPasswordViewActive = state => state.userProfile.forgotPasswordViewActive;
export const resetPasswordViewActive = state => state.userProfile.resetPasswordViewActive;
export const resetEmailViewActive = state => state.userProfile.resetEmailViewActive;
export const resetEmailResponse = state => state.userProfile.resetEmailResponse;
export const confirmUnconfirmedEmailResponse = state => state.userProfile.confirmUnconfirmedEmailResponse;
export const accountActivationResponse = state => state.userProfile.accountActivationResponse;
export const profile_user_is_activated = state => state.userProfile.profile_user_is_activated;
export const { forgotPasswordDone, resetPasswordOldPassDone, resetPasswordTokenDone, toggleForgotPasswordView, toggleResetPasswordView, resetEmailDone, toggleResetEmailView, confirmUnconfirmedEmailDone, activateAccountDone } = userProfileSlice.actions