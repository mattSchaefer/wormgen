import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { view, worms, filteredWorms } from '../features/wormList/wormListSlice';
import { useSelector, useDispatch } from 'react-redux';
import { pageStart, pageEnd, viewingWormId, favUnfavWormRequestPending, favUnfavWormRequestPendingForID, setDeleteWormRequestPending, deleteWormRequestPendingForID, deleteWormRequestPending } from '../features/wormList/wormListSlice';
import {favoriteWorm, unfavoriteWorm, closeView, viewWorm, deleteWorm} from '../features/wormList/wormListSlice';
import {setFavoriteWormRequestPending} from '../features/wormList/wormListSlice';
import { current_user_id } from '../features/auth/authSlice';
import { isFlowPredicate } from '@babel/types';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { fetchWorms } from '../features/wormList/wormListSlice';

require('isomorphic-fetch');
const wormStyle={
    width: '25vw',
    transition: '.2s ease-out',
}
const wormStyleCarousel = {
    width: '35vw',
    transition: '.2s ease-out',
}
const flexWorm = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: '1rem',
    marginBottom: '2rem',
    //background: 'rgb(35,45,61)',
    background: "#eee",
    marginRight: '1rem',
    boxShadow: "11px 38px 226px 65px rgba(35,45,61,0.65)",
    WebkitBoxShadow: "11px 38px 226px 65px rgba(35,45,61,0.65)",
    MozBoxShadow: "11px 38px 226px 65px rgba(35,45,61,0.65)",
    transition: '.2s ease-out',
}
const wormInfoContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: 'rgb(35, 45, 61)',
    width: '100%',
    padding: '5px',
    transition: '.2s ease-out',
}
const wormTitle={
    width: '100%',
    fontStyle: 'italic',
    textAlign: 'center',
    transition: '.2s ease-out',

}
const wormContainer = {
    minHeight: "0",
    zIndex: '99',
}
const wormContainerCarousel = {}
const nonTitleWormAttrs = {
    paddingLeft: '5px',
    display: 'flex',
    flexDirection: 'column',
    transition: '.2s ease-out',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: '1rem',
}
const wormAttr = {
    marginBottom: '0',
    lineHeight: '1.1',
    transition: '.2s ease-out',
}
const italics={fontStyle: 'italic',}
const tiltStart = {
    transform: "skew(0, 8deg)",
    transition: '.2s ease-out',
}
const tiltEnd = {
    transform: "skew(0, -8deg)",
    transition: '.2s ease-out',
}
const redFill = {
    color: '#aa2e25',
    background: '##aa2e25',
    zIndex: '100',
    cursor: 'pointer',
}
const redOutline = {
    color: '#aa2e25',
    background: '##aa2e25',
    zIndex: '100',
    cursor: 'pointer',
}
const bigworm = {
    position: 'fixed',
    top: '18vh',
    zIndex: '30000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: '1rem',
    marginBottom: '2rem',
    //background: 'rgb(35,45,61)',
    background: "#eee !important",
    marginRight: '1rem',
    transition: '.2s ease-out',
    WebkitBoxShadow: "2px 1px 8px 44px #000000", 
    boxShadow: "2px 1px 8px 44px #000000",
    MozBoxShadow: "2px 1px 8px 44px #000000",
}
const bigwormIMG = {
    width: 'auto',
}
const closeWormIcon = {
    color: 'black',
    zIndex: '30000',
    position: 'absolute',
    right: '-100px',
}
const flexRowBet = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}
const areYouSureButtonSpan={
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
}
const red = {color: 'red',}
export default function Worm(props){
    const dispatch = useDispatch();
    var fav_by = props.favorited_by ? props.favorited_by.split(',').filter(x => x.length > 0).length : 0
    var view1 = useSelector(view);
    const pageStart1 = useSelector(pageStart);
    const pageEnd1 = useSelector(pageEnd);
    var viewID = useSelector(viewingWormId);
    var currentUser = useSelector(current_user_id)
    var fil_worms = useSelector(filteredWorms) || []
    var fav_worm_pending = useSelector(favUnfavWormRequestPending)
    var pending_favorite_for = useSelector(favUnfavWormRequestPendingForID)
    var del_worm_pending = useSelector(deleteWormRequestPending)
    var del_pending_for = useSelector(deleteWormRequestPendingForID)
    var fil_worms_arr = Array.from(fil_worms)
    var carousel_index= props.index//(props.totalLen - props.wormID) % 3;
    if(fil_worms_arr && fil_worms_arr.length > 0)
        carousel_index = props.index//(fil_worms_arr.length - props.wormID) % 3;
    //props.totalLen % 2 == 0 ? carousel_index = props.wormID % 3 + 1 : carousel_index = props.wormID % 3;
    var fav_by_user_arr=[]//props.favorited_by.split(',').find((i) => i.toString() == currentUser.toString())
    function toggleFavorite(){
        dispatch(setFavoriteWormRequestPending(props.wormID))
        fav_by_user_arr = props.favorited_by ? props.favorited_by.split(',').find((i) => i.toString() == currentUser.toString()) : []
        document.getElementById('favWormToggleID').value = props.wormID
        if(props.favorited_by && props.favorited_by.split(',').indexOf(currentUser.toString()) >= 0){
            //fav_by--
            //document.getElementById('favBy').innerText = (fav_by).toString()
            dispatch(unfavoriteWorm).then(()=>{
                setTimeout(function(){
                    dispatch(fetchWorms).then(()=>dispatch(setFavoriteWormRequestPending(props.wormID)))
                },3000)
            })
        }else{
            //fav_by++
            //document.getElementById('favBy').innerText = (fav_by).toString()
            dispatch(favoriteWorm).then(()=>{
                setTimeout(function(){
                    dispatch(fetchWorms).then(()=>dispatch(setFavoriteWormRequestPending(props.wormID)))
                },3000)
             })  
        }
        
    }
    function viewThisWorm(ID){
        if(view1 == 'list' && window.screen.width > 900){
            dispatch(viewWorm(ID))
            document.getElementById(ID).classList.remove('wormListItem')
        }
    }
    function closeTheView(ID){
        //dispatch(viewWorm(ID))
        dispatch(closeView(ID))
         viewID=1000000
        
        document.getElementById(props.wormID).classList.add('wormListItem')
    }
    function deleteThisWorm(){
        dispatch(setDeleteWormRequestPending(props.wormID))
        document.getElementById('delWormID').value = props.wormID
        document.getElementById(props.wormID).classList.remove('wormListItem')
        dispatch(deleteWorm).then(()=>{
            setTimeout(function(){
                dispatch(fetchWorms).then(() => {
                    setTimeout(function(){
                        dispatch(setDeleteWormRequestPending(-1))
                    },750)
                })
            },3000)
         }) 
    }
    function neverMindDontDelete(){
        document.getElementById('are-you-sure-delete-' + props.wormID).classList.add('hidden') 
        document.getElementById('are-you-sure-delete-' + props.wormID).classList.remove('visible')
        document.getElementById('delete-worm-link-' + props.wormID).classList.add('visible')
        document.getElementById('delete-worm-link-' + props.wormID).classList.remove('hidden')
    }
    function deleteWormClick(){ 
        document.getElementById('are-you-sure-delete-' + props.wormID).classList.add('visible')
        document.getElementById('are-you-sure-delete-' + props.wormID).classList.remove('hidden')
        document.getElementById('delete-worm-link-' + props.wormID).classList.add('hidden')
        document.getElementById('delete-worm-link-' + props.wormID).classList.remove('visible')
    }
    return (
        <div style={ props.wormID == pageStart1 ? tiltStart : props.wormID == pageEnd1 ? tiltEnd : props.wormID == viewID ? bigworm : flexWorm } id={props.wormID} className={view1 == 'carousel' ? "wormCarousel_"+carousel_index : view1 == 'list' && viewID == 1000000 ? 'wormListItem' : ""} >
       
            { props.src && 
            <span style={view1 == 'list' ? wormContainer : wormContainerCarousel } className="revealable activate-revealable">
                <img className="worm-image" src={props.src} style={props.wormID == viewID ? bigwormIMG: view1 == 'list' ? wormStyle : wormStyleCarousel} download onClick={(e) => viewThisWorm(props.wormID)} alt={props.name}></img>
                <div style={wormInfoContainer}>
                    <p style={Object.assign({},wormTitle, wormAttr)}>{props.name}</p>
                    <span style={nonTitleWormAttrs}>
                        <span>
                            <span>
                                <p style={wormAttr}>
                                    {props.author == 33 ? 'artist unknown.' : props.username}
                                </p>
                            </span>
                            <p style={wormAttr}>
                                <span style={italics}>
                                    c.a. {props.date.substring(0, props.date.indexOf('T'))} a.d.
                                </span>
                            </p>
                            
                        </span>
                        <span style={flexRowBet}>
                                {
                                    props.author == currentUser &&
                                    <a className="nav-button" href={props.src} download={props.name} tabindex="0" role="button" >Export Worm</a>
                                }
                                <span>
                                {
                                    props.author == currentUser && del_worm_pending == 'no' &&
                                    <button className="actually-link delete-worm-link nav-button" id={"delete-worm-link-" + props.wormID.toString()} onClick={() => deleteWormClick()} tabindex="0"  role="button" >Delete Worm</button>
                                }
                                {
                                    (del_worm_pending == 'yes' && props.wormID == del_pending_for ) &&
                                    <div id="favoriteWormLoader" className="loader">
                                        <div className="circle load1 whiteBG" />
                                        <div className="circle load2 whiteBG" />
                                        <div className="circle load3 whiteBG" />
                                    </div> 
                                }
                                {
                                    props.author == currentUser && del_worm_pending == 'no' &&
                                    <div className="hidden" id={"are-you-sure-delete-" + props.wormID.toString()}>
                                        <p style={red}>Are you certain?</p>
                                        <span style={areYouSureButtonSpan}>
                                            <button className="actually-link nav-button" onClick={() => deleteThisWorm()} tabindex="0" role="button"  >yes</button>
                                            <button className="actually-link nav-button" onClick={()=> neverMindDontDelete()} tabindex="0" role="button" >no</button>
                                        </span>
                                    </div>
                                } 
                            </span>
                        </span>
                        {
                            (fav_worm_pending == 'no' || props.wormID !== pending_favorite_for )&&
                            <span>
                                <span id="favBy">{props.favorited_by ? props.favorited_by.split(',').length - 1 : "0"}</span>
                                {
                                 (!props.favorited_by || props.favorited_by == null || props.favorited_by.length == 0 || props.favorited_by.split(',').indexOf(currentUser.toString()) < 0) &&
                                    <button className="nav-button" onClick={() => toggleFavorite()} tabindex="0" role="button" ><FavoriteBorder style={redOutline}  /></button>
                                }
                                {
                                     props.favorited_by && props.favorited_by.split(',').indexOf(currentUser.toString()) >= 0 &&
                                    <button onClick={() => toggleFavorite()} tabindex="0" role="button" className="nav-button"><Favorite style={redFill}  /></button>
                                }
                            </span>
                        }
                        {
                            (fav_worm_pending == 'yes' && props.wormID == pending_favorite_for ) &&
                            <div id="favoriteWormLoader" className="loader">
                                <div className="circle load1 whiteBG" />
                                <div className="circle load2 whiteBG" />
                                <div className="circle load3 whiteBG" />
                            </div> 
                        }
                    </span>
                </div>
            </span>
            }
        </div>
    );
};