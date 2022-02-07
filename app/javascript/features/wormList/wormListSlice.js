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
        totalPages: 0,
        pageSize: 18,
        pageStart: 1,
        pageEnd: 18,
        view: 'list',
        favoriteToggleId: 0,
        filter: 'none',
        viewingWormId: 1000000,
        saveWormRequestPending: 'no',
        saveWormRequestFinished: 'no',
        favUnfavWormRequestPending: 'no',
        favUnfavWormRequestPendingForID: -1,
        deleteWormRequestPending: 'no',
        deleteWormPendingForID: -1
    },
    reducers: {
        getWorms: (state) => {
        },
        exportWorm: (state) => {
        },
        setSaveWormRequestPending: (state, action) => {
            state.saveWormRequestPending == 'yes' ? state.saveWormRequestPending = "no" : state.saveWormRequestPending = "yes"
        },
        setFavoriteWormRequestPending: (state, action) => {
            state.favUnfavWormRequestPending == 'yes' ? state.favUnfavWormRequestPending = 'no' : state.favUnfavWormRequestPending = "yes"
            state.favUnfavWormRequestPending == 'yes' ? state.favUnfavWormRequestPendingForID = action.payload : state.favUnfavWormRequestPendingForID = '-1'
        },
        setDeleteWormRequestPending: (state, action) => {
            state.deleteWormRequestPending == 'yes' ? state.deleteWormRequestPending = 'no' : state.deleteWormRequestPending = "yes"
            state.deleteWormRequestPending == 'yes' ? state.deleteWormRequestPendingForID = action.payload : state.deleteWormRequestPendingForID = '-1'
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
            state.saveWormRequestFinished = 'yes';
            state.saveWormRequestPending = 'no';
        },
        changePage: (state, action) => {
            state.currentPage = action.payload;
            var worms_copy = Array.from(state.worms);
            var filter_copy = Array.from(state.filteredWorms) || []
            if(filter_copy.length > 0)
                worms_copy = filter_copy.reverse()
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
                state.pageSize = 18;
            }else{
                state.pageSize = 3;
            }
            var worms_copy = Array.from(state.worms);
            var filter_copy = Array.from(state.filteredWorms) || []
            if(filter_copy.length > 0)
                worms_copy = filter_copy.reverse()
            else
                state.filteredWorms = worms_copy
            var start = 0;
            state.currentPage = 1; 
            //state.currentPage == 1 ? start = 0 : start = state.currentPage * state.pageSize;
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
            var worms_copy = Array.from(state.worms).reverse()
            state.filteredWorms = worms_copy;
            var filter_worms_copy = Array.from(state.filteredWorms)
            var start = 0
            var end  = start + state.pageSize;
            end > filter_worms_copy.length ? end = filter_worms_copy.length : end = end
            state.pageEnd = end;
            state.pageStart = start;
            state.totalPages = Math.ceil(state.filteredWorms.length / state.pageSize);
            var display_arr = filter_worms_copy.slice(start, end);
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
    document.getElementById('wormListLoader').style.visibility = 'visible'
    const token = document.getElementById('token').value
    const bearer = "Bearer " + token
    const csrf = document.querySelector('meta[name="csrf-token"]').content
    const user_id = document.getElementById('userID').value
    const body = JSON.stringify({user_id: user_id})
    const options = {headers: {'Authorization': bearer,'X-CSRF-Token': csrf} }
    //console.log("fetchworm options ")
    //console.log(options) 
    const getWormsURL = '/api/v1/worms?user_id='+user_id
    await fetch(getWormsURL, options)
        .then((response) => response.json())
        .then((json) => {
            //console.log(json);
            if (json.status !== 500){
              //  document.getElementById('token').value = json.new_token.token
                document.getElementById('wormListLoader').style.visibility = 'hidden'
                dispatch(addMultiWormsToList(json.worms))
            } 
        })
        .catch((error) => {
            //console.log(error);
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
        //console.log(json)
        document.getElementById('token').value = json.new_token.token
    })
    .catch((e) => {
        //console.log(e)
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
        //console.log(json)
        document.getElementById('token').value = json.new_token.token
    })
    .catch((e) => {
        //console.log(e)
    })
}
export async function deleteWorm(){
    const worm_id = document.getElementById('delWormID').value
    const delWormUrl = '/api/v1/delete-worm/'
    const token = document.getElementById('token').value
    const user_id = document.getElementById('userID').value
    const csrf = document.querySelector('meta[name="csrf-token"]').content
    const bearer = "Bearer " + token
    const body = JSON.stringify({
        user_id: user_id,
        id: worm_id
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
    fetch(delWormUrl, options)
    .then(response => response.json())
    .then(json => {
        //console.log(json)
    })
    .catch((e) => {
        var string_e = JSON.stringify(e)
        //console.log(e)
    })
}

export const { getWorms, exportWorm, addWormToList, addMultiWormsToList, changePage, changeView, filterByFavorite, filterByCurrentUser, resetFilter, viewWorm, closeView, setSaveWormRequestPending, setFavoriteWormRequestPending, setDeleteWormRequestPending } = wormListSlice.actions;
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
export const saveWormRequestPending = state => state.wormList.saveWormRequestPending;
export const saveWormRequestFinished = state => state.wormList.saveWormRequestFinished;
export const favUnfavWormRequestPending = state => state.wormList.favUnfavWormRequestPending;
export const favUnfavWormRequestPendingForID = state => state.wormList.favUnfavWormRequestPendingForID;
export const deleteWormRequestPending = state => state.wormList.deleteWormRequestPending;
export const deleteWormRequestPendingForID = state => state.wormList.deleteWormRequestPendingForID;