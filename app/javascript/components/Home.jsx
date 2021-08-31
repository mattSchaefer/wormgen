import React from 'react';
import { Link } from 'react-router-dom';
import P5 from 'p5';
import Login from './auth/Login';
import Header from './Header';
import WormList from './WormList';
import { Button, Textfield } from '@material-ui/core';
require('isomorphic-fetch');
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
      this.myRef2 = React.createRef()
      this.state = {
          savedCanvas: {},
          mouseX: 0,
          mouseY: 0,
          savedCanvasString: ''
      }
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
        var numberOfClickdownsOnCanvas = 0;
        var numberOfReleases = 0;
        var randomColorDec = Math.random();
        var bg_string = 'rgba('+randomColorBG1+','+randomColorBG2+','+randomColorBG3+ ',' + randomColorDec+')';  var game_tick_pressed = 0;
        sketch.draw = () => {
            var randomColorDec = Math.random();
            //need to keep track of number of clicks
            //if second mouseIsPressed(?) for the second time, only reset the worm if the mouse is inside the canvas
            
            var mouseInCanvas = ( sketch.mouseX > 0 && sketch.mouseX < 750 ) && ( sketch.mouseY > 0 && sketch.mouseY < 500)
            if (sketch.mouseIsPressed ) {
                
                //this.setState({mouseX: sketch.mouseX, mouseY: sketch.mouseY})
                if(mouseInCanvas && numberOfReleases > 1){numberOfReleases = 0;}
                if(mouseInCanvas && numberOfReleases < 1){

               
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
                }
                else{
                    
                    remember_path=[];
                    game_tick_pressed = 0;
                    numberOfClickdownsOnCanvas = 0;
                    numberOfReleases ++;
                    
                }        
        };
        sketch.saveWorm = (e) => {
            //e.preventDefault();
            const img = canvas.get();
            this.state.savedCanvas = img;
            img.save(sketch.frameCount, '.png');
            console.log("saved image from sketch 2");
            console.log(img);
            var img2_url = img.canvas.toDataURL();
            this.pushWormToDB(img2_url);
            //1-
            //this.myP52.copySketch1();
            
            //img.save(sketch.frameCount, '.png');
            //console.log(img);
            return img;
        }
        sketch.exportWorm = (e) => {
            sketch.saveCanvas();
        }
    }
    Sketch2 = (sketch2) => {
        sketch2.copySketch1 = () => {
            var canvas2 = sketch2.createCanvas(750, 500);
            var destCtx = canvas2.canvas.getContext('2d');
            destCtx.drawImage(this.state.savedCanvas.canvas, 0,0);
             console.log(destCtx);
             //1-
            //  const img2 = canvas2.get();
            //  img2.save(sketch2.frameCount, '.png');
            //  console.log("saved image from sketch 2");
            //  console.log(img2);
            //  var img2_url = img2.canvas.toDataURL();
            //  var imageObj = new Image();
            //  imageObj.src = img2_url;
            //  imageObj.id = "img-holder";
            // console.log(imageObj)
            //  document.getElementById('saveWormButton').append(imageObj);
             console.log("this.state.savedCanvas.canvas");
             var stringCvs = ''+(this.state.savedCanvas.canvas)+ '';
             console.log(''+(this.state.savedCanvas.canvas)+ '');
             console.log(img2.canvas.toDataURL());
        }
    }
    pushWormToDB(img_data){
        const url = "/api/v1/worms";
        const options = {
            method: 'POST',
            body: JSON.stringify({
                name: "untitled", 
                user_id: 1,
                data_url: img_data
               
            }),
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        }
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                var imageObj = new Image();
                imageObj.id = "img-holder";
                imageObj.src = img_data;
                document.getElementById('newWormContainer').append(imageObj);
            
            })
            .catch((e) => console.log(e))


    }
    
    componentDidMount() {
      this.myP5 = new P5(this.Sketch, this.myRef.current)
      this.myP52 = new P5(this.Sketch2, this.myRef2.current)
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
                        <p style={leftRem}>Here at wormcreate.com, we believe that the world needs more worms.  We aim to put the power in the hands of the people to make yourself an artist.  Our intent is to have as many as possible worms generated by you all, and for these worms to impose their presence across the metaverse.</p>
                        <hr />
                        <h2>A Note from The Creator of WormCreator</h2>
                        <h4 style={Object.assign({}, leftRem, note)}>{'>'}In Case You were Wondering, I do Consider Myself the 'Johannes Guetenberg of Generating Worms'</h4>
                        <p style={Object.assign({}, leftTwoRem, note)}>{'>'}The every-day average person deserves to harness the power of p5.js to generate aesthetically pleasing worms.  It is just, and a God-given right.  Generative art may be more cool and impressive, but user-generated art is more fun, and that is why I followed like one or two p5.js guides and then created a variation of a simple program that is found in many 'how to p5' blog posts and put it on a Ruby on Rails application with a React/Redux frot-end that uses Material-UI.</p>
                        <p style={Object.assign({}, leftTwoRem, note)}>{'>'}Do with this what you will, but remember: with great power comes great responsibility. </p>
                        <hr />
                        <h6>Try it out</h6>
                        <p style={leftRem}>Just click or tap on the screen to start creating a worm.  Hold down and drag.  Release to complete the worm.</p>
                        <span>mouseX: {this.state.mouseX}</span>
                        <span>mouseY: {this.state.mouseY}</span>
                        <div ref={this.myRef}>

                        </div>
                        <div ref={this.myRef2}>

                        </div>
                        <Button variant="contained" color="primary" style={saveWormButton} onClick={(e) => this.myP5.saveWorm(e)} id="saveWormButton">save worm</Button>
                        <Button variant="contained" color="primary" style={saveWormButton} onClick={(e) => this.myP5.exportWorm(e)} id="exportWormButton">export worm</Button>
                        <div id="newWormContainer"></div>
                    </div>


                    <div>
                        <h5>check out these user generated worms </h5>
                        <WormList />
                    </div>
                </div>
            </div>
        </div>
      )
    }
  }
