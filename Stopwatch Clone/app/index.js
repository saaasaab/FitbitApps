import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

let container = document.getElementById("container");

let currentIndex = container.value;

clock.granularity = "seconds";


// Get a handle on the <text> element
const myLabel = document.getElementById("myClock");
let stopwatch = document.getElementById("startStopwatch");
let reset = document.getElementById("reset");
// Update the <text> element every tick with the current time
let secs = 0;
let mins = 0;
let playStopwatch = false;
let showReset = false;
stopwatch.onclick = function(e) {
  playStopwatch = playStopwatch ? false : true;
  stopwatch.href = playStopwatch ? "icons/btn_combo_pause_press_p.png" : "icons/btn_combo_play_press_p.png";
}

reset.onclick = function(e) {
  
  secs = 0;
  mins = 0;
  //reset.style.display = "inline";
  printTime(secs, mins);
  console.log(playStopwatch);
  reset.style.display = "none";
}
    
clock.ontick = (evt) => {
  if (!playStopwatch && secs*mins+secs>0){
    reset.style.display = "inline";
  }
  if (playStopwatch){
    secs++;
    if (secs >= 60){
      mins++;
      secs = 0;
    }
    printTime(secs, mins)

  }
  
}

function printTime(secs, mins){
  if (mins<1){
    myLabel.text = `${secs}`;
  }
  else{
    secs = util.zeroPad(secs);
    myLabel.text = `${mins}:${secs}`;
  }
}
// Set the selected index
container.value = 0; // jump to first slide

container.onmousemove = function(evt) {
  currentIndex = container.value;
  //console.log(currentIndex);
};