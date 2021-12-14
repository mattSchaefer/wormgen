import React, { useEffect } from 'react';
import store from '../store/store';
import { Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector, useStore } from 'react-redux';
import  {current_user, current_user_token, current_user_id} from '../features/auth/authSlice';
import { login, signup, authState, updateUser, toggleUserProfileUiEditEmail, toggleUserProfileUiChangePassword } from '../features/auth/authSlice';

require('isomorphic-fetch');
const flexCol={
    display: 'flex',
    flexDirection: 'column',
    width: '24rem',
}
const whiteTextButtonSmallText = {
    color: '#eee',
    fontSize: '.75rem',
    padding: "2px",
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
export default function UserProfile(props){
    var dispatch = useDispatch()
    const selectedAuthState = useSelector(authState)
    const current_user1 = useSelector(current_user)
    const current_user_token1 = useSelector(current_user_token)
    const current_email = selectedAuthState.requestResponse.user.email
    //useEffect(()=>{
        //get total count of favorites among the user's worms
    //},[current_user, current_user_token])
    function editEmailToggle(){
        dispatch(toggleUserProfileUiEditEmail())
    }
    function changePasswordToggle(){
        dispatch(toggleUserProfileUiChangePassword())
    }
    function editEmailSubmit(){
        dispatch(updateUser)
    }
    return (
        <div>
            <span style={flexCol}>
                <h5>User Profile</h5>
                <div style={yourWormsFavContain}><p>Your worms have been favorited ___ times!</p></div>
                <TextField id="userProfileUsernameField" label="Username" value={current_user1} style={userProfileTextField} disabled />
                <span style={currentEmailSpan}>
                    <TextField id="userProfileCurrEmailField" label="Current Email" value={current_email} style={userProfileTextFieldEmail}  disabled />
                    {
                        selectedAuthState.userProfileUiEditEmailExpanded == 'no' &&
                        <Button style={whiteTextButtonSmallText} variant="contained" color="primary" onClick={() => editEmailToggle()} >edit</Button>
                    }
                </span>
                {
                    selectedAuthState.userProfileUiEditEmailExpanded == 'yes' &&
                    <span>
                        <TextField id="userProfileUiNewEmail" label="New Email" />
                        <TextField id="userProfileUiNewEmailConfirm" label="New Email Confirm" />
                        <TextField id="userProfileUiPassword" label="Password" />
                        <TextField id="userProfileUiPasswordConfirm" label="Password Confirm" />
                        <Button id="userProfileUiChangeEmailSubmit" variant="contained" color="primary" onClick={() => editEmailSubmit()}>Change Email Address</Button>
                    </span>
                }
                <div style={changePasswordButtonContainer}><Button style={whiteTextButtonSmallText} variant="contained" color="primary" onClick={() => changePasswordToggle()} >change password</Button></div>
                
            </span>
        </div>
    )
}