/*
 * Entry point for the watch app
 */
import document from "document";

let screen = document.getElementById("screen");
let ball = document.getElementById("ball");
let paddle = document.getElementById("paddle");
let score = document.getElementById("score");
let reset = document.getElementById("reset");

var timeStep = 10;
var paddleH = paddle.height;

var mult=5;
var velX=-3.5;
var velY=-5;
var maxVX=velX*mult;
var maxVY=velY*mult;
var signX = velX <0?-1:1;
var signY = velY <0?-1:1;
var a;
var count = 10;
var scoreNum = 0;

reset.onclick = function(){
  paddle.height=paddleH;
  velY=-3.5;
  velX=-5;
  ball.cx=150;
  ball.cy=150;
  scoreNum=0;
  score.text = scoreNum;
  reset.style.display="none"
  setTimeout(run(),500);
  
}

screen.onmousedown = function(evt){
  updatePaddlePos(evt);
}

screen.onmousemove = function(evt) {
  updatePaddlePos(evt);
}


run()

function run(){
  var interval = setInterval(function() {
    let detect = true;
    //Auto play
    //paddle.y = ball.cy-paddle.height/2;
    if (paddleDetection()){
      scoreNum++;
      score.text = scoreNum;
      paddle.height = paddle.height-2;
      animateBall(-velX,-velY);
      a = Math.tan(velY/velX);
      velX += velX*.05;
      velY += velY*.05;
      //var signX = velX <0?-1:1;
      //var signY = velY <0?-1:1;
      
      //velX = Math.abs(velX) < Math.abs(maxVX) ? velX : Math.abs(maxVX)*sign; 
      //velY = Math.abs(velY) < Math.abs(maxVY) ? velY : Math.abs(maxVY)*sign; 
      
      velX = -velX;
    };
  
    if(ball.cx+ velX/2<= 0+ball.r){
      animateBall(-velX,-velY);
      velX = -velX;
    }
    if(ball.cy+velY/2 <= 0+ball.r || ball.cy+velY/2 >=300-ball.r){
      animateBall(-velX,-velY);
      velY = -velY;
    }
    if (ball.cx+velX/2 >=300-ball.r){
      clearInterval(interval);
      reset.style.display="inline"
    }

    animateBall(velX,velY);


  }, timeStep);

}

function paddleDetection(){
  if(ball.cx+ velX/2 >= paddle.x-ball.r 
     &&ball.cy>=paddle.y
     &&ball.cy<=paddle.y+paddle.height){
    return(true);
  }
  return(false);
}
function animateBall(vx,vy){
  ball.cx = ball.cx+vx;
  ball.cy = ball.cy+vy;
}

function updatePaddlePos(evt){
  paddle.y = evt.screenY-paddle.height/2;
}