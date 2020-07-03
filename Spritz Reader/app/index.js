/*
 * Entry point for the watch app
 */
import document from "document";

let text = "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time tozz get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me"
text = text.split("—").join(" ");

var res = text.split(' ');

import { me as device } from "device";
if (!device.screen) device.screen = { width: 348, height: 250 };

//console.log(`Dimensions: ${device.screen.width}x${device.screen.height}`);


let demotext = document.getElementById("demotext");
let myButton = document.getElementById("myButton");
let slider = document.getElementById("slider");
let line = document.getElementById("line");
let slider_circle = document.getElementById("slider_circle");

let index = 0;
let down = false
let showSpeed = true;
var intervalId;
var intervalIdSlider;
var speed = 200;
let in_min = 15;
let in_max = device.screen.height-15;
let out_min = 400;
let out_max = 50;


slider.onmousemove = function(evt) {
  slider_circle.cy=evt.screenY;
  speed = map_speed(evt.screenY);
  
  demotext.text = Math.floor(1/speed*1000*60)+" WPM";
};


myButton.onmousedown = function(evt) {
  showSpeed = false;
  slider.style.display =  "none";
  slider_circle.style.display =  "none";
  line.style.display =  "none";
  intervalId = setInterval(advance_text, speed);
  };

myButton.onmouseup = function(evt) {
  slider.style.display =  "inline";
  slider_circle.style.display = "inline";
  line.style.display = "inline";
  showSpeed = true;
  clearInterval(intervalId);
};

function change_speed(evt) {
  slider_circle.cy=evt.screenY
}

function advance_text() {
  demotext.text = res[index];
  index++;
}

function map_speed(x){
  return Math.floor((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
}



