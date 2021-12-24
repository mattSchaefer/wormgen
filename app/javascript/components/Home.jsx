import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Header from './Header';
import Footer from './Footer';
import WormList from './WormList';
import Worm from './Worm';
import AboutUs from './AboutUs';
import { Button, Textfield } from '@material-ui/core';
import Earth from 'images/earth_icon.png';
import { useStore } from 'react-redux';
import store from '../store/store';
import { createStore } from 'redux';
import WormCreator from './WormCreator';
import { fetchWorms } from '../features/wormList/wormListSlice';
import { current_user, current_user_token, current_user_id } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ListIcon from '@material-ui/icons/List';
import { view, pageStart, pageEnd, currentWormListFilter } from '../features/wormList/wormListSlice';
import { changeView, filterByFavorite, filterByCurrentUser, resetFilter } from '../features/wormList/wormListSlice';
import changeSlide  from '../features/about/aboutUsSlice';
import { activeSlide, playPause, verbiage } from '../features/about/aboutUsSlice';
import { animateScroll as scroll, scrollSpy, scroller, Events, Element, Link } from 'react-scroll';
import { LaptopWindowsTwoTone } from '@material-ui/icons';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

require('isomorphic-fetch');
const mainImgBG = {
    backgroundImage: "url('worm_27.png') !important",
}
const backgroundGrey = {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
}
const popCard = { 
    margin: "-60px 30px 0px",
    boxShadow: "1px -3px 47px 0px rgba(233,218,218,0.75)",
    WebkitBoxShadow:"1px -3px 47px 0px rgba(233,218,218,0.75)",
    MozBoxShadow: "1px -3px 47px 0px rgba(233,218,218,0.75)",
    position: 'relative',
    top: "-20px",
    width: 'fit-content',
    padding: "15px",
    zIndex: '6',
    //background: "linear-gradient(to right, #de1245 0%, #ffbc15 100%)",
    color: "#eee",
    borderRadius: '7px',
    width: '66%',
    fontWeight: '600',
}
const note = {
    fontStyle: 'italic',
    
}
const fiftyWidth = {width: '50%',}
const leftRem = {marginLeft: '1rem', color: '#eee', width: "70%",}
const leftTwoRem = {marginLeft: '2rem', color: '#eee', width: "70%",}
const wormGallaryHeader = {
    textAlign: 'center',
    marginBottom: '6rem',
}
const flexCol = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}
const textCenter = {
    textAlign: 'center',
    width: '67%',
}
const flexRow = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
}
const aboutHr = {
    color: "#eee",
    height: "1px",
    border: "1px solid #eee",
    width: "50%",
}
const generateWormsPContainer = {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
}
const aboutUsHeader = {
    marginBottom: '2.5em',
}
const tryItOut = {
    fontSize: '3.5rem',
    textAlign: 'center',
}
const sectionsDiv = {
}
const viewIconsContainer = {
    position: 'absolute',
    right: '10rem',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}
