import { EmojiSymbols } from '@material-ui/icons'
import { createSlice } from '@reduxjs/toolkit'
export const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        message: '',
        email: '',
        subject: '',
        submitted: '',
        requestStarted: '',
        requestFinished: '',
        requestResponse: {},
        submissionError: {}
    },
    reducers: {
        contactSubmitted: (state, action) => {
            state.requestResponse = action.payload;
        },
        errorOnSubmission: (state, action) => {
            state.submisionError = action.payload
        },
    },
})
export async function submitContact(dispatch){
    var message = document.getElementById('contactFormMessage').value
    var email = document.getElementById('contactFormEmail').value
    var subject = document.getElementById('contactFormSubject').value
    const csrf =  document.querySelector('meta[name="csrf-token"]').content
    const rcaptcha_token = document.getElementById("uniqueRecaptchaSubmitContactToken").value
    var body = JSON.stringify({
        message: message,
        email: email,
        subject: subject
    })
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf,
        'Captcha-Token': rcaptcha_token
    }
    const options = {
        method: 'POST',
        headers: headers,
        body: body
    }
    const url = 'api/v1/contacts'
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            //console.log(json)
            dispatch(contactSubmitted(json))
        })
        .catch(e => {
            dispatch(errorOnSubmission(e))
        })
}
export default contactSlice.reducer;
export const {contactSubmitted, errorOnSubmission } = contactSlice.actions;
export const requestResponse = state => state.contact.requestResponse
export const contactState = state => state.contact