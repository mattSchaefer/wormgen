import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useEffect, useSelector } from 'react-redux';
import { changePage } from '../features/wormList/wormListSlice';
import { animateScroll as scroll, scrollSpy, scroller, Events, Element, Link } from 'react-scroll';
import { view, current_page } from '../features/wormList/wormListSlice';
const paginationButton = { }
const currentPageSpan = {color: '#eee',}
const carouselPaginateSpan = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
}
const activePage = {
    height: "fit-content", 
    color: "black !important",
    textDecoration: "none !important",
    //backgroundImage: "linear-gradient(to right, #00d2ff 0%, #3a7bd5  51%, #00d2ff  100%)",
    padding: "5px",
    textAlign: "center",
    transition: "0.3s ease-in",
    backgroundSize: "200% auto",
    background: 'rgb(250, 226, 92)',
    borderRadius: "3px",
}
const pageButton = {
    transition: '.3s ease-out',
    color: 'white',
}
const listPaginateSpan = {
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'none',
    backgroundSize: '',
}
export default function(props){ 
    var num_pages = props.total_pages
    const dispatch = useDispatch()
    const wormListView = useSelector(view)
    var currentWormPage = useSelector(current_page)
    var curr_worm_min_1 = currentWormPage - 1
    var curr_worm_plus_1 = currentWormPage + 1
    var pagination_buttons = []
    var pagination_button_indexes = []
    for(var i = 1; i < num_pages; i++){
        pagination_button_indexes.push(i)
    }
    if(pagination_button_indexes.length > 0 && wormListView == 'list'){
        pagination_buttons = pagination_button_indexes.map((index)=>
            <Button className="btn-grad2 revealable list-btn" key={index} onClick={() => changeThePageAndScroll(index)} style={index == currentWormPage ? activePage : pageButton} tabindex="0" role="button" onFocus={() => revealPageButtons()} >{index}</Button>
        )
    }else{
        pagination_buttons = [
            <Button className="btn-grad2" onClick={() => changeThePageAndScroll(curr_worm_min_1)} style={paginationButton}>{'<<<'}</Button>,
            <Button className="btn-grad2" onClick={() => changeThePageAndScroll(curr_worm_plus_1)} style={paginationButton}>{'>>>'}</Button>
        ]
    }
    function changeThePageAndScroll(index){
        var options = {
            smooth: 'easeInOutQuint',
            duration: 336,
            delay: 75,
            offset: -65,
            isDynamic: true
        }
       dispatch(changePage(index))
       if(wormListView == 'list')
            setTimeout(() => scroller.scrollTo("wormGallHead", options), 100)
    }
    function revealPageButtons(){
        var btns = document.getElementsByClassName('list-btn')
        for(var i = 0; i < btns.length; i++){
            btns[i].classList.add('activate-revealable')
        }
        
    }
    return(
        <span>
            <span style={wormListView == 'list' ? listPaginateSpan : carouselPaginateSpan }>
                {wormListView == 'list' && props.total_pages > 0 && pagination_buttons}
                {wormListView != 'list' && props.total_pages > 0 && pagination_buttons}
            </span>
            
            
        </span>
    )
}