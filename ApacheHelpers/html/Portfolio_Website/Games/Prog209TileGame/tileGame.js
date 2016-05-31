// JavaScript Document

//create the environment
var pattern = [

[ 3,3,5,4,2,2,3,3], /* this is pattern's index 0 */
[ 4,0,1,1,0,0,1,3],
[ 3,3,0,4,1,3,0,0],
[ 3,0,5,8,0,3,3,0],
[ 4,3,1,3,2,0,0,0],
[ 2,1,0,0,0,1,2,1], 
[ 2,1,2,2,2,1,2,1],
[ 0,0,0,0,0,0,0,0],

]; 

/* The game will have 5 kind of tiles in the game and some of them are characters and buildings involve 
Here are the assigned number for each of them to be identified in our program

	0 = horizontal road
	1 = vertical road
	2 = tree
	3 = wall
	4 = Church
	5 = building
	6 = player
	7 = enemy
	8 = escape
*/

// pointers to players position base on the stage object, can be used to check the value of an array.
var rowCount =  7; 
var columnCount = 0; 
 
// create object for the platform of our game environment 
var stage = document.querySelector("#stage");

// object for the playable character
var player = document.getElementById("meIcon");

// Create the player's lifespan
var life = 3;

// Enemy objects and pointers
//  Create objects & behaviour for the ghoul  
var enemy = document.getElementById("ghoul");
var randomDirection;
var randomSteps;
var prevStep = 0;
 
//pointers ghoul's position. Can be used to check the value of an array or determine our path
var enemyRow = (parseInt(window.getComputedStyle(enemy, null).marginTop) /44);
var enemyColumn	= (parseInt(window.getComputedStyle(enemy, null).marginLeft) /44);

// Create objects for environment length, tiles and size
var patternLength = pattern[0].length;

var tile = pattern[0];// get the number of our pattern, in this case we have 1 pattern

var cell;

var SIZE = 34;

//The space between each cell
var SPACE = 10;

// Object for music
var startMusic = document.getElementById("music");

// Create a trigger button to start the game
var startGame = document.getElementById("startGame");
startGame.addEventListener( "click" , start , false );
startGame.style.cursor = "pointer";

var startPage = document.getElementById("startPage");

	alert("You are having a nightmarish dream of wandering into the woods. " +
	"\n Try to get yourself out by searching through the escape route however be prepared to run and avoid the ghoul wandering around through the night");

	alert("Press arrow key buttons to move");

