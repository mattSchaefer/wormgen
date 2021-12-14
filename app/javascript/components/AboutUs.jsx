import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {changeSlide}  from '../features/about/aboutUsSlice';
import { activeSlide, playPause, verbiage } from '../features/about/aboutUsSlice';
export default function AboutUs(props){
    const active_slide = useSelector(activeSlide)
    const active_verbiage = useSelector(verbiage)
    const dispatch = useDispatch()
    const shade = {
        opacity: '.8',
    }
    const top = {
        zIndex: '20000',
        opacity: '.7',
        textAlign: 'center',
        fontSize: '5rem',
        color: '#eee',
        backgroundColor: 'black',
        borderRadius: '4px',
    }
    setTimeout(function(){
        active_slide == 'plant_trees' ? setTimeout(function(){dispatch(changeSlide({activeSlide: 'feed_hungry', verbiage: 'we dont feed the hungry'}))},10) 
        : active_slide == "feed_hungry" ? setTimeout(function(){dispatch(changeSlide({activeSlide: 'generate_worms', verbiage: 'we let you generate worms'}))},10)  
        : setTimeout(function(){dispatch(changeSlide({activeSlide: 'plant_trees', verbiage: 'we dont plant trees'}))},10) 
    },4000)
    return (
        <div id="aboutUs">
            <div className={active_slide}>
               <h2 style={top}>{active_verbiage}</h2> 
            </div>
        </div>
    )
}