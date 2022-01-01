import { Satellite } from '@material-ui/icons';
import { createSlice, combineReducers } from '@reduxjs/toolkit';

export const wormListSlice = createSlice({
    name: 'wormList',
    initialState: {
        worms: [],
        displayedWorms: [],
        filteredWorms: [],
        error: '',
        currentPage: 1,
        totalPages: 1,
        pageSize: 20,
        pageStart: 1,
        pageEnd: 20,
        view: 'list',
        favoriteToggleId: 0,
        filter: 'none',
        viewingWormId: 1000000,
    },
    reducers: {
        getWorms: (state) => {
        },
        exportWorm: (state) => {
        },
        addWormToList: (state, action) => {
            state.worms.push(action.payload);
        },
        addMultiWormsToList: (state, action) => {
            state.worms = action.payload;
            state.totalPages = Math.ceil(state.worms.length / state.pageSize);
            var worms_copy = Array.from(state.worms);
            var start; 
            state.currentPage == 1 ? start = 0 : start = state.currentPage * state.pageSize;
            var end  = start + state.pageSize;
            var display_arr = worms_copy.reverse().slice(start, end);
            state.pageEnd = end;
            state.pageStart = start;
            state.displayedWorms = display_arr;
        },
        changePage: (state, action) => {
            state.currentPage = action.payload;
            var worms_copy = Array.from(state.worms);
            var filter_copy = Array.from(state.filteredWorms) || []
            if(filter_copy.length > 0)
                worms_copy = filter_copy
            var start; 
            state.currentPage == 1 ? start = 0 : start = state.currentPage * state.pageSize;
            var end  = start + state.pageSize;
            end > worms_copy.length ? end = worms_copy.length : end = end
            state.pageEnd = end;
            state.pageStart = start;
            var display_arr = worms_copy.reverse().slice(start, end);
            state.displayedWorms = display_arr;
            state.totalPages = Math.ceil(worms_copy.length / state.pageSize);
        },
        changeView(state, action){
            state.view = action.payload;
            if(action.payload == 'list'){
                state.pageSize = 20;
            }else{
                state.pageSize = 3;
            }
            var worms_copy = Array.from(state.worms);
            var filter_copy = Array.from(state.filteredWorms) || []
            if(filter_copy.length > 0)
                worms_copy = filter_copy
            else
                state.filteredWorms = worms_copy
            var start; 
            state.currentPage == 1 ? start = 0 : start = state.currentPage * state.pageSize;
            var end  = start + state.pageSize;
            end > worms_copy.length ? end = worms_copy.length : end = end
            var display_arr = worms_copy.reverse().slice(start, end);
            state.pageEnd = end;
            state.pageStart = start;
            state.displayedWorms = display_arr;
            state.totalPages = Math.ceil(state.worms.length / state.pageSize);
        },
        filterByFavorite(state, action){
            var worms_copy = Array.from(state.worms);
            var worm_filtered = worms_copy.filter(worm => {
                return worm.favorited_by && worm.favorited_by.toString().indexOf(action.payload.toString()) >= 0
            })
            state.filteredWorms = worm_filtered
            var start; 
            state.currentPage == 1 ? start = 0 : start = state.currentPage * state.pageSize;
            var end  = start + state.pageSize;
            var filter_worms_copy = Array.from(worm_filtered)
            end > filter_worms_copy.length ? end = filter_worms_copy.length : end = end
            var display_arr = filter_worms_copy.reverse().slice(start, end);
            state.displayedWorms = display_arr
            state.pageStart = start;
            state.totalPages = Math.ceil(state.filteredWorms.length / state.pageSize);
            state.filter = "favorite";
        },
        filterByCurrentUser(state, action){
            var worms_copy = Array.from(state.worms)
            var filtered_arr = worms_copy.filter((w) =>{
                return w.user_id.toString() == action.payload.toString()
            })
            var filter_worms_copy = Array.from(filtered_arr)
            var start = 0
            var end  = start + state.pageSize;
            end > filter_worms_copy.length ? end = filter_worms_copy.length : end = end
            state.pageEnd = end;
            state.pageStart = start;
            state.filteredWorms = filtered_arr;
            state.totalPages = Math.ceil(state.filteredWorms.length / state.pageSize);
            var display_arr = filter_worms_copy.reverse().slice(start, end);
            state.displayedWorms = display_arr
            state.filter = "current_user";
        },
        resetFilter(state, action){
            var worms_copy = Array.from(state.worms)
            state.filteredWorms = worms_copy;
            var filter_worms_copy = Array.from(state.filteredWorms)
            var start = 0
            var end  = start + state.pageSize;
            end > filter_worms_copy.length ? end = filter_worms_copy.length : end = end
            state.pageEnd = end;
            state.pageStart = start;
            state.totalPages = Math.ceil(state.filteredWorms.length / state.pageSize);
            var display_arr = filter_worms_copy.reverse().slice(start, end);
            state.displayedWorms = display_arr
            state.filter = "none"
        },
        viewWorm(state, action){
            state.viewingWormId = action.payload;
        },
        closeView(state, action){
            state.viewingWormId = action.payload;
        }
    },
})
export async function fetchWorms(dispatch){
    const getWormsURL = '/api/v1/worms'
    const token = document.getElementById('token').value
    const bearer = "Bearer " + token
    const csrf = document.querySelector('meta[name="csrf-token"]').content
    const options = {headers: {'Authorization': bearer,'X-CSRF-Token': csrf} }
    console.log("fetchworm options ")
    console.log(options)
    await fetch(getWormsURL, options)
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
export async function favoriteWorm(){
    const favWormURL = '/api/v1/favorite-worm'
    const token = document.getElementById('token').value
    const bearer = "Bearer " + token
    const user_id = document.getElementById('userID').value
    const worm_id = document.getElementById('favWormToggleID').value
    const csrf = document.querySelector('meta[name="csrf-token"]').content
    const body = JSON.stringify({
        id: worm_id,
        favorited_by: user_id
    })
    const options = {
        method: "PUT",
        body: body,
        headers: {
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrf
        }
    }
    fetch(favWormURL, options)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
    })
    .catch((e) => {
        console.log(e)
    })
}
export async function unfavoriteWorm(){
    const favWormURL = '/api/v1/unfavorite-worm'
    const token = document.getElementById('token').value
    const user_id = document.getElementById('userID').value
    const worm_id = document.getElementById('favWormToggleID').value
    const csrf = document.querySelector('meta[name="csrf-token"]').content
    const bearer = "Bearer " + token
    const body = JSON.stringify({
        id: worm_id,
        favorited_by: user_id
    })
    const options = {
        method: "PUT",
        body: body,
        headers: {
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrf
        }
    }
    fetch(favWormURL, options)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
    })
    .catch((e) => {
        console.log(e)
    })
}
export const { getWorms, exportWorm, addWormToList, addMultiWormsToList, changePage, changeView, filterByFavorite, filterByCurrentUser, resetFilter, viewWorm, closeView } = wormListSlice.actions;
export default wormListSlice.reducer;
export const worms = state => state.wormList.worms;
export const filteredWorms = state => state.wormList.filteredWorms;
export const displayedWorms = state => state.wormList.displayedWorms;
export const current_page = state => state.wormList.currentPage;
export const total_pages = state => state.wormList.totalPages;
export const pageStart = state => state.wormList.pageStart;
export const pageEnd = state => state.wormList.pageEnd;
export const view = state => state.wormList.view;
export const toggleFavorID = state => state.wormList.favoriteToggleId;
export const currentWormListFilter = state => state.wormList.filter;
export const viewingWormId = state => state.wormList.viewingWormId;