function ghoulAI(){
  
	randomDirection =  Math.floor(Math.random() * 4) + 1;
	
	 
	switch(randomDirection)
	{

		//Up
		case 1:
		
		    // Check if our position is at 1st row if true don't go outside the stage
			if(enemyRow == 1)
			{
		 
			  enemy.style.marginTop = 0 + "px";
			  
			   // get the prev value of the last step that we save otherwise if first step default it depends on the location of the ghoul
			   pattern[enemyRow][enemyColumn] = prevStep;
			    
			   --enemyRow;//move
			  
			   // Check if our current position matched the same position position as the player this means the ghoul caught the player
			   tileChecker(enemyRow,enemyColumn, enemy.id);// Note you have an option to not complete the parameter of a function

			   // Store the next step value
			   prevStep =  pattern[enemyRow][enemyColumn];
			   // set the value current position to our id value 
			   pattern[enemyRow][enemyColumn] = 7;
			   
			 }
		     else if(enemyRow != 0){

			  randomSteps = Math.floor((Math.random() * 2) + 1);
			 
			  enemy.style.marginTop = (enemyRow - randomSteps) * 44 + "px";
		      
			  pattern[enemyRow][enemyColumn] = prevStep;
			  
			  enemyRow -= randomSteps;
			 
			 // Check if our current position matched the same position position as the player this means the ghoul caught the player
			  tileChecker(enemyRow,enemyColumn, enemy.id);

			 // alert(window.getComputedStyle(enemy, null).marginTop + " blocks up " + randomSteps + " steps");
				   
			  // store the the current step value
			  prevStep =  pattern[enemyRow][enemyColumn];
			
			  pattern[enemyRow][enemyColumn] = 7;
			  
				}
			break;
		
		//Down
		case 2:
			  
			if(enemyRow == 6)
			{
			
				  enemy.style.marginTop = (enemyRow + 1) * 44 + "px";
				 
				  pattern[enemyRow][enemyColumn] = prevStep;

				  ++enemyRow;
				  
				  // store the the current step value
				  // Check if our current position matched the same position position as the player this means the ghoul caught the player
				  tileChecker(enemyRow,enemyColumn, enemy.id);

				  prevStep =  pattern[enemyRow][enemyColumn];
			
				  pattern[enemyRow][enemyColumn] = 7;
			    
			}	
			else if(enemyRow != 7){
			
				 randomSteps = Math.floor((Math.random() * 2) + 1);
				
				 // multiply it by half of total pixel of tile
				 enemy.style.marginTop = (enemyRow + randomSteps) * 44 + "px";

				 pattern[enemyRow][enemyColumn] = prevStep;
				 
				 enemyRow += randomSteps;

				 // Check if our current position matched the same position position as the player this means the ghoul caught the player
				 tileChecker(enemyRow,enemyColumn, enemy.id);

				  // store the the current step value
				
				  prevStep =  pattern[enemyRow][enemyColumn];
			
				  pattern[enemyRow][enemyColumn] = 7;
				}
			break;
		
		//Left
		case 3:
			
				if(enemyColumn == 1)
				{
			
					enemy.style.marginLeft = 0 + "px";
				    
					pattern[enemyRow][enemyColumn] = prevStep;
					--enemyColumn;	
				 
				   // store the the current step value
				   // Check if our current position matched the same position position as the player this means the ghoul caught the player
				   tileChecker(enemyRow,enemyColumn, enemy.id);

				   prevStep =  pattern[enemyRow][enemyColumn];
			
				   pattern[enemyRow][enemyColumn] = 7;	
				   
			    } 
				else if(enemyColumn != 0)
				{
			 
					randomSteps = Math.floor((Math.random() * 2) + 1);
					
					enemy.style.marginLeft = (enemyColumn - randomSteps) * 44 + "px";
					
					pattern[enemyRow][enemyColumn] = prevStep;
					
					enemyColumn -= randomSteps;
					
					// Check if our current position matched the same position position as the player this means the ghoul caught the player
					tileChecker(enemyRow,enemyColumn, enemy.id);

			        // alert(window.getComputedStyle(enemy, null).marginLeft + " Left " + randomSteps + " steps");
				    // store the the current step value
				
				    prevStep =  pattern[enemyRow][enemyColumn];
			
				    pattern[enemyRow][enemyColumn] = 7;
				
				}
			    break;
		
		//Right
		case 4:
			
		    if(enemyColumn == 6)
			{
				
					enemy.style.marginLeft = enemyColumn * 44 + "px";
				
					pattern[enemyRow][enemyColumn] = prevStep;
					--enemyColumn;
				
				    // store the the current step value
					// Check if our current position matched the same position position as the player this means the ghoul caught the player
			        tileChecker(enemyRow,enemyColumn, enemy.id);

				    prevStep =  pattern[enemyRow][enemyColumn];
			
				    pattern[enemyRow][enemyColumn] = 7;
		    }
			else if(enemyColumn != 7)
				{
			
					randomSteps = Math.floor((Math.random() * 2) + 1);
				
					enemy.style.marginLeft = (enemyColumn + randomSteps) * 44 + "px";

					pattern[enemyRow][enemyColumn] = prevStep;
				
					enemyColumn += randomSteps;
				     
					// Check if our current position matched the same position position as the player this means the ghoul caught the player
			        tileChecker(enemyRow,enemyColumn, enemy.id);

				    // store the the current step value
				
				    prevStep =  pattern[enemyRow][enemyColumn];
			
				    pattern[enemyRow][enemyColumn] = 7;
					
				}
				break;
	
	}//Eos

			
}//Eof

 function render(){
	 
	// Walkthrough each row in the pattern
	for( var patIndex = 0; patIndex < patternLength; ++patIndex ){
		// Walkthrough each element in each row
		for( var tileIndex = 0; tileIndex < pattern[patIndex].length; ++tileIndex ){
			
			// Create a div called cell to establish the tile
            cell = document.createElement("img");  	
			  
			// Set its CSS class to "cell"
    		cell.setAttribute("class", "cellStyle");
		 
			stage.appendChild(cell);		
		   
		//Find the correct image for this map cell
      	
		switch(pattern[patIndex][tileIndex])
      	{
		 	
			case 0: 
			cell.src = "images/road.png";
			break;
			
			case 1:
			cell.src = "images/road2.png";
        	break;
			
			case 2:
			cell.src = "images/tree.png";
        	break;
			
			case 3: 
			cell.src = "images/wall.png";
          	break;
			
			case 4: 
			cell.src = "images/church.png";
          	break;
			
			case 5:
			cell.src = "images/building.png";
          	break;
			
			case 8:
			cell.src = "images/escape.png";
          	break;
			
		}
    	//Position the cell in the correct place
    	//with 10 pixels of space around it
   	 	cell.style.top = patIndex * (SIZE + SPACE) + "px";
    	cell.style.left = tileIndex * (SIZE + SPACE) + "px";
		
		}//inner loop
	}//outer loop
	
 }//Eof
	
	// Render the tile
	render();
	
	function tileChecker(row, column, idName){
	
		
		switch(pattern[row][column])
		{
		
		// Check if horizontal road
		case 0:
		return 0;
		break;
		
		// Check if vertical road
		case 1:
		return 1;
		break;
		
		// Check for trees
		case 2:
		return 2;
        break;
			
		// Check if there is a wall blocking the way
		case 3: 
		return 3;
        break;
		
		// Check for church
		case 4:
		return 4;
		break;
		
		// Check for building
		case 5:
		return 5;
		break;
		
		// Check if we get hit, 6 is the value of our tile
		case 6:

		--life;
		alert("The ghoul touched you, it slowly reduced your lifespan keep your distance!" + "\n  \n  You have "+ life + " life remaining");       
		return 6;
		break;
		
	    case 7:
		
		if(idName == "meIcon"){ 
		--life;
		alert("The ghoul touched you, it slowly reduced your lifespan keep your distance!" + "\n  \n  You have "+ life + " life remaining");       
		}
		return 7;
		break;
	
		// Win the game
		case 8:

		if(idName == "meIcon"){
			
		var ask = confirm('Congratulation You escape the Nightmare! ' + '\n Are you ready for the next nightmare?');
					
					if(ask)
					{
					
					  location.reload();
							
					}
					else{ window.top.close(); }	
		}
		return 8;
		
		default:
		return -1;
		break;
		
		}
			
	}
	
