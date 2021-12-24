import { createSlice, combineReducers } from '@reduxjs/toolkit';
export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {
        forgotPasswordResponse: {},
        resetPasswordOldPassResponse: {},
        resetPasswordTokenResponse: {},
        password_confirm: {},
    },
    reducers: {
        changeAttribute: (state, action) =>{
            const attr = action.payload.which
            const new_value = action.payload.which_value
        },
        forgotPasswordDone: (state, action) => {
            state.forgotPasswordResponse = action.payload
        },
        resetPasswordOldPassDone: (state, action) => {
            state.resetPasswordOldPassResponse = action.payload
        },
        resetPasswordTokenDone: (state, action) => {
        
        },
        emailUser: (state, action) => {
            
        },
    },
})
export async function forgotPassword(dispatch){
    const forgot_url = '/password_forgot'
    const token = document.getElementById('token').value
    const user_id = document.getElementById('userID').value
    const email = document.getElementById('userProfileCurrEmailField').value
    const bearer = "Bearer " + token
    const body = JSON.stringify({
        email: email
    })
    const options = {
        method: "POST",
        body: body,
        headers: {
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    fetch(forgot_url, options)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        dispatch(forgotPassrodDone(json))
    })
    .catch((e) => {
        console.log(e)
        dispatch(forgotPassrodDone(e))
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
            'X-CSRF-Token': csrf
        },
        body: body
    }
    fetch(reset_url, options)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        dispatch(resetPasswordOldPassDone(json))
    })
    .catch((e) => {
        console.log(e)
        dispatch(resetPasswordOldPassDone(e))
    })
};
export async function resetPasswordToken(dispatch){
    const token = document.getElementById('token').value
    const user_id = document.getElementById('userID').value
};

export default userProfileSlice.reducer;
export const forgotPasswordResponse = state => state.userProfile.forgotPasswordResponse;
export const resetPasswordOldPassResponse = state => state.userProfile.resetPasswordOldPassResponse;
export const { forgotPasswordDone, resetPasswordOldPassDone, resetPasswordTokenDone } = userProfileSlice.actions