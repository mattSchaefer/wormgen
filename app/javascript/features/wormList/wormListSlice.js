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
            console.log("inside addmultiwormstolist reducer ");
            console.log(action.payload);
            state.worms = action.payload;
            console.log("state.worms from reducer \n")
            console.log(state.worms);
        },
    },
})

export async function fetchWorms(dispatch){
    const getWormsURL = '/api/v1/worms'
            await fetch(getWormsURL)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    dispatch(addMultiWormsToList(json.worms))
                    //state.wormList.worms.concat(json.worms)
                    if (json.status !== 500){
                        //state.worms.concat(json.worms);

                        //dispatch({type: 'wormList/addMultiWormsToList', payload: json.worms});
                        //return json.worms;
                        
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
