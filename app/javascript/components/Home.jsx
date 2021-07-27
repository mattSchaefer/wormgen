import React from 'react';
import { Link } from 'react-router-dom';
import P5 from 'p5';
// import './bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/popper.min.js';
// global.jQuery = require('jquery');
// require('bootstrap');

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
        sketch.setup = () => {
            canvas = sketch.createCanvas(500, 500);
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
        function getRandomInt(max){
            return Math.floor(Math.random() * max);
        }
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
        <div>
            <div ref={this.myRef}>
    
            </div>
            <button onClick={(e) => this.myP5.saveWorm(e)}>save worm</button>
        </div>
      )
    }
  }