const activeIcon = {
    borderBottom: '1px solid',
}
const spanPad = {
    paddingLeft: '5px',
    paddingRight: '5px',
}
export default function Home(props){
    const dispatch = useDispatch()
    const user = useSelector(current_user)
    const token = useSelector(current_user_token)
    const userID = useSelector(current_user_id)
    const user_logged_in = user != 'anon' && token.length > 0
    const user_profile_view = false;//useSelector()
    const wormID = props.wormID
    const pageStart1 = useSelector(pageStart)
    const pageEnd1 = useSelector(pageEnd)
    const active_slide = useSelector(activeSlide)
    const active_verbiage = useSelector(verbiage)
    const list_fil = useSelector(currentWormListFilter)
    var view1 = useSelector(view)
    var last_scroll_top = 0
    var last_scroll_bottom = 2000
    var last_scroll_target = "topOfPage"
    var scroll_direction = 'n/a';

    useEffect(()=>{
        var window_height = document.documentElement.scrollHeight
        var scrollPos = 0;
        const DEPTH = window_height / 3
        const BUFFER = 100
        window.addEventListener('scroll', function(){
            if(scrollPos >=250 && !document.getElementById('header-bar').classList.contains('stickToTop')){
                document.getElementById('header-bar').classList.add('stickToTop')
            }else if(scrollPos < 250 && document.getElementById('header-bar').classList.contains('stickToTop')){
                document.getElementById('header-bar').classList.remove('stickToTop')
            }
            if ((document.body.getBoundingClientRect()).top > scrollPos){
                // scroll_direction = 'up'
                // var pos = Math.abs(scrollPos)
                // if(pos > DEPTH && pos < DEPTH + BUFFER){
                //     scroll.scrollTo(0)
                // }else if(pos > DEPTH * 2 && pos < (DEPTH * 2) + BUFFER){
                //     scroll.scrollTo(DEPTH + BUFFER)
                // }
                // else if(pos > DEPTH * 3 && pos < (DEPTH * 3) + BUFFER){
                //     scroll.scrollTo((DEPTH * 2) + BUFFER)
                // }
                // else if(pos > DEPTH * 4 && pos < (DEPTH * 4) + BUFFER){
                //     scroll.scrollTo((DEPTH * 3) + BUFFER)
                // }
                // else if(pos > DEPTH * 5 &&pos < (DEPTH * 5) + BUFFER){
                //     scroll.scrollTo((DEPTH * 4) + BUFFER)
                // }
                // else if(pos > DEPTH * 6 &&pos < (DEPTH * 6) + BUFFER){
                //     scroll.scrollTo((DEPTH * 5) + BUFFER)
                // }
                // else if(pos > DEPTH * 7 &&pos < (DEPTH * 7) + BUFFER){
                //     scroll.scrollTo((DEPTH * 6) + BUFFER)
                // }
            }
            else{
                //  scroll_direction = 'down'
                // var pos = Math.abs(scrollPos)
                // if(pos > DEPTH && pos < DEPTH + BUFFER){
                //     scroll.scrollTo((DEPTH) + (BUFFER*2))
                // }else if(pos > DEPTH * 2 && pos < (DEPTH * 2) + BUFFER){
                //     scroll.scrollTo((DEPTH * 2) + (BUFFER *2))
                // }
                // else if(pos > DEPTH * 2.8 && pos < (DEPTH * 2.8) + BUFFER){
                //     scroll.scrollTo((DEPTH * 3) + (BUFFER *2))
                // }
                // else if(pos > DEPTH * 4 && pos < (DEPTH * 4) + BUFFER){
                //     scroll.scrollTo((DEPTH * 5) - BUFFER)
                // }
                // else if(pos > DEPTH * 5 &&pos < (DEPTH * 5) + BUFFER){
                //     scroll.scrollTo((DEPTH * 6) - BUFFER)
                // }
                // else if(pos > DEPTH * 6 &&pos < (DEPTH * 6) + BUFFER){
                //     scroll.scrollTo((DEPTH * 7) - BUFFER)
                // }
                
            }
            scrollPos = Math.abs((document.body.getBoundingClientRect()).top);
           
            //console.log(scroll_direction)
        });
    })
    //function setScrollDirection(direction){scroll_direction=direction}
    function smoothTheScroll(){
        event.preventDefault()
            setTimeout(function(){
                var options = {smooth: true, containerId: 'tryIt'}
                const position = document.documentElement.scrollTop
                const bottom = document.documentElement.scrollBottom
                const height = document.documentElement.scrollHeight
                const y_offset = Window.pageYOffset || document.documentElement.scrollTop
                //console.log(position)
                const depth = 500;
                // if(position < depth){scroll.scrollTo(depth)}
                // else if(position < depth * 2){scroll.scrollTo(depth * 2)}
                // else if(position < depth * 3){scroll.scrollTo(depth * 3)}
                // else if(position < depth * 4){scroll.scrollTo(depth * 4)}
                // else if(position < depth * 5){scroll.scrollTo(depth * 5)}
                
                if(y_offset > last_scroll_top){
                    setScrollDirection('down')
                    // if(position < depth){scroll.scrollTo(depth)}
                    // else if(position < depth * 2){scroll.scrollTo(depth * 2)}
                    // else if(position < depth * 3){scroll.scrollTo(depth * 3)}
                    // else if(position < depth * 4){scroll.scrollTo(depth * 4)}
                    // else if(position < depth * 5){scroll.scrollTo(depth * 5)}
                }else{
                    setScrollDirection('up')
                    // if(position < depth){scroll.scrollTo(0)}
                    // else if(position < depth * 2){scroll.scrollTo(depth)}
                    // else if(position < depth * 3){scroll.scrollTo(depth * 2)}
                    // else if(position < depth * 4){scroll.scrollTo(depth * 3)}
                    // else if(position < depth * 5){scroll.scrollTo(depth * 4)}
                } 
                last_scroll_top = y_offset <= 0 ? 0 : y_offset; 
            // window.removeEventListener('scroll', smoothTheScroll)
            // window.setTimeout(function(){window.addEventListener('scroll', smoothTheScroll)},30)
                //console.log(scroll_direction)
            },25)
            
        
        // last_scroll_bottom = bottom
       
        // 
    }
    //window.addEventListener('scroll', smoothTheScroll)
    
    const tiltWormStart = {
        transform: 'skew(0, -8deg)',
    }
    const tiltWormEnd = {
        transform: "skew(0, 8deg)",
    }
    function scrollToTop(){
        scroll.scrollToTop();
    }
    function afterANoteActive(){
        var options = {smooth: true, containerId: 'tryIt'}
        const position = document.documentElement.scrollTop
        const bottom = document.documentElement.scrollBottom
        const height = document.documentElement.scrollHeight
        const y_offset = Window.pageYOffset || document.documentElement.scrollTop
        const depth = 500
        if(y_offset > last_scroll_top){
            console.log('down')
            scroll.scrollTo('wormGallHead',{smooth:true,duration:500, delay: 50})
        }else{
            scroll.scrollTo('topOfPage',{smooth:true,duration:500, delay: 50})
        } 
        last_scroll_top = y_offset <= 0 ? 0 : y_offset
        
        //scroll.scrollMore(500,{smooth:true,duration:500, delay: 50})
        //scroll.scrollMore(0)

    }
      return ( 
        <div style={wormID == pageStart1 ? tiltWormStart : wormID == pageEnd1 ? tiltWormEnd : {}} id="topOfPage">
           
            <Element name="topOfPage" ></Element> 
            <div className="mainImgBG flex-col">
             <Header />
            </div>
            <div style={backgroundGrey}>
                <div style={popCard}>
                    <Login />
                    <hr />
                    <div>
                        {
                            user_logged_in && user_profile_view &&
                            <section>
                                <UserProfile></UserProfile>
                            </section>
                        }
                        <section>
                            <AboutUs slide={active_slide} verbiage={active_verbiage} />
                            <Link spy={true} smooth={true} to="wormGallHead" duration={500} activeClass="active"></Link>
                        </section>
                        
                        <Element name="aboutUs"></Element>
                       
                        <hr />
                        <section>
                            <div>
                                <Element name="whyWereHere" id="whyWereHere"></Element>
                                <h2 id="whyWereHere">Our Mission</h2>
                                <p style={leftRem}>Here at wormcreate.com, we believe that the world needs more worms.  We aim to put the power in the hands of the people to make You an artist.  Our intent is to have as many as possible worms generated by you all, and for these worms to impose their presence across the metaverse.</p>
                            </div>
                            
                        </section>
                        <hr />
                        <section>
                            <div>
                               
                                <Element name="aNote" id="aNote"></Element>
                                <h2 id="aNote">A Note from The Admin:</h2>
                                <h4 style={Object.assign({}, leftRem)}>For the Case in which You were Wondering, I do Consider Myself the <span style={note}>Johannes Gütenberg of Generating Worms</span>, the <span style={note}>Steve Jobs of Generated Worm Farming</span></h4>
                                <p style={Object.assign({}, leftTwoRem)}>The every-day average person deserves to harness the power of p5.js to generate aesthetically pleasing worms.  It is a simple fact.  That is why I followed like one or two p5.js guides and then created a variation of a simple program that is found in many 'how to p5' blog posts and put it on a Ruby on Rails application with a React/Redux frot-end that uses Material-UI.</p>
                                <p style={Object.assign({}, leftTwoRem)}>Do with this what you will, but remember: with great power comes great responsibility. </p>
                                <Link spy={true} smooth={true}  duration={500} activeClass="active"></Link>
                            </div>
                        </section>
                        <hr />
                        <section style={flexCol}>
                            <div>
                                <Element id="tryIt" name="tryIt" to="wormGallHead"></Element>
                                <h2 style={tryItOut} id="tryIt">Generate Worms</h2>
                                <span style={generateWormsPContainer}>
                                    <p style={textCenter}>Just click or tap on the screen to start spawning a worm.  Hold down and drag.  Release to complete the worm.</p>
                                </span>
                                <WormCreator dispatch={dispatch} currentUser={user} currentUserToken={token} currentUserId={userID} />
                                <div id="newWormContainer"></div>
                                <Link spy={true} smooth={true} duration={500} to="topOfPage" onSetActive={console.log('wormCreatorlink active...')} activeClass="active"></Link>
                            </div>
                        </section>
                        <hr />
                    </div>
                    <div>
                        <div>
                            <section>
                                <Element id="wormGallHead" name="wormGallHead" ></Element>
                                <h2 style={wormGallaryHeader} id="wormGallHead">
                                    Worm Gallary
                                    <span style={viewIconsContainer}>
                                        <span style={spanPad}>
                                            <ViewCarouselIcon onClick={ (e) => dispatch(changeView('carousel', dispatch))} style={view1 != 'list' ? activeIcon : {}} />
                                            <ListIcon onClick={ (e) => dispatch(changeView('list', dispatch)) } style={view1 == 'list' ? activeIcon : {} }  />
                                        </span>
                                        <hr />
                                        <span style={spanPad} >
                                            <FavoriteBorder onClick={(e) => dispatch(filterByFavorite(document.getElementById("userID").value))} style={list_fil == "favorite" ? activeIcon : {}} />
                                            <PersonOutlineSharpIcon onClick={(e) => dispatch(filterByCurrentUser(document.getElementById("userID").value))} style={list_fil == "current_user" ? activeIcon : {}} />
                                            {
                                                list_fil !== "none" &&
                                                <RotateLeftIcon onClick={(e) => dispatch(resetFilter())} />
                                            }
                                        </span>
                                    </span>
                                </h2>
                                <WormList />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <Element id="footer" name="footer" ></Element>
            <Footer />
        </div>
      );
  }