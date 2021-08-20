import React from 'react';
import { Link } from 'react-router-dom';
import P5 from 'p5';
import Login from './auth/Login';
import Header from './Header';
import { Button, Textfield } from '@material-ui/core';

const saveWormButton = {
    width: "500px",
    marginTop: "-5px",
}
const mainImgBG = {
    backgroundImage: "url('worm_27.png') !important",
}
const backgroundGrey = {
    backgroundColor: '#232d3d',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
}
const popCard = {
    margin: "-60px 30px 0px",
    boxShadow: "0 15px 26px 2px rgb(0 0 0 / 13%), 0 7px 31px 5px rgb(0 0 0 / 11%), 0 8px 10px -5px rgb(0 0 0 / 19%)",
    position: 'relative',
    top: "-20px",
    width: 'fit-content',
    padding: "15px",
    zIndex: '6',
    background: "#eee",
    borderRadius: '7px',
    width: '66%',
}
const note = {
    fontStyle: 'italic',
    color: 'rgb(35, 45, 61)',
}
const fiftyWidth = {width: '50%',}
const leftRem = {marginLeft: '1rem',}
const leftTwoRem = {marginLeft: '2rem',}
export default class Home extends React.Component {
    constructor(props) {
      super(props)
      this.myRef = React.createRef()
    }
    
    Sketch = (sketch) => {
  
        let x = 100;
        let y = 100;
        let remember_path = [];
        var canvas;
        function getRandomInt(max){
            return Math.floor(Math.random() * max);
        }
        sketch.setup = () => {
            canvas = sketch.createCanvas(750, 500);
            var randomColorBG1 = getRandomInt(255);
            var randomColorBG2 = getRandomInt(255);
            var randomColorBG3 = getRandomInt(255);
            var randomColorBG1 = getRandomInt(255);
            var randomColorBG2 = getRandomInt(255);
            var randomColorBG3 = getRandomInt(255);
        
            var randomColorDec = Math.random();
            var bg_string = 'rgba('+randomColorBG1+','+randomColorBG2+','+randomColorBG3+ ',' + randomColorDec+')';
            sketch.background(bg_string);
        };
        var randomColorBG1 = getRandomInt(255);
        var randomColorBG2 = getRandomInt(255);
        var randomColorBG3 = getRandomInt(255);
        var randomColorBG1 = getRandomInt(255);
        var randomColorBG2 = getRandomInt(255);
        var randomColorBG3 = getRandomInt(255);
        var saved_bg = '';
        var randomColorDec = Math.random();
        var bg_string = 'rgba('+randomColorBG1+','+randomColorBG2+','+randomColorBG3+ ',' + randomColorDec+')';  var game_tick_pressed = 0;
        sketch.draw = () => {
            var randomColorDec = Math.random();
            if (sketch.mouseIsPressed) {
               
                var randomColorBG1 = getRandomInt(255);
                var randomColorBG2 = getRandomInt(255);
                var randomColorBG3 = getRandomInt(255);
                var randomColorDec = Math.random();
                var bg_string = 'rgba('+randomColorBG1+','+randomColorBG2+','+randomColorBG3+ ',' + randomColorDec+')';
                var opa_track = .2;
                game_tick_pressed ++;
                if(game_tick_pressed <= 1){
                    saved_bg = bg_string;
                    sketch.background(bg_string);
                }else{
                    sketch.background(saved_bg);
                }
                for(var i = remember_path.length - 1; i >= remember_path.length - 550 && i >= 0; i--){
                    var random = Math.random() * 30 + 30;
                    var randomColor = getRandomInt(255) ;
                    var randomColorDec2 = Math.random();
                    var randomColorBG6 = getRandomInt(255);
                    var randomColorBG5 = getRandomInt(255);
                    var randomColorBG4 = getRandomInt(255);
                    var ranIntTo80 = getRandomInt(80)
                    var bg_string_2 = 'rgba('+randomColorBG4+','+randomColorBG5+','+randomColorBG6+ ',' + opa_track+')';
                    sketch.ellipse(remember_path[i]["mouseX"], remember_path[i]["mouseY"], opa_track*100, opa_track*100);
                    if(i % 20 == 0){
                        sketch.fill(bg_string_2);
                        opa_track += .1;
                    }
                    if(opa_track > 1){
                        opa_track = 0;
                    }
                }
                var coords = {"mouseX": sketch.mouseX, "mouseY": sketch.mouseY};
                    remember_path.push(coords);
                }
                else{
                    remember_path=[];
                    game_tick_pressed = 0;
                }        
        };
        sketch.saveWorm = (e) => {
      
            e.preventDefault();
            const img = canvas.get() ;
            img.save(sketch.frameCount, '.png');
            console.log(img);
            sketch.saveCanvas(canvas, 'worm', '.png');  
            return img ;
        }
    }
    
    componentDidMount() {
      this.myP5 = new P5(this.Sketch, this.myRef.current)
    }
    
  
    render() {
      return ( 
        <div >
            <div className="mainImgBG flex-col">
             <Header />
            </div>
            <div style={backgroundGrey}>
                <div style={popCard}>
                    <Login />
                    <hr />
                    <div style={fiftyWidth}>
                        <h2>About us</h2>
                        <p style={leftRem}>We don't plant trees, or feed starving children.  We just let you generate worms.</p>
                        <hr />
                        <h2>Mission Statement</h2>
                        <p style={leftRem}>Here at wormcreate.com, we believe that the world needs more friendly worms created by humans.  We aim to put the power in the hands of the people, to make yourself an artist.  Our intent is to have as many as possible worms generated by you all, and for these worms to impose their presence across the metaverse, maybe one day the universe as well.</p>
                        <hr />
                        <h2>A Note from The Creator of WormCreator</h2>
                        <h4 style={Object.assign({}, leftRem, note)}>{'>'}In Case You were Wondering, I do Consider Myself the 'Johannes Guetenberg of Generating Worms'</h4>
                        <p style={Object.assign({}, leftTwoRem, note)}>{'>'}The every-day average person deserves to harness the power of p5.js to generate aesthetically pleasing worms.  It is just, and a God-given right.  I'm tired of all these hipster p5.js experts making cool shit that is only controllable by themselves.  It's kind of sick, when you think about it, and that is why I followed like one or two p5.js guides and created a variation of a simple program that is found in many 'how to p5' blog posts and put it on a Ruby on Rails application with a React/Redux frot-end that uses Material-UI.</p>
                        <p style={Object.assign({}, leftTwoRem, note)}>{'>'}Do with this what you will, but remember: with great power comes great responsibility. </p>
                        <hr />
                        <h6>What's this?'</h6>
                        <p style={leftRem}>Just click or tap on the screen to start creating a worm.  Hold down and drag.  Release to complete the worm.</p>
                        <div ref={this.myRef}>
                
                        </div>
                        <Button variant="contained" color="primary" style={saveWormButton} onClick={(e) => this.myP5.saveWorm(e)}>save worm</Button>
                    </div>
                </div>
            </div>
        </div>
      )
    }
  }
