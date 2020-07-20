import document from "document";


//var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);

let tumblerMonth = document.getElementById("tumblerMonth");
let tumblerDay = document.getElementById("tumblerDay");
let btn_days = document.getElementById("btn_days");
let days_bg = document.getElementById("days_bg");
let days_txt = document.getElementById("days_txt");
let days_label = document.getElementById("days_label");




btn_days.onclick = function(e) {
  let selectedIndexMonth = tumblerMonth.value;
  let selectedItemMonth = tumblerMonth.getElementById("mon" + selectedIndexMonth);
  let selectedValueMonth = selectedItemMonth.getElementById("content").text;

  let selectedIndexDay = tumblerDay.value;
  let selectedItemDay = tumblerDay.getElementById("item" + selectedIndexDay);
  let selectedValueDay = selectedItemDay.getElementById("content").text;
  //console.log(`index: ${selectedIndexMonth} :: value: ${selectedValueMonth}`);
  //console.log(`index: ${selectedIndexDay} :: value: ${selectedValueDay}`);
  
  let daysUntilNum=daysTo(selectedIndexMonth,selectedIndexDay);
  days_bg.style.display = "inline";
  days_txt.text = daysUntilNum;
  days_txt.style.display = "inline";
  days_label.style.display = "inline";
  
  setTimeout(function() {
  // Stop the spinner
   days_bg.style.display = "none";
   days_txt.style.display = "none";
   days_label.style.display = "none";

  }, 4000)


  }

function daysTo(monthNum,dayNum){
  let today=new Date();
  var newDay=new Date(today.getFullYear()+1, monthNum, dayNum);
  var one_day=1000*60*60*24;
  
  let daysTo = Math.ceil((newDay.getTime()-today.getTime())/(one_day))+1;
  if (daysTo > 365){
    daysTo = daysTo - 365;
  }
  return daysTo;
}

