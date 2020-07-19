import document from "document";

let screenHome = document.getElementById("screenHome");
let screenAdd = document.getElementById("screenAdd");
let screenView = document.getElementById("screenView");

let add = document.getElementById("add");
let view = document.getElementById("view");
let home = document.getElementById("home");

function showHomeScreen() {
  console.log("Show screen 1");
  screenHome.style.display = "inline";
  screenAdd.style.display = "none";
  screenView.style.display = "none";
}

function showAddScreen() {
  console.log("Show screen 2");
  screenHome.style.display = "none";
  screenAdd.style.display = "inline";
  screenView.style.display = "none";  
  
  let tumbler = document.getElementById("tumbler");
  let selectedIndex = tumbler.value;
  let selectedItem = tumbler.getElementById("item" + selectedIndex);
  let selectedValue = selectedItem.getElementById("content").text;
  console.log(`index: ${selectedIndex} :: value: ${selectedValue}`);
  //selectedItem.getElementById("content").text = "New Value";
}

function showViewScreen() {
  console.log("Show screen 3");
  screenHome.style.display = "none";
  screenAdd.style.display = "none";
  screenView.style.display = "inline";
  
  let tumblerView = document.getElementById("tumblerView");
  let selectedIndex = tumblerView.value;
  let selectedItem = tumblerView.getElementById("item" + selectedIndex);
  let selectedValue = selectedItem.getElementById("content").text;
  console.log(`index: ${selectedIndex} :: value: ${selectedValue}`);
  //selectedItem.getElementById("content").text = "New Value";
}


add.onclick = function() {
  showAddScreen();
}

view.onclick = function () {
  showViewScreen();
}

home.onclick = function() {
  showHomeScreen();
}
