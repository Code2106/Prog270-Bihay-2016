// JavaScript Document

// Create images here

//Get a reference to the canvas HTML tag
var canvas = document.querySelector("canvas");
// Event for user clicking monster. Response when monster is hit. 
canvas.addEventListener("click", Explosion, false);

//Access the canvas's drawing surface
var drawingSurface = canvas.getContext("2d");


// This will create an image tag object into canvas
var monsterImage = new Image();

// Load the image tag
monsterImage.addEventListener("load", loadAnimation, false);

monsterImage.src = "images/spriteSheet1.png";


// Game stats object
var displayScore = document.getElementById("score");
var displayTimeLeft = document.getElementById("timer");


var timeLeft = 30;
var score = -1;


var sprite1 = {
	
	sourceX: 0, // origin of sprite in the spritesheet
	sourceY: 0,
	sourceWidth: 64, // size of sprite in the spritesheet
	sourceHeight: 64,
	x: 0,   // origin of sprite in canvas
	y: 0,
	width: 64,  // size of sprite in canvas
	height: 64,
	speed: 0.4,  // speed is 5 pixels
    explode: false, movement:function(){
	
		sprite1.x += sprite1.speed;
		sprite1.y += sprite1.speed;
	
	}
	
};



// This will create an image tag object into canvas
var monsterImage2 = new Image();

// Load the image tag
monsterImage2.addEventListener("load", loadAnimation, false);

monsterImage2.src = "images/spriteSheet1.png";

var sprite2 = Object.create(sprite1);
sprite2.x = 700;
sprite2.sourceX = 129;  // origin of sprite in the spritesheet


//Timer function
function timer(){

	setInterval(function(){	

		if(timeLeft > 0){
	
		timeLeft--;
	displayTimeLeft.innerHTML = "Time Left: " + timeLeft;
	} 
	else{ canvas.removeEventListener("click", Explosion, false);  }
	
	}, 1000);

	// if time runs out end the game disable target function or display a window to let the players know 
	
}


//call the timer
timer();


// create the loadhandler
function loadAnimation()
{

 // draw the image in the canvas
	
 "use strict";

  animationLoop();
  
}



function animationLoop() {

/* In theory to separate movement of spite1 t=from sprite2 we need to change create a separate statement for two sprites maybe we can use case or just if statement */


	"use strict";
	if(sprite1.explode == false){
	
		requestAnimationFrame( animationLoop, canvas );
		
		sprite1.movement();
		//sprite2.movement();
		
		//render the first sprite
		render(monsterImage, sprite1, monsterImage2 , sprite2 );
		
		}
		else{
	
		//increment score if the sprite explode
		++score;
		//render it again
		// display game stats
	    displayScore.innerHTML = "Animals Hit: " + score;
	
	}
	
}


//Support function to determine if mouse targeted the position of the sprite
function moveDiagonal(e, widthCovered, heightCovered){
	
	
var xInRange = e.clientX >= sprite1.x && e.clientX <= widthCovered? true:false;

var yInRange = e.clientY >= sprite1.y &&  e.clientY <= heightCovered? true:false;

/* alert( e.clientX + " x mouse pointer " + sprite.x + " x sprite pos " + widthCovered );

alert(e.clientY + "y mouse pointer " + sprite.y + " y sprite pos " + heightCovered );

alert(xInRange + " X range " + yInRange + " Y range"); */


	if(xInRange && yInRange){

		return true;

	}
	
}



function Explosion(event)
{
	
	"use strict";

	var widthCovered = sprite1.x + 100;
	
	var heightCovered = sprite1.y  + 130;

	var widthCovered2 = sprite2.x + 100;
	
	var heightCovered2 =  sprite2.y + 130;
	
	
	// test if the sprite is hit according to movement
	if(moveDiagonal(event, widthCovered, heightCovered)){
	
	sprite1.explode = true;
	// alert("You hit a monster!");
	
	// display explosion from a different angle of monsterImage object
	setTimeout( function(){  drawingSurface.drawImage( monsterImage, 198, 0, sprite1.sourceWidth, sprite1.sourceHeight, sprite1.x, sprite1.y, sprite1.width, sprite1.height);  }, 200 );

	//clear the image
	setTimeout( function(){  drawingSurface.clearRect( sprite1.x, sprite1.y, 90, 90 );  }, 2000);

	// This reload the the page and continue the timer
	Location.reload();
	
	} 
	
}


 function render(image,sprite,image2,secondSprite) {
	

	"use strict";
	// clear context
    drawingSurface.clearRect( 0, 0, canvas.width, canvas.height);

	
	// display the first sprite
	drawingSurface.drawImage( image, 
	
	sprite.sourceX, 
	sprite.sourceY, 
	sprite.sourceWidth, 
	sprite.sourceHeight, 
	sprite.x, 
	sprite.y, 
	sprite.width, 
	sprite.height);
	
	drawingSurface.drawImage( image2, 
	
	secondSprite.sourceX, 
	secondSprite.sourceY, 
	secondSprite.sourceWidth, 
	secondSprite.sourceHeight,
	secondSprite.x, 
	secondSprite.y, 
	secondSprite.width, 
	secondSprite.height);
	
    displayScore.innerHTML = "Animals Hit: " + 0;
	displayTimeLeft.innerHTML = "Time Left: " + timeLeft;
	
}



// run timer


// Timer object. needs a default 30-40 seconds. The game must freeze & ends when the time runs out. The game will display a message to view top scores in the game

// Instruction message: hit the monster by using your mouse. Point the mouse cursor to the target then right click to shoot


