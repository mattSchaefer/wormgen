import { createSlice, combineReducers } from '@reduxjs/toolkit';


export const wormListSlice = createSlice({
    name: 'wormList',
    initialState: {
        worms: [],
        error: '',
    },
    reducers: {
        getWorms: (state) => {
            
        },
        exportWorm: (state) => {

        },
        viewWorm: (state) => {

        },
        addWormToList: (state, action) => {
            state.worms.push(action.payload);
        },
        addMultiWormsToList: (state, action) => {
            state.worms = action.payload;
        },
    },
})

export async function fetchWorms(dispatch){
    const getWormsURL = '/api/v1/worms'
            await fetch(getWormsURL)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    if (json.status !== 500){
                        dispatch(addMultiWormsToList(json.worms))
                    } 
                })
                .catch((error) => {
                    console.log(error);
                    error += error;
                })
};

export const { getWorms, exportWorm, viewWorm, addWormToList, addMultiWormsToList } = wormListSlice.actions;
export default wormListSlice.reducer;
export const worms = state => state.wormList.worms;
