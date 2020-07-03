/*
 * TALLY COUNTER
 */

/*TODO: 
1. Implement multiplier settings
2. Include Restart Button
3. Customize Color
*/

import document from "document";

let btn_tally = document.getElementById("btn_tally_none");
let txt = document.getElementById("txt");
let btn_reset = document.getElementById("btn_reset");

let tally_count = 0;

let lines = [];
let limit = 110;
let hundreds = 0;
let multiple = 1;
let base = 10;
let offsetX=10;
let offsetY=10;
let line_length=47;
let current_count = 0;

setup();

for (let i = 0; i < lines.length; i++){
  if(i<55){
    if(i>0 && i%5==0){
       offsetX = offsetX + base+ line_length;
   }
  
   if(i>0 && i%25==0){
      offsetX = base;
      offsetY = offsetY + base + line_length;
    }
  }
  else if(i==55){
    offsetX = offsetX + base*4+ line_length*4;
  }
  else if (i==60){
    offsetX = base;
    offsetY = offsetY + base + line_length;      
  }
  else if(i>60){  
   if(i%5==0){
       offsetX = offsetX + base+ line_length;
   }
   if((i-10)%25==0){
      offsetX = base;
      offsetY = offsetY + base + line_length;
    }
  }   
          
  if(i%5==0){
    lines[i].x1=offsetX;
    lines[i].y1=offsetY;
    lines[i].x2=offsetX;
    lines[i].y2=offsetY+line_length;
  }
  else if(i%5==1){
    lines[i].x1=offsetX;
    lines[i].y1=offsetY+line_length;
    lines[i].x2=offsetX+line_length;
    lines[i].y2=offsetY+line_length;
  }
  else if(i%5==2){
    lines[i].x1=offsetX+line_length;
    lines[i].y1=offsetY;
    lines[i].x2=offsetX+line_length;
    lines[i].y2=offsetY+line_length;
  }
  else if(i%5==3){
    lines[i].x1=offsetX;
    lines[i].y1=offsetY;
    lines[i].x2=offsetX+line_length;
    lines[i].y2=offsetY;
  }
  else if(i%5==4){
    lines[i].x1=offsetX;
    lines[i].y1=offsetY;
    lines[i].x2=offsetX+line_length;
    lines[i].y2=offsetY+line_length;
  }
}

btn_reset.onmousedown = function(e) {
  btn_reset.style.fill= "grey";
  btn_reset.height= 40;
  btn_reset.width= 40;
  

  reset();
  hundreds = 0;
  offsetX=10;
  offsetY=10;
  tally_count = 0;
  txt.text = tally_count+hundreds;
}

btn_reset.onmouseup = function(e) {
  btn_reset.style.fill= "black";
  btn_reset.height= 30;
  btn_reset.width= 30;
}
btn_tally.onclick = function(e) {
  tally_count++;
  update_ticks(tally_count);
  txt.text = tally_count+hundreds;
}


function setup(){
  for (let i = 0; i < 125; i++){
    let index = "L"+(i+1).toString();
    lines.push(document.getElementById(index));
    lines[i].style.display = "none";
  }
}


function update_ticks(count){
  if(count>110){ 
    reset(); 
    count = 1; 
    hundreds+=100;}
  for (var i = 0; i < count; i++){
    lines[i].style.display = "inline";
  }
  
}

function reset(){
  for (var i = 0; i < limit; i++){
    lines[i].style.display = "none";
  }
  current_count = tally_count;
  tally_count = 1;
  
}
