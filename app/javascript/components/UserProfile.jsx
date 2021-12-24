import React, { useEffect } from 'react';
import store from '../store/store';
import { Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector, useStore } from 'react-redux';
import  {current_user, current_user_token, current_user_id} from '../features/auth/authSlice';
import { login, signup, authState, updateUser, toggleUserProfileUiEditEmail, toggleUserProfileUiChangePassword } from '../features/auth/authSlice';
import { forgotPassword, resetPasswordOldPass, resetPasswordToken } from '../features/userProfile/userProfileSlice';
import {resetPasswordOldPassResponse, forgotPasswordResponse} from '../features/userProfile/userProfileSlice';
import { worms } from '../features/wormList/wormListSlice';

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
export default function UserProfile(props){
    var dispatch = useDispatch()
    const selectedAuthState = useSelector(authState)
    const current_user1 = useSelector(current_user)
    var current_userId1 = useSelector(current_user_id)
    const current_user_token1 = useSelector(current_user_token)
    const current_email = selectedAuthState.requestResponse.user.email
    const reset_status = useSelector(resetPasswordOldPassResponse)
    const list_of_worms = useSelector(worms)
    const worm_list_copy = Array.from(list_of_worms)
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
        dispatch(toggleUserProfileUiEditEmail())
    }
    function changePasswordToggle(){
        dispatch(toggleUserProfileUiChangePassword())
    }
    function editEmailSubmit(){
        dispatch(updateUser)
    }
    function changePasswordSubmit(){
        var old_pass = document.getElementById('userProfileUiOldPassword').value
        var old_pass_confirm = document.getElementById('userProfileUiOldPasswordConfirm').value
        var new_pass = document.getElementById('userProfileUiPassword').value
        var new_pass_confirm = document.getElementById('userProfileUiPasswordConfirm').value
        if(old_pass == old_pass_confirm && new_pass == new_pass_confirm){
            dispatch(resetPasswordOldPass(dispatch))
        }else{
            alert('handle this error')
        }
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
                        selectedAuthState.userProfileUiEditEmailExpanded == 'no' &&
                        <Button style={whiteTextButtonSmallText} variant="contained" color="primary" onClick={() => editEmailToggle()} >edit</Button>
                    }
                </span>
                {
                    selectedAuthState.userProfileUiEditEmailExpanded == 'yes' && 
                    <span>
                        {
                            reset_status.status !== 200 &&
                            <span>
                                <TextField id="userProfileUiNewEmail" label="New Email" />
                                <TextField id="userProfileUiNewEmailConfirm" label="New Email Confirm" />
                                <TextField id="userProfileUiOldPassword" label="OldPassword" />
                                <TextField id="userProfileUiOldPasswordConfirm" label="Old Password Confirm" />
                                <TextField id="userProfileUiPassword" label="Password" />
                                <TextField id="userProfileUiPasswordConfirm" label="Password Confirm" />
                                <Button id="userProfileUiChangeEmailSubmit" variant="contained" color="primary" onClick={() => editEmailSubmit()}>Change Email Address</Button>
                                <Button id="userProfileUiChangePasswordSubmit" variant="contained" color="primary" onClick={() => changePasswordSubmit()}>Change Password</Button>
                            </span>
                        }
                        {reset_status.status == 200 &&
                            <span>
                            <h3 style={allGoodHead}>You're all good!</h3>
                            <h3 style={allGoodPara}>Use your new password the next time you log in.</h3>
                            </span>
                        }
                    </span>
                }
                <div style={changePasswordButtonContainer}><Button style={whiteTextButtonSmallText} variant="contained" color="primary" onClick={() => changePasswordToggle()} >change password</Button></div>
                
            </span>
        </div>
    )
}