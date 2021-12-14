import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        current_user: 'anon',
        current_user_token: '',
        current_user_id: 0,
        requestPending: false,
        requestFinished: false,
        requestResponse: {hold: 'hold'},
        requestStarted: false,
        displayedSection: 'signup',
        sectionCollapsed: false,
        activeHover: "",
        signupError: 'no',
        userProfileUiEditEmailExpanded: 'no',
        userProfileUiChangePasswordExpanded: 'no',
    },
    reducers: {
        loggedInUser: (state, action) => {
            state.requestPending = false;
            state.requestFinished = true;
            state.requestResponse = action.payload;
            action.payload.user ? state.current_user = action.payload.user.username : state.current_user = "anon"
            action.payload.user ? state.current_user_id = action.payload.user.id : state.current_user = 0
            action.payload.token? state.current_user_token = action.payload.token.token: state.current_user_token = "";
            state.requestStarted = false;  
        },
        signedUpUser: (state, action) => {
            state.requestPending = false;
            state.requestFinished = true;
            state.requestResponse = action.payload;
            action.payload.user ? state.current_user = action.payload.user.username : state.current_user = "anon"
            action.payload.user ? state.current_user_id = action.payload.user.id : state.current_user = 0
            action.payload.token? state.current_user_token = action.payload.token.token: state.current_user_token = "";
            state.requestStarted = false;
            state.signupError = "no";
        },
        updatedUser: (state, action) => {
            state.requestPending = false;
            state.requestFinished = true;
            state.requestResponse = action.payload;
            action.payload.user ? state.current_user = action.payload.user.username : state.current_user = "anon"
            action.payload.user ? state.current_user_id = action.payload.user.id : state.current_user = 0
            action.payload.token? state.current_user_token = action.payload.token.token: state.current_user_token = "";
            state.requestStarted = false;
        },
        tryAgain: (state) => {
            state.current_user= 'anon';
            state.current_user_token= '';
            state.requestPending= false;
            state.requestFinished= false;
            state.requestResponse= {hold: 'hold'};
            state.requestStarted= false;
            state.displayedSection= 'signup';
            state.sectionCollapsed= false;
            state.activeHover= "";
            state.signupError= 'no';
        },
        loginSignUpClick: (state, action) => {
            state.displayedSection = action.payload;
        },
        loginSignUpHover: (state) => {
            state.activeHover = which;
        },
        noMoreHover: (state) => {
            state.activeHover = "";
        },
        toggleCollapsed: (state) => {
            state.sectionCollapsed == false ? state.sectionCollapsed = true : state.sectionCollapsed = false;
        },
        requestStarted: (state) => {
            state.requestStarted = true;
            state.requestPending = true;
        },
        logInFailure: (state) => {
            state.requestPending = false;
            state.requestFinished = true;
            state.requestResponse = action.payload;
            state.requestStarted = false;
        },
        signUpFailure: (state, action) => {
            state.requestPending = false;
            state.requestFinished = true;
            state.requestStarted = false;
            state.requestResponse = action.payload;
            state.signupError = 'yes';
        },
        updateUserFailure: (state, action) => {
            state.requestPending = false;
            state.requestFinished = true;
            state.requestStarted = false;
            state.requestResponse = action.payload;
            state.signupError = 'yes';
        },
        toggleUserProfileUiEditEmail: (state, action) => {
            state.userProfileUiEditEmailExpanded == 'no' ? state.userProfileUiEditEmailExpanded = 'yes' : state.userProfileUiEditEmailExpanded = 'no';
        },
        toggleUserProfileUiChangePassword: (state, action) => {
            state.userProfileUiChangePasswordExpanded == 'no' ? state.userProfileUiChangePasswordExpanded = 'yes' : state.userProfileUiChangePasswordExpanded = 'no';
        }
    },
})
export async function login(dispatch){
    const url = "/api/v1/login";
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const options = {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    }
    console.log("async login() request body");
    console.log(options)
    dispatch(requestStarted)
    fetch(url, options)
        .then((response) => response.json())
        .then((json)=> {
            console.log("async login() json")
            console.log(json)
            dispatch(loggedInUser(json))
        })
        .catch((e)=>{
            console.log(e)
            dispatch(logInFailure(e))
            return e;
        })
};
export async function signup(dispatch){
    const url = "/api/v1/users";
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const email = document.getElementById('email').value
    const body = JSON.stringify({
        username: username,
        email: email,
        password: password
    })
    const options = {
        method: 'POST',
        body: body,
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    }
    dispatch(requestStarted)
    fetch(url, options)
        .then((response) => response.json())
        .then((json)=> {
            dispatch(signedUpUser(json))
        }).catch((e)=>{
            dispatch(signUpFailure(e))
        })
};
export async function updateUser(dispatch){
    const url = "api/v1/users/" + document.getElementById('userID').value
    const username = document.getElementById("userProfileUsernameField").value;
    const password = document.getElementById('userProfileUiPassword').value;
    const email = document.getElementById('userProfileUiNewEmail').value;
    const body = JSON.stringify({
        username: username,
        email: email,
        password: password
    })
    const token = document.getElementById('token').value
    const bearer = "Bearer " + token
    const options = {
        method: 'PUT',
        body: body,
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': bearer
        }
    }
    dispatch(requestStarted)
    fetch(url, options)
        .then((response) => response.json())
        .then((json)=> {
            console.log(json)
            dispatch(updatedUser(json))
        }).catch((e)=>{
            console.log(e)
            dispatch(updateUserFailure(e))
        })
};
export default authSlice.reducer;
export const current_user = state => state.auth.current_user;
export const current_user_token = state => state.auth.current_user_token;
export const current_user_id = state => state.auth.current_user_id;
export const requestResponse = state => state.auth.requestResponse;
export const { tryAgain, loginSignUpClick, loginSignUpHover, noMoreHover, toggleCollapsed, loggedInUser, signedUpUser, updatedUser, requestStarted, signUpFailure, toggleUserProfileUiEditEmail, toggleUserProfileUiChangePassword } = authSlice.actions;
export const authState = state => state.auth;
