import React from 'react';
import { TextField, Button } from '@material-ui/core'
import { submitContact } from '../features/contact/contactSlice'
import { contactState } from '../features/contact/contactSlice'
import { useDispatch, useSelector } from 'react-redux'
import ReCaptchaV2 from 'react-google-recaptcha';
import { verifyContactSubmitRecaptcha } from '../features/reCaptcha/reCaptchaSlice';
import {reCaptchaState} from '../features/reCaptcha/reCaptchaSlice';
const contactContainer = {
    width: '24rem',
}
const contactForm = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '13rem',
    width: '23rem',
}
const contactSubmit = {
    width: '50%',
}
const captchaErrorMessage = {
    display: 'none',
    width: '82%',
}
export default function Contact(props){
    const dispatch = useDispatch()
    const conState = useSelector(contactState)
    const re_captcha_state = useSelector(reCaptchaState)
    function formSubmit(){
        if(re_captcha_state.misc.contactSubmitRecaptchaVerified == 'yes')
            dispatch(submitContact)
        else
        document.getElementById('submitContactRecaptchaErrorMessage').classList.add('recaptcha-error-active')

    }
    function handleContactSubmitCaptchaChange(token){
        document.getElementById('uniqueRecaptchaSubmitContactToken').value = token
        console.log(token)
        setTimeout(function(){
            dispatch(verifyContactSubmitRecaptcha)
        },1000)
    }
    return(
        <div style={contactContainer}>
            {
                conState.requestResponse.status !== 200 &&
                <div>
                    <h5 className="revealable">Contact</h5>
                    <p className="revealable">Please fill out this form if you have any questions, comments, or concerns about this application, or if you would like to get into contact with its developer for any reason</p>
                    <div style={contactForm}>
                        <TextField label="email" id="contactFormEmail" className="revealable" />
                        <TextField label="subject" id="contactFormSubject" className="revealable" />
                        <TextField variabt="filled" multiline label="message" id="contactFormMessage" className="revealable" />
                        <span id="submitContactRecaptchaErrorMessage" style={captchaErrorMessage}>
                            please verify the captcha
                        </span>  
                        <ReCaptchaV2 theme="dark" id="forgotPasswordCaptcha" className="revealable" sitekey={process.env.REACT_APP_RCAPTCHA_SITE_KEY} onChange={(token) => {handleContactSubmitCaptchaChange(token)}} onExpire={(e) => {handleCaptchaExpire()}} />      
                        <Button className="btn-grad revealable" variant="contained" color="primary" onClick={()=>formSubmit()} style={contactSubmit}>Submit </Button>
                        <input type="hidden" id="uniqueRecaptchaSubmitContactToken" />
                    </div>
                </div>
            }
            {
                conState.requestResponse.status == 200 &&
                <div>
                    <h3>Success.  We have received your contact and will be in touch with you soon.</h3>
                </div>
            }
        </div>
    )
}