import { configureStore, createStore, combineReducers } from '@reduxjs/toolkit';
import wormListReducer from '../features/wormList/wormListSlice';
import authReducer from '../features/auth/authSlice';
import aboutReducer from '../features/about/aboutUsSlice';
import contactReducer from '../features/contact/contactSlice';
import userProfileReducer from '../features/userProfile/userProfileSlice';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { composedWithDevTools } from 'redux-devtools-extension';
import  fetchWorms from '../features/wormList/wormListSlice'
import { useDispatch } from 'react-redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
//const dispatch = useDispatch();
//const composedEnhancer = composedWithDevTools(applyMiddleware(thunkMiddleware));
const rootReducer = combineReducers({
        wormList: wormListReducer, 
        auth: authReducer,
        about: aboutReducer,
        contact: contactReducer,
        userProfile: userProfileReducer,
    });
export default configureStore({
    reducer: rootReducer,
    
},applyMiddleware(thunk, logger));