// Action to make according arrow keys press by players
 document.onkeydown = function Venture(event)
 {
    /* Problem to solve: Prevent character from going through the buildings */
	
    // Use windows event to adapt the game with IE browser
    event = event || window.event;   
   
  //Choose the correct action
  switch(event.keyIdentifier)
  {
      
	 /* Up */
     case "Up":
	 // Get our current margin on top
	 imgMargin = parseInt(window.getComputedStyle(player, null).marginTop);
	 
	 //Test if the position of our image is not out of scope and if there is no blockade in our way
	 // As long as the tile value is less or equal to 1 which means we can move up on a vertical road, same thing with moving down
	 if(tileChecker(rowCount - 1, columnCount, player.id) <= 1){

		// Set our new margin, add a case to test if there is blockade isBlockade()?  if true move otherwise don't move
		player.style.marginTop = imgMargin - 44 + "px"; 
			
		// Change value of our previous position
		pattern[rowCount][columnCount] = 0; 
		
		// Track our position
		--rowCount;
		
		// Change the value to our current position 
		pattern[rowCount][columnCount] = 6; 
	
	   }
	     break;
	 
	 /* Down */
     case "Down":
	 // Get our current margin on top
	 imgMargin = parseInt(window.getComputedStyle(player, null).marginTop)
	 
	 //Test if the position of our image is not out of scope
	 if(tileChecker(rowCount + 1, columnCount , player.id) <= 1){

		// Set our new margin, add a case to test if there is blockade isBlockade()? if true move otherwise don't move
		player.style.marginTop = imgMargin + 44 + "px"; 
	    
		// Change value of our previous position
		pattern[rowCount][columnCount] = 0; 
		
		// Track our position
		++rowCount;
		
		// Change the value to our current position. This will things easier for the enemy to identify if they did caught us
		pattern[rowCount][columnCount] = 6; 
	 }
       break;
 
	/* Right */
    case "Right":
    
	// Get our current margin on top
	imgMargin = parseInt(window.getComputedStyle(player, null).marginLeft)
	
	//Test if the position of our image is not out of scope
	if(tileChecker(rowCount, columnCount + 1 , player.id) == 0){
	
	// Set our new margin
	player.style.marginLeft = imgMargin + 44 + "px"; 
	 
	// Change value of our previous position
	pattern[rowCount][columnCount] = 0; 
	
	// Track our position
	++columnCount;
	 
	// Assign id value of the player's object to determine the location of the player
	pattern[rowCount][columnCount] = 6; 
	 
	}
	break;
	 
	/* Left */
    case "Left":
	
	// Get our current margin on top
	imgMargin = parseInt(window.getComputedStyle(player, null).marginLeft)
	//Test if the position of our image is not out of scope
	 
	if(tileChecker(rowCount, columnCount -1 , player.id) == 0){
	 
	// Change value of our previous position
	pattern[rowCount][columnCount] = 0; 
		
	 
	// Set our new margin
	player.style.marginLeft = imgMargin - 44 + "px"; 
	 
	// Track our position
	--columnCount;
	
	// Change value of our position
	pattern[rowCount][columnCount] = 6; 
	 
	}
    break;
	   
  }
  
 }// Eof
 
 // a start function includes a function for ghoul's behaviour 
 function start()
 {
	
	startPage.style.display = "none";
	startMusic.src = "https://archive.org/download/EerieCreepyAndScaryMusicForYourScoresDvds/DvdThemeMusic-chasePulse.mp3";
    setInterval( function(){ ghoulAI() }, 1000); 
 
 }

 



