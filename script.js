//  game Devloped by Gaurav Bharane 
// -----------------------------------------------------

// getting all needed elements from html to javascript 
let character=document.getElementById('character');
let characterBottom=parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
let characterRight=parseInt(window.getComputedStyle(character).getPropertyValue('right'));
let characterWidth=parseInt(window.getComputedStyle(character).getPropertyValue('width'));
let ground=document.getElementById('ground');
let groundBottom=parseInt(window.getComputedStyle(ground).getPropertyValue('bottom'));
let groundHeight=parseInt(window.getComputedStyle(ground).getPropertyValue('height'));
let isjumping=false;
let upTime;
let downTime;
let displayScore= document.getElementById('score');
let score= 0;
let pausebtn=document.getElementById('pausebtn');
let playbtn=document.getElementById('playbtn');


// play function runs the main engine of game it starts when we click on play button

function play(){
    // jump function is used for moving the charcter from down to up
function jump(){
    if(isjumping) return;
    upTime=setInterval(() => {
        if(characterBottom>=groundHeight +250){
            clearInterval(upTime);
            downTime= setInterval (() =>{
                if(characterBottom<= groundHeight + 10){
                    clearInterval(downTime);
                    isjumping=false;
                }
                characterBottom-=10;
                character.style.bottom=characterBottom +'px';
            },15)
        }
      characterBottom +=10;
      character.style.bottom=characterBottom +'px';
      isjumping=true;  
    },10);
}

// showscore function shows the current score
function showScore(){
    score++;
    displayScore.innerHTML=score;
}

setInterval(showScore,100);

// generateObstacle creates multiple obstacle 
function generateObstacle(){
    let obstacles = document.querySelector('.obstacles');
    let obstacle = document.createElement('div');
    obstacle.setAttribute('class','obstacle'); 
    obstacles.appendChild(obstacle);

    let randomTimeout=Math.floor(Math.random()*1000)+1000;
    let obstacleRight =-30;
    let obstacleBottom= 100;
    let obstacleWidth = 7;
    let obstacleHeight= Math.floor(Math.random()*50)+50;
    function moveobstacle(){
        obstacleRight +=5;
        obstacle.style.right =obstacleRight+'px';
        obstacle.style.bottom =obstacleBottom+'px';
        obstacle.style.height =obstacleHeight+'px';

        // when game is over 
        if(characterRight >= obstacleRight - characterWidth 
            && characterRight<=obstacleRight + obstacleWidth 
            && characterBottom <= obstacleBottom +obstacleHeight){
            alert('Game over!  your score is :'+score);
            clearInterval(obstacleInterval);
            clearTimeout(obstacleTimeout);
            location.reload();
        }
    }

    let obstacleInterval=setInterval(moveobstacle,20);
    let obstacleTimeout= setTimeout(generateObstacle,randomTimeout);
}

generateObstacle();


// for computer keyboard control
function control(e){
    if(e.key == "ArrowUp" ){
        jump();
    }
}

// for mouse and mobile click
function controlmouse(e){
    if(e.button == "0" ){
        jump();
    }
}
document.addEventListener('keydown', control);
document.addEventListener('mouseup', controlmouse);
}

function mobileclick(){
    jump();
}

// pause function to stop the game
function pause(){
alert('paused the game');
}
