import React from 'react';
import { TextField, Button } from '@material-ui/core'
import { submitContact } from '../features/contact/contactSlice'
import { contactState } from '../features/contact/contactSlice'
import { useDispatch, useSelector } from 'react-redux'
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
export default function Contact(props){
    const dispatch = useDispatch()
    const conState = useSelector(contactState)

    function formSubmit(){
        dispatch(submitContact)
    }
    return(
        <div style={contactContainer}>
            {
                conState.requestResponse.status !== 200 &&
                <div>
                    <h5>Contact</h5>
                    <p>Please fill out this form if you have any questions, comments, or concerns about this application, or if you would like to get into contact with its developer for any reason</p>
                    <div style={contactForm}>
                        <TextField label="email" id="contactFormEmail" />
                        <TextField label="subject" id="contactFormSubject" />
                        <TextField variabt="filled" multiline label="message" id="contactFormMessage" />
                        <Button variant="contained" color="primary" onClick={()=>formSubmit()}>Submit </Button>
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