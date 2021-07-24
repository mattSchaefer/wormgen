let remember_path = [];
console.log("hello");
var canvas;
function setup(){console.log('setup');canvas = createCanvas(400,400);canvas.position(0,0);background('black');};
function draw(){console.log('draw');background('black')};
// function setup() {
//   createCanvas(400, 400);
//    var randomColorBG1 = getRandomInt(255);
//     var randomColorBG2 = getRandomInt(255);
//     var randomColorBG3 = getRandomInt(255);
//       var randomColorBG1 = getRandomInt(255);
//    var randomColorBG2 = getRandomInt(255);
//     var randomColorBG3 = getRandomInt(255);
   
//     var randomColorDec = Math.random();
//     var bg_string = 'rgba('+randomColorBG1+','+randomColorBG2+','+randomColorBG3+ ',' + randomColorDec+')';
//   background(bg_string);
// }
//  var randomColorBG1 = getRandomInt(255);
//     var randomColorBG2 = getRandomInt(255);
//     var randomColorBG3 = getRandomInt(255);
//       var randomColorBG1 = getRandomInt(255);
//    var randomColorBG2 = getRandomInt(255);
//     var randomColorBG3 = getRandomInt(255);
//   var saved_bg = '';
//     var randomColorDec = Math.random();
//    var bg_string = 'rgba('+randomColorBG1+','+randomColorBG2+','+randomColorBG3+ ',' + randomColorDec+')';  var game_tick_pressed = 0;
// function draw() {var randomColorDec = Math.random();

 
//   if (mouseIsPressed) {
   
//     var randomColorBG1 = getRandomInt(255);
//    var randomColorBG2 = getRandomInt(255);
//     var randomColorBG3 = getRandomInt(255);
  
//     var randomColorDec = Math.random();
//    var bg_string = 'rgba('+randomColorBG1+','+randomColorBG2+','+randomColorBG3+ ',' + randomColorDec+')';
    
   
//     var opa_track = .2;
//      game_tick_pressed ++;
//     if(game_tick_pressed <= 1){
//       saved_bg = bg_string;
//       background(bg_string);
//     }else{background(saved_bg);}
    
//     for(var i = remember_path.length - 1; i >= remember_path.length - 350 && i >= 0; i--){
//       var random = Math.random() * 30 + 30;
//       var randomColor = getRandomInt(255) ;
//       var randomColorDec2 = Math.random();
//       var randomColorBG6 = getRandomInt(255);
//       var randomColorBG5 = getRandomInt(255);
//       var randomColorBG4 = getRandomInt(255);
//       var ranIntTo80 = getRandomInt(80)
      
//       var bg_string_2 = 'rgba('+randomColorBG4+','+randomColorBG5+','+randomColorBG6+ ',' + opa_track+')';
//       ellipse(remember_path[i]["mouseX"], remember_path[i]["mouseY"], opa_track*100, opa_track*100);
      
//       if(i % 20 == 0){
//         fill(bg_string_2);
        
//         opa_track += .1;
//       }
        
//       if(opa_track >= 1){
//         opa_track = 0;
//       }
//     }
//    var coords = {"mouseX": mouseX, "mouseY": mouseY};
//    remember_path.push(coords);
//    }else{remember_path=[];game_tick_pressed = 0;}
//  function mouseReleased(){
 
//     background(bg_string);
//   }

// }

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }