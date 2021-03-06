//
//  program5:  Setup sprite object and animation loop. Animate the sprite
//			   in canvas.
//   
//
// get context
//
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var sprite = {

	sourceX: 0,   // origin of sprite in the spritesheet
	sourceY: 0,
	sourceWidth: 64,   // size of sprite in the spritesheet
	sourceHeight: 64,
	x: 0,   // origin of sprite in canvas
	y: 200,
	width: 64,  // size of sprite in canvas
	height: 64,
	speed: 0.7  // speed is 5 pixels
	
};

var qsprite = Object.create(sprite);

qsprite.sourceX = 2;
qsprite.sourceY =  3;
qsprite.x = 20;
qsprite.y = 100;


// Initialize game stats

var timeLeft = 30;
var score = 0;

var displayScore = document.querySelector("#score");
var displayTimeLeft = document.querySelector( "#timeLeft");

// Load image

var firstImage = new Image();
firstImage.addEventListener("load", loadHandler, false);
firstImage.src = "images/spriteChicken.png";

var secondImage = new Image();
secondImage.addEventListener("load", loadHandler, false);
secondImage.src = "images/spriteCow.png";

function loadHandler(event) {

	animationLoop();
   
}

// Game animation loop: fires every frame (60 times/sec)
//
function animationLoop() {

	requestAnimationFrame( animationLoop, canvas );

	sprite.x += sprite.speed;
	qsprite.x += qsprite.speed;
	//render the first sprite
	render(firstImage,secondImage,sprite,qsprite);
	
		
}

// Draw game 
//
function render(image,image2, sprite,qsprite) {

	// clear context
    ctx.clearRect( 0, 0, canvas.width, canvas.height);

    // draw new game state
    ctx.drawImage(image, 
    			  sprite.sourceX, sprite.sourceY, 
    			  sprite.sourceWidth, sprite.sourceHeight, 
    			  sprite.x, sprite.y, sprite.width, sprite.height);

	// draw second new game state
    ctx.drawImage(image2, 
    			  qsprite.sourceX, qsprite.sourceY, 
    			  qsprite.sourceWidth, qsprite.sourceHeight, 
    			  qsprite.x, qsprite.y, qsprite.width, qsprite.height); 

    // display game stats
    displayScore.innerHTML = "Animals Hit: " + score;
    displayTimeLeft.innerHTML = "Time Left: " + timeLeft;
}