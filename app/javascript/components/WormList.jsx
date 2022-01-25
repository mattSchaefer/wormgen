import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { useStore, useSelector, useDispatch } from 'react-redux';
import store from '../store/store';
import { fetchWorms } from '../features/wormList/wormListSlice';
import { getWorms, worms, current_page, total_pages, displayedWorms, view, filteredWorms, viewingWormId, deleteWormRequestPendingForID } from '../features/wormList/wormListSlice';
import { toggleFavorID, closeView, viewWorm } from '../features/wormList/wormListSlice';
import { animateScroll as scroll, scrollSpy, scroller, Events, Element } from 'react-scroll';
import { addMultiWormsToList } from '../features/wormList/wormListSlice';
import { current_user, current_user_token, current_user_id } from '../features/auth/authSlice';
import Pagination from './Pagination'
import Worm from './Worm';
import { NoEncryption } from '@material-ui/icons';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
const flexWrap = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
}  
const carouselStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
}
const viewIconsContainer = {
}
const wormListContainer = {
    minHeight: '78vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
}
const dontDisplay = {
    display: 'none',
}
const closeWormIcon = {
    color: '#eee',
    zIndex: '30000',
    right: '-100px',
    cursor: 'pointer',
    position: 'fixed',
    top: '7rem',
    right: '6.5rem',
    transition: '.3s ease-out',
    background: 'black',
    border: '2px solid black',
    borderRadius: '30px',
    boxShadow: 'rgb(233 218 218 / 75%) 1px -3px 47px 0px',
}
export default function WormList(props){
    const dispatch = useDispatch(); 
    var currentUserToken = useSelector(current_user_token);
    useEffect( () =>{
        //scroller.scrollTo('wormGallHead')
        dispatch(fetchWorms);
    },[worms]);
    var wormsList = useSelector(worms);
    var filteredWormsList = useSelector(filteredWorms)
    var currentPage = useSelector(current_page);
    var displayedWormsList = useSelector(displayedWorms);
    var totalPages = useSelector(total_pages)
    var view1 = useSelector(view)
    var favIDToggle = useSelector(toggleFavorID)
    var delIDToggle = useSelector(deleteWormRequestPendingForID)
    var listOfWorms2 = [];
    var wormsListCopy2 = Array.from(displayedWormsList);
    var viewID = useSelector(viewingWormId)
    function viewThisWorm(ID){
        dispatch(viewWorm(ID))
        document.getElementById(ID).classList.remove('wormListItem')
    }
    function closeTheView(ID){
        //dispatch(viewWorm(ID))

        document.getElementById(viewID).classList.add('wormListItem')
        dispatch(closeView(ID))
         viewID=1000000
        
    }
    //var listOfWorms = [];
    // var wormsListCopy = Array.from(wormsList); 
    //var totalPages = useSelector(total_pages)
    // var totalPages = Math.ceil(wormsList.length / 10)
    // var index_start;
    // currentPage == 1 ? index_start = 1 : index_start = currentPage + 10;
    //var index_end = index_start + 10;
    // if( wormsListCopy.length > 0){
    //     listOfWorms = wormsListCopy.reverse().map((worm) => 
    //         <Worm key={worm.id} src={worm.data_url} name={worm.name} author={worm.user_id} date={worm.created_at} />
    //     )
    // }
    if(wormsListCopy2.length > 0){
        listOfWorms2 = wormsListCopy2.map((worm, index) => 
            <Worm key={worm.id} src={worm.data_url} name={worm.name} author={worm.user_id} date={worm.created_at} favorited_by={worm.favorited_by} id={"worm_" + worm.id} wormID={worm.id} totalLen={wormsList.length} index={index} username={worm.user_obj.username} />
        )
    }
    return(
        <div style={wormListContainer} id="" className={view1 == 'list' ? 'listAndPaginateRow' : 'listAndPaginateCol'}>
            <div style={view1 == 'list' ? flexWrap : carouselStyle } id="mainWormList">
                {
                    wormsListCopy2.length > 0 &&
                        <div style={view1 == 'list' ? flexWrap : carouselStyle } id="mainWormList">
                            {   
                                viewID != 1000000 && 
                                <span onClick={(e) => closeTheView(1000000)}>
                                    <CloseSharpIcon style={closeWormIcon}  className="btn-grad2" tabindex="0"  role="button" />
                                </span>
                            }
                            {listOfWorms2}
                        </div>
                }
                {
                    !wormsListCopy2.length > 0 && 
                        <div><h5>Create an account or Sign In to enter the worm gallary and view worms created by our users!</h5></div>
                }
            </div>
            {totalPages != 0 && <Pagination total_pages={totalPages} current_page={currentPage} />}
            <TextField id="favWormToggleID" value={favIDToggle} style={dontDisplay} />
            <TextField id="delWormID" value={delIDToggle} style={dontDisplay} />
        </div>
    )
};