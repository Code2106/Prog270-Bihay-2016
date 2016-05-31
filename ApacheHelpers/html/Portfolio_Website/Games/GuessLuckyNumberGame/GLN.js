// JavaScript Document

//Note theory: you can invoke a function inside a function
function myFunction(){ 
	
	//Game variables
	var mysteryNumber = Math.floor(Math.random() * 50);
	var attempLabel = document.getElementById("attempt").innerHTML;
	
	//The input and output fields
	var input = document.getElementById("input");
	input.focus();
	
	var output = document.getElementById("output");

	// Guess button
	var guess = document.getElementById("guess");
	guess.style.cursor = "pointer";
	guess.addEventListener("click", clickGuess,false);

	// Reload button
	var reload = document.getElementById("load");
	reload.style.cursor = "pointer";
	reload.addEventListener("click", clickReload,false);

	// Surrender button
	var surr = document.getElementById("surr");
	surr.style.cursor = "pointer";
	surr.addEventListener("click", clickSur,false);

	function clickReload()
	{
		location.reload();
	}

	function clickGuess() 
	{
		GuessingGames.playGame();
	}

	function clickSur()
	{
		var surrender = confirm("Are you sure you want to surrender?" + "\n Click ok  ,otherwise click cancel");
		
		if(surrender)
		{
		
			//disable guess button
			guess.disabled = true;
			reload.disabled = false;
			output.innerHTML = "Correct answer is: " + String(mysteryNumber);
			document.getElementById("hiddenmsg").innerHTML = "So disappointed!"
		}
	
	}
	
	
	
	var GuessingGames = 
	{
	
	playersGuess : 0,
	attempNum : 5,
	//Note theory: you cannot invoke a function inside an object literal or  in Global scope

	playGame : function() 
	 {

		playersGuess = parseInt(input.value);
	
		if (isNaN(playersGuess))
		{
			
			output.innerHTML = "Invalid input, Please try Again!";
		
		} 
		else  if (playersGuess === mysteryNumber) 
		{

			output.innerHTML = "You got it! Answer is " + String(mysteryNumber);
            
		} else if (playersGuess > mysteryNumber) 
		{

			output.innerHTML = "That's too high.";

		} else 
		{

			output.innerHTML = "That's too low.";

		}

		this.attempNum--;

		if (this.attempNum === 0) 
		{

			alert("You run out of attempt!");
			output.innerHTML = "Correct answer is: " + String(mysteryNumber);
			guess.disabled = true;
            reload.disabled = false;
			
		}
	
	        document.querySelector("#attempt").innerHTML =  attempLabel.replace( attempLabel[15] ,  String(this.attempNum));
		    input.value = null;
			input.focus();
			
	  }	
	}
}//end of main function
/**/

myFunction();

