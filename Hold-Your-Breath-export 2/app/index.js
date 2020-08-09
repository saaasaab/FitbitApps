//Display the hold breath button and nothing else
//Click and hold starts timer
//timer continues until release
//Stop timer
//Show time for 5 seconds
//have an arc that covers the outside of the watch face
//Save time to the settings

import document from "document";
import clock from "clock";
import * as util from "../common/utils";
import * as fs from "fs";
import { display } from "display";



let breathButton=document.getElementById("breathButton");
let actualButton=document.getElementById("actualButton");
let graph=document.getElementById("graph");
let home=document.getElementById("home");
let txt=document.getElementById("txt");
let graphScreen=document.getElementById("graphScreen");
let topTime=document.getElementById("topTime");
let bottomTime=document.getElementById("bottomTime");

let secs = 0;
let mins = 0;
let timerCount = 0;
let hold = false;
let timerCountInterval;
let data = [];


graph.onclick=function(){
  graph.style.display = "none";
  home.style.display = "inline";
  topTime.style.display = "inline";
  bottomTime.style.display = "inline";
  graphScreen.style.display = "inline";
  
  try{
    graphIt(data);
  }
  catch(err) {
    console.log(err);
  }
}

home.onclick=function(){
  graph.style.display="inline";
  home.style.display = "none";
  topTime.style.display = "none";
  bottomTime.style.display = "none";
  graphScreen.style.display = "none";
  let elems = document.getElementsByClassName('line');
  for (var i=0;i<elems.length;i+=1){
    elems[i].style.display = 'none';
  }
}

actualButton.onmousedown = function(e) {
  display.autoOff = false;
  display.on = true;
  breathButton.style.display = "none";
  txt.style.display = "inline";
  timerCountInterval = setInterval( increasetimerCount, 1000);
  graph.style.display = "none";
}

actualButton.onmouseup = function(e) {
  let time = (mins*60+timerCount);
  display.autoOff = true;
  display.on = true;
  actualButton.style.display = "none";
  clearInterval(timerCountInterval);
  if(time==0){
    breathButton.style.display = "inline";
    txt.style.display = "none";
    mins = 0;
    timerCount = 0;
    txt.text = timerCount;
    actualButton.style.display = "inline";
    graph.style.display = "inline";
  }
  else{
    timeout(13);

    let elems = document.getElementsByClassName('line');

    if(data.length == elems.length-1){
      data.shift();
    }
    data.push(time.toString());
  }
  //data=[];
  fs.writeFileSync("past_Breath_times.txt", data.toString(), "utf-8");
  
}

try {
  let time_read = fs.readFileSync("past_Breath_times.txt", "utf-8");
  data = time_read.split(",");
}

catch(err) {
  console.log(err);
}


function graphIt(data_raw){
  
  let data_num = [];
  for(let i = 0; i < data_raw.length; i++){
    data_num.push(parseFloat(data_raw[i]));
  }
  
  let linesG = [];
  let xOffset = 25;
  let yOffset = 25;
  
  let len = data_num.length;

  let xAxisInt = (325-xOffset*2)/len;

  let dataMin = min(data_num);
  let dataMax = max(data_num);
  
  printTime(topTime,dataMax % 60, parseInt(dataMax / 60));
  printTime(bottomTime,dataMin % 60, parseInt(dataMin / 60));

  setup(data_num);
  
  for(let i = 0; i < data_num.length-1; i++){
    linesG[i].style.display = "inline";
    linesG[i+1].style.display = "inline";
    linesG[i].x1 = xOffset+i*xAxisInt;
    linesG[i].x2 = xOffset+(i+1)*xAxisInt;
    linesG[i].y1 = mapY(data_num[i], dataMin, dataMax, 275,25);
    linesG[i].y2 = mapY(data_num[i+1], dataMin, dataMax, 275,25);
  }


  function setup(d){
    for (let i = 0; i < d.length; i++){
      let index = (i+1).toString();
      linesG.push(document.getElementById(index));
      linesG[i].style.display = "none";
    }
  }

  function max(array){
    let max = -Infinity;
    for(let i = 0; i < array.length;i++){
      if(array[i]>max){
        max = array[i]
      }
    }
    return max
  }

  function min(array){
    let min = Infinity;
    for(let i = 0; i < array.length;i++){
      if(array[i]<min){
        min = array[i]
      }
    }
    return min
  }

  function mapY(y, in_min, in_max, out_min, out_max) {
    return (y - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
}




function increasetimerCount(){
  timerCount++;
  //txt.text = timerCount;
  if (timerCount >= 60){
      mins++;
      timerCount = 0;
    }
  printTime(txt,timerCount, mins);
  
}

//setTimeout(function(){ timeout(15);console.log("Hello"); }, 3000);


function printTime(textElem,secs, mins){
  if (mins<1){
    textElem.text = `${secs}`;
  }
  else{
    secs = util.zeroPad(secs);
    textElem.text = `${mins}:${secs}`;
  }
}

function timeout(interval){
  
  let lines = []
  function setup(data){
    for (let i = 0; i < 4; i++){
      let index = (i+1).toString();
      lines.push(document.getElementById(index));
    }
  }

  let line1=document.getElementById("left");
  let line2=document.getElementById("bottom");
  let line3=document.getElementById("right");
  let line4=document.getElementById("top");
  
  line1.style.display = "inline";
  line2.style.display = "inline";
  line3.style.display = "inline";
  line4.style.display = "inline";
  
  line1.y= 10;
  line2.x= 10;
  line3.y = 0;
  line4.x = 0;


  let left = true;
  let bottom = false;
  let right = false;
  let top = false;

  var myVar = setInterval(smallifyLine, interval);
  
  function smallifyLine() {

    if(left){
      if (line1.y < 300){
        line1.y = line1.y+5;
      }
      else{
        left = false;
        bottom = true;
        myStopFunction();
      }
    }
    else if(bottom){
      if (line2.x < 300){
        line2.x = line2.x+5;
      }
      else{
        bottom = false;
        right = true;
        myStopFunction();
      }
    }
    else if(right){
      if (line3.y > -300){
        line3.y = line3.y-5;
      }
      else{
        right = false;
        top = true;
        myStopFunction();
      }
    }
    else if(top){
      if (line4.x > -300){
        line4.x = line4.x-5;
      }
      else{
        top = false;
        myStopFunction();
      }
    }
  }
  function myStopFunction() {
    if(left||bottom||right||top){
      myVar = setInterval(smallifyLine, interval)
    }
    else{
      breathButton.style.display = "inline";
      txt.style.display = "none";
      mins = 0;
      timerCount = 0;
      txt.text = timerCount;
      actualButton.style.display = "inline";
      graph.style.display = "inline";
    }
    
    clearInterval(myVar);
  }
}

