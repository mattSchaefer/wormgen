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
import { current_user, current_user_token, current_user_id, user_is_activated } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ListIcon from '@material-ui/icons/List';
import { view, pageStart, pageEnd, currentWormListFilter, saveWormRequestPending, saveWormRequestFinished  } from '../features/wormList/wormListSlice';
import { changeView, filterByFavorite, filterByCurrentUser, resetFilter, setSaveWormRequestPending } from '../features/wormList/wormListSlice';
import changeSlide  from '../features/about/aboutUsSlice';
import { activeSlide, playPause, verbiage } from '../features/about/aboutUsSlice';
import { animateScroll as scroll, scrollSpy, scroller, Events, Element, Link } from 'react-scroll';
import { LaptopWindowsTwoTone } from '@material-ui/icons';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { profile_user_is_activated } from '../features/userProfile/userProfileSlice';
import {verifyCreateWormRecaptcha} from '../features/reCaptcha/reCaptchaSlice';
import {reCaptchaState} from '../features/reCaptcha/reCaptchaSlice';

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
    boxShadow: "1px -3px 47px 0px rgba(233,218,218,0.75)",
    WebkitBoxShadow:"1px -3px 47px 0px rgba(233,218,218,0.75)",
    MozBoxShadow: "1px -3px 47px 0px rgba(233,218,218,0.75)",
    position: 'relative',
    top: "-20px",
    width: '100vw',
    padding: "15px",
    zIndex: '6',
    //background: "linear-gradient(to right, #de1245 0%, #ffbc15 100%)",
    color: "#eee",
    borderRadius: '7px',
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
    color: "white !important",
    textDecoration: "none !important",
    //backgroundImage: "linear-gradient(to right, #00d2ff 0%, #3a7bd5  51%, #00d2ff  100%)",
    padding: "5px",
    textAlign: "center",
    transition: "0.3s ease-in",
    backgroundSize: "200% auto",
    background: 'rgb(250, 226, 92)',
    borderRadius: "3px",
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
    const usr_active = useSelector(user_is_activated)
    const usr_prof_active = useSelector(profile_user_is_activated)
    const user_active = usr_active == 'yes' || usr_prof_active == 'yes' ? 'yes' : 'no'
    const rcaptcha_state = useSelector(reCaptchaState)
    const worm_currently_saving = useSelector(saveWormRequestPending)
    const worm_finished_saving = useSelector(saveWormRequestFinished)
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
                var ratio = 250 / scrollPos;
                var ratio_to_vh_limit_thirty_three = 33 / ratio
                
            }
            document.getElementById('mainImgBG').style.marginRight = scrollPos.toString() + 'px'
            // var sections = document.querySelectorAll('section')
            // for(var i = 0; i < sections.length; i++){
            //     var section_top = sections[i].getBoundingClientRect().top
            //     var section_id = sections[i].getAttribute('id')
            //     var scroll_show = 200
            //     var windowHeight = window.innerHeight;
            //     if(section_top < (windowHeight - scroll_show))
            //         sections[i].classList.add('activate-section')
            //     else
            //         sections[i].classList.remove('activate-section')
            //     console.log(section_id + ": " + section_top)
            // } 
            var revelables = document.querySelectorAll('.revealable')
            for(var i = 0; i < revelables.length; i++){
                var section_top = revelables[i].getBoundingClientRect().top
                var scroll_show = 50
                var windowHeight = window.innerHeight;
                if(section_top < (windowHeight - scroll_show))
                    revelables[i].classList.add('activate-revealable')
                else
                    revelables[i].classList.remove('activate-revealable')
            } 
            var a_note_section = document.getElementById('aNoteSection')
            var a_note_top = a_note_section.getBoundingClientRect().top
            var window_Height2 = window.innerHeight;
            var scroll_show_2 = 400
            if(a_note_top < (window_Height2 - scroll_show_2)){
                a_note_section.classList.add('aNoteSectionRevealed')
            }else{
                a_note_section.classList.remove('aNoteSectionRevealed')
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
            <div id="mainImgBG" className="mainImgBG flex-col">
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
                        <section id="aboutUsSection" className="revealable">
                            <AboutUs slide={active_slide} verbiage={active_verbiage} />
                            <Link spy={true} smooth={true} to="wormGallHead" duration={500} activeClass="active"></Link>
                        </section>
                        
                        <Element name="aboutUs"></Element>
                       
                        <hr />
                        <section className="revealable" id="whyWereHereSection">
                            <div>
                                <Element name="whyWereHere" id="whyWereHere"></Element>
                                <h2 id="whyWereHere" className="revealable" >What We Want</h2>
                                <p style={leftRem} className="revealable" >Here at wormcreate.com, we believe that the world needs more worms.  We aim to put the power in the hands of the people to make You an artist.  Our intent is to have as many as possible worms generated by you all, and for these worms to impose their presence across the metaverse. We aim to change the world through user-participatory-pier-to-host pseudo-randomly-contingent generative art.</p>
                            </div>
                            
                        </section>
                        <hr />
                        <section id="aNoteSection">
                            <div>
                               
                                <Element name="aNote" id="aNote"></Element>
                                <h2 id="aNote" className="revealable" >A Note from The Admin:</h2>
                                <h4 className="revealable"  style={Object.assign({}, leftRem)}>I do Consider Myself the <span style={note}>Johannes Gütenberg of Worm Generation</span>, the <span style={note}>Steve Jobs of Generated Worm Farming</span></h4>
                                <p className="revealable" style={Object.assign({}, leftTwoRem)}>The every-day average person deserves to harness the power of p5.js to generate aesthetically pleasing worms.  It is an essential truth, a given right.  That is why I followed like one or two p5.js guides and then created a variation of a simple program that is found in many 'how to p5' blog posts and put it on a Ruby on Rails application with a ReactJS front-end that utilizes Redux state management and Material-UI.  In fact I spent hardly any time on the p5 program itself.  The whole point of this is, for one, that I myself learn more about full stack development, and for two, to start a trend in which the developers of generative art make a fair effort to give others the ability to use and save the outputs of the programs they created, not only at a level for fellow-developers, but at a level for end-users alike.  It is time for this power of this art form to be in the hands of many.  If you are a creator of generative art I urge you to share your brush.</p>
                                <p className="revealable"  style={Object.assign({}, leftTwoRem)}>Do with this what you will, but remember: with great power comes great responsibility. </p>
                                <Link spy={true} smooth={true}  duration={500} activeClass="active"></Link>
                            </div>
                        </section>
                        <hr />
                        <section id="wormCreateection" style={flexCol}>
                            <div>
                                <Element id="tryIt" name="tryIt" to="wormGallHead"></Element>
                                <h2  className="revealable" style={tryItOut} id="tryIt">Farm Worms</h2>
                                <span style={generateWormsPContainer}>
                                    <p style={textCenter} className="revealable" >Just click or tap on the screen to start spawning a worm.  Hold down and drag.  Release to complete the worm.</p>
                                </span>
                                <WormCreator className="revealable"  dispatch={dispatch} currentUser={user} currentUserToken={token} currentUserId={userID} currentUserActivated={user_active} wormCreateCaptchaVerified={rcaptcha_state.createWorm.createWormRecaptchaVerified} wormCurrentlySaving={worm_currently_saving} wormFinishedSaving={worm_finished_saving} />
                                <div id="newWormContainer"></div>
                                <Link spy={true} smooth={true} duration={500} to="topOfPage" activeClass="active"></Link>
                            </div>
                        </section>
                        <hr />
                    </div>
                    <div>
                        <div>
                            <section id="wormGalSection">
                                <Element id="wormGallHead" name="wormGallHead" ></Element>
                               
                                <h2 className="revealable" style={wormGallaryHeader} id="wormGallHead">
                                    The Collection
                                    {
                                    !user_logged_in &&
                                        <p>Sign Up or Log On to have a look at the current state of The Collection</p>
                                    }
                                    <span style={viewIconsContainer}>
                                        <div id="wormListLoader" className="loader">
                                            <div className="circle load1 whiteBG" />
                                            <div className="circle load2 whiteBG" />
                                            <div className="circle load3 whiteBG" />
                                        </div>  
                                        <span style={spanPad} className="revealable" >
                                            <button className="btn-grad2 nav-button flx-btn" onClick={ (e) => dispatch(changeView('carousel', dispatch))} style={view1 != 'list' ? activeIcon : {}} tabindex="0"  role="button"><ViewCarouselIcon /></button>
                                            <button className="btn-grad2 nav-button flx-btn" onClick={ (e) => dispatch(changeView('list', dispatch)) } style={view1 == 'list' ? activeIcon : {} }  tabindex="0" role="button" ><ListIcon /></button>
                                        </span>
                                        <hr />
                                        <span style={spanPad} >
                                            <button className="btn-grad2 nav-button flx-btn" onClick={(e) => dispatch(filterByFavorite(document.getElementById("userID").value))} style={list_fil == "favorite" ? activeIcon : {}} tabindex="0" role="button"><FavoriteBorder /></button>
                                            <button className="btn-grad2 nav-button flx-btn" onClick={(e) => dispatch(filterByCurrentUser(document.getElementById("userID").value))} style={list_fil == "current_user" ? activeIcon : {}} tabindex="0"  role="button"><PersonOutlineSharpIcon /></button>
                                            {
                                                list_fil !== "none" &&
                                                <button className="btn-grad2 nav-button flx-btn" onClick={(e) => dispatch(resetFilter())} tabindex="0" role="button"><RotateLeftIcon /></button>
                                            }
                                        </span>
                                    </span>
                                </h2>
                                {
                                    user_logged_in &&
                                    <WormList />
                                }
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