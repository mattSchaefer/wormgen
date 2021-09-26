import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    current_user: 'anon',
    current_user_token: '',

}
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logIn: (state) => {
            
        },
        signUp: (state) => {

        }, 
    },

})

export default authSlice.reducer;
export const current_user = state => state.auth.current_user;
export const current_user_token = state => state.auth.current_user_token;