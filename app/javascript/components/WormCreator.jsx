import React from 'react';
import WormList from './WormList';
import P5 from 'p5';
import { Button, Textfield } from '@material-ui/core';
import ReactDOM from 'react-dom';
import { fetchWorms } from '../features/wormList/wormListSlice';
import { useSelector } from 'react-redux';
import { current_user, current_user_token, current_user_id } from '../features/auth/authSlice';
import NewWormAttrs from './NewWormAttrs';
const homePageCanvas = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
}
const buttonContainer = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1.5em',
}
const saveWormButton = {
    width: "330px",
    marginTop: "-5px",
}
export function DispatchSavedWorm(props){
    const dispatch = useDispatch();
     dispatch(fetchWorms)
    return;
};
export default class WormCreator extends React.Component{
    constructor(props) {
      super(props)
      this.myRef = React.createRef()
      //this.myRef2 = React.createRef()
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
            const img = canvas.get();
            img.save(sketch.frameCount, '.png');
            console.log("saved image from sketch 2");
            console.log(img);
            var img2_url = img.canvas.toDataURL();
            this.pushWormToDB(img2_url);
            return img;
        };
        sketch.exportWorm = (e) => {
            sketch.saveCanvas();
        };
    }
    pushWormToDB(img_data){
        const url = "/api/v1/worms";
        const name = document.getElementById('new-worm-name').value || "untitled";
        //const user_id = current_user || 1;
        const options = {
            method: 'POST',
            body: JSON.stringify({
                name: name, 
                user_id: this.props.currentUserId,
                data_url: img_data
            }),
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        }
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                this.props.dispatch(fetchWorms)
            })
            .catch((e) => console.log(e))
    }
    componentDidMount() {
      this.myP5 = new P5(this.Sketch, this.myRef.current)
    }
    render() {
        return(
            <span>
                <div ref={this.myRef} style={homePageCanvas}></div>
                <div>
                    <NewWormAttrs user={this.props.currentUser} />
                    <span style={buttonContainer}>
                        <Button variant="contained" color="primary" style={saveWormButton} onClick={(e) => this.myP5.saveWorm(e)} id="saveWormButton">save worm</Button>
                        <Button variant="contained" color="primary" style={saveWormButton} onClick={(e) => this.myP5.exportWorm(e)} id="exportWormButton">export worm</Button>
                    </span>
                </div>
            </span>
        );
    }
}