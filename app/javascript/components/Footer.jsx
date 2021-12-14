import React from 'react';
import { TextField, TextArea, Button } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { animateScroll as scroll, scrollSpy, scroller, Events } from 'react-scroll';
import { current_user, current_user_token, current_user_id } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import UserProfile from './UserProfile'
import Contact from './Contact'
const footerDiv={
    minHeight: '40vh',
    background: 'black',
    color: "#eee",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1rem',
    
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
    flexDirection: 'row',
    justifyContent: 'space-between',
}
const socialsIconsOuterDiv = {
    width: '10rem',
}
const marginBottomNone = {
    marginBottom: '0',
    fontSize: '.75rem',
}
export default function Footer(props){
    const dispatch = useDispatch()
    const user = useSelector(current_user)
    const token = useSelector(current_user_token)
    const userID = useSelector(current_user_id)
    const user_logged_in = user != 'anon' && token.length > 0
    return (
        <div style={footerDiv}>
            <div style={flexBetween}>
                <Contact />
                {
                    user_logged_in && 
                    <UserProfile />
                }
                <div>
                    <div style={socialsIconsOuterDiv}>
                        <span style={socialsIcons}>
                            <InstagramIcon className="actually-link" />
                            <LinkedInIcon className="actually-link" />
                            <TwitterIcon className="actually-link" />
                        </span>
                        <span>
                            <p className="actually-link">Send me crypto? :D</p>
                        </span>
                    </div>
                </div>
            </div>
            <p className="actually-link" style={center} onClick={(e)=>scroll.scrollToTop()}>
                    Back to top
            </p>
            <p style={marginBottomNone}>If you require additional assistance using this application due its accessibility, please contact email@email.com, or fill out the above Contact form with an explanation of the problem and I will address it as soon as possible.  Thank you.</p>
        </div>    
    )
}