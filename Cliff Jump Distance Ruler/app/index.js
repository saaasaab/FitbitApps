import { Accelerometer } from "accelerometer";
import { display } from "display";
import document from "document";
import { Gyroscope } from "gyroscope";
import { HeartRateSensor } from "heart-rate";
import { OrientationSensor } from "orientation";

const sensors = [];
var start_jump_btn = document.getElementById("start_jump_btn");
let combined = 0;
let jumping = false;
let falling = false;
let fallThenStop = false;
var start;
var freefall_threshold = 2;
var milliseconds = 0;

start_jump_btn.text=("Press");

start_jump_btn.onclick = function(e) {
  jumping = true;
  let a = .3;
  console.log("here");
    start_jump_btn.text=a.toString()+' m';
  //start_jump_btn.style.display = "none";
}

if (Accelerometer) {
  // sampling at 1Hz (once per second)
  const accel = new Accelerometer({ frequency: 100 });
  accel.addEventListener("reading", () => {
    
    combined = Math.sqrt(accel.x*accel.x+accel.y*accel.y+accel.z*accel.z);
    
    if (combined < freefall_threshold){
        start = new Date().getTime();
      }
      
      //start_jump_btn.text=round(combined, 2);
      
     if (combined < freefall_threshold){
        milliseconds += 10;
        console.log(combined);
        falling = true;
      }
     if (falling && combined >= freefall_threshold){
       falling = false;
       jumping = false;
       var elapsed = new Date().getTime() - start;
       
       start_jump_btn.text=round(time_to_distance(milliseconds/1000),2).toString()+" m";
       console.log(milliseconds);
       console.log(time_to_distance(milliseconds/1000));
       milliseconds = 0;
       
     }

    //combined should be 0 in freefall
    
  });
  if (jumping){
    accel.start();
    
  }
}
function round(value, decimals) {
 return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}   

function time_to_distance(time) {
 return 0.5*9.81*time*time;
}   
