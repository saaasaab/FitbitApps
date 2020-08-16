import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as fs from "fs";
import { battery } from "power";
import { display } from "display";

let today = new Date();
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let dayName = days[today.getDay()];

const time = document.getElementById("time");
const word = document.getElementById("word");
const definition = document.getElementById("definition");
const grammar = document.getElementById("grammar");

const hider = document.getElementById("hider");
const screenButton = document.getElementById("screenButton");

const dayLabel = document.getElementById("dayLabel");
const dateLabel = document.getElementById("dateLabel");
const batteryLabel = document.getElementById("batteryLabel");

const timeInterval = 20;
const wordUpDelay = 300;

const statsOpacityShift = -.03;
const timeYShift = -4;
const timeFontShift = -2;
const wordYShift = -4;
const characteristicsOpacityShift = .04;
let count = 0;
const page = Math.floor(Math.random() * Math.floor(19));;


display.addEventListener("change", () => {
   if (display.on) {
     page = Math.floor(Math.random() * Math.floor(19));
   } else {
     page = Math.floor(Math.random() * Math.floor(19));
   }
});

let json_object = fs.readFileSync("resources/words/"+page+".json", "json");
const vocab = json_object["Word"];
clock.granularity = "minutes";

const fontSize = Math.floor(Math.min(mapFont(vocab.length, 8, 16, 72, 42)),72);

dayLabel.text = dayName;
word.text=vocab;

word.style.fontSize = fontSize;
definition.text=json_object["Definition"];
grammar.text=json_object["Grammer"];
dateLabel.text=today.getMonth()+"/"+today.getDate();
batteryLabel.text = (Math.floor(battery.chargeLevel) + "%");


screenButton.onclick = () => {
  hider.style.display="inline";
  if(count%2==0){
    shiftTimeUpFunc();
    shiftStatsUpFunc();
    shiftWordUpFunc();
    characteristicsAppearFunc();
    }
  else{
    shiftTimeDownFunc();
    shiftStatsDownFunc();
    shiftWordDownFunc();
    exitWordCharacteristicsFunc();
  }
  count++;
}

function shiftWordDownFunc(){
  let shiftWordDown =  setInterval(()=>{
          word.y=word.y-wordYShift;  
          if(word.y >= 275){
            clearInterval(shiftWordDown);
          }
          //time.style.opacity=time.style.opacity-.0;
      }
    , timeInterval*0.75);
}

function exitWordCharacteristicsFunc(){
  setTimeout(()=>{
        definition.style.display="none";
        grammar.style.display="none";
        let exitWordCharacteristics =  setInterval(()=>{
          if(definition.style.opacity-characteristicsOpacityShift <= 0){
                clearInterval(exitWordCharacteristics);
              }
              definition.style.opacity=Math.max(0,definition.style.opacity-characteristicsOpacityShift); 
              grammar.style.opacity=Math.max(0,grammar.style.opacity-characteristicsOpacityShift); 
              
          }
        , timeInterval/2); 
      }, 10); 
}
function shiftStatsDownFunc(){
      setTimeout(()=>{
        let shiftStatsDown =  setInterval(()=>{
            dayLabel.style.opacity=dayLabel.style.opacity-statsOpacityShift;  
            batteryLabel.style.opacity=batteryLabel.style.opacity-statsOpacityShift;
            dateLabel.style.opacity=dateLabel.style.opacity-statsOpacityShift;
            if(dayLabel.style.opacity-statsOpacityShift*1.5 >=1){
              dayLabel.style.opacity=1;  
              batteryLabel.style.opacity=1;
              dateLabel.style.opacity=1;
              clearInterval(shiftStatsDown);
            }
        }
      , timeInterval); 
    }, wordUpDelay); 
}

function shiftTimeDownFunc(){
    let shiftTimeDown = setInterval(()=>{
        if(time.y >= 175){
          clearInterval(shiftTimeDown);
          hider.style.display="none";
        }
        time.y=time.y-timeYShift;     
        time.style.fontSize = time.style.fontSize-timeFontShift;
        time.text=time.text;
        }, timeInterval); 
}

function characteristicsAppearFunc(){
  setTimeout(()=>{
          definition.style.display="inline";
          grammar.style.display="inline";
          let enterWordCharacteristics =  setInterval(()=>{
                if(definition.style.opacity+characteristicsOpacityShift+characteristicsOpacityShift*1.2>= 1){
                  clearInterval(enterWordCharacteristics);
                  hider.style.display="none";
                }
                definition.style.opacity=definition.style.opacity+characteristicsOpacityShift; 
                grammar.style.opacity=grammar.style.opacity+characteristicsOpacityShift; 
            }
          , timeInterval/2); 
        }, 1000); 
}


function shiftWordUpFunc(){
  let shiftWordUp =  setInterval(()=>{
            word.y=word.y+wordYShift;  
            if(word.y < 100){
              clearInterval(shiftWordUp);
            }
        } , timeInterval*.75); 
}

function shiftStatsUpFunc(){
  let shiftStatsUp =  setInterval(()=>{
            dayLabel.style.opacity=dayLabel.style.opacity+statsOpacityShift;  
            batteryLabel.style.opacity=batteryLabel.style.opacity+statsOpacityShift;
            dateLabel.style.opacity=dateLabel.style.opacity+statsOpacityShift;
            if(dayLabel.style.opacity+statsOpacityShift*1.5 <=0){
              dayLabel.style.opacity=0;  
              batteryLabel.style.opacity=0;
              dateLabel.style.opacity=0;
              clearInterval(shiftStatsUp);
            }
        }, timeInterval); 
}

function shiftTimeUpFunc(){
    let shiftTimeUp = setInterval(()=>{
        if(time.y < 40){
          clearInterval(shiftTimeUp);
        }
        time.y=time.y+timeYShift;     
        time.style.fontSize = time.style.fontSize+timeFontShift;
        time.text=time.text;
      }, timeInterval); 

}

function mapFont(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  time.text = `${hours}:${mins}`;
}
