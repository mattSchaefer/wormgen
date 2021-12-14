import { createSlice, combineReducers } from '@reduxjs/toolkit';
export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {
        username: '',
        email: '',
        password: '',
        password_confirm: '',

    },
    reducers: {
        changeAttribute: (state, action) =>{
            const attr = action.payload.which
            const new_value = action.payload.which_value
        },
        emailUser: (state, action) => {
            
        },
    },
})