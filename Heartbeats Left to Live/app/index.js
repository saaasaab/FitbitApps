
/*TODO
1. Need to also track the time the device is stopped
2. Track the BPS at close time
3. Calculate the numbers of beats that passed during the down time
*/

import document from "document";
import * as fs from "fs";

import { display } from "display";
import { user } from "user-profile";
import { HeartRateSensor } from "heart-rate";

let spb = 1;
let bpm = 60;
var lastTime;

const sensors = [];

let heartImage = document.getElementById("heartImage");
let beats = document.getElementById("beats");
var animate = document.getElementById("animate");
var demoinstance = document.getElementById("demoinstance");
let heartbeats_remaining;

try {
  let time_read = fs.readFileSync("settings_time.txt", "utf-8");
  let beats_read = fs.readFileSync("settings_beats.txt", "utf-8");
 
  lastTime = parseFloat(time_read);
  let time_elapsed = Math.round((new Date().getTime()-lastTime)/1000);
  heartbeats_remaining = parseFloat(beats_read.replace(/,/g, ''))-time_elapsed;
  
}
catch(err) {
  heartbeats_remaining = 3363840000 - 42048000*user.age;
  lastTime = new Date().getTime();
}
//heartbeats_remaining = 3363840000 - 42048000*user.age

if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: .5 });
  hrm.addEventListener("reading", () => {
    spb = 60/hrm.heartRate;
    bpm = hrm.heartRate
    
  });
  sensors.push(hrm);
  hrm.start();
} else {

}


// Animate after a 5 second delay
setInterval(function() {
  animate.to = map_number(bpm,60,180,0,-1);
  demoinstance.animate("enable"); // Specify the name of the event to trigger
}, spb*1000);

setInterval(function() {
  heartbeats_remaining =heartbeats_remaining- 1/spb;
  beats.text = numberWithCommas(Math.round(heartbeats_remaining));
 
  }, 1000);

display.addEventListener("change", () => {
  // Automatically stop all sensors when the screen is off to conserve battery
  display.on ? sensors.map(sensor => sensor.start()) : sensors.map(sensor => sensor.stop());
  if (!display.on){
    let beats_data = Math.round(heartbeats_remaining).toString();
    let time_data = new Date().getTime().toString();
    
    fs.writeFileSync("settings_time.txt", time_data, "utf-8");
    fs.writeFileSync("settings_beats.txt", beats_data, "utf-8");
  }
  
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function map_number(x,in_min,in_max, out_min, out_max){
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
