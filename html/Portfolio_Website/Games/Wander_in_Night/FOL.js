
//Create the map
var map = [];

map[0] = "Ghoul's Safe Place";
map[1] = "Ghoul";
map[2] = "Secret Room";
map[3] = "Dining Room";
map[4] = "Staircase Entrance";
map[5] = "First Floor";
map[6] = "Abandon Townhouse";
map[7] = "The Haunted Mansion";
map[8] = "An Old Barn, .....";

//Create an array of actions the game understands

// Item storage
var backpack = [ ];//we start with nothing

var itemInGame = ["flute", "stone" , "sword"];//this is the item in our game
var itemLocations = [1, 6, 8];//this is the locations of the item

//Set the player's start location 
//this will be use to render our location's image file has a name base on map's index
var mapLocation = 7;

//Initialize the player's input
var playersInput = "";

//Initialize the gameMessage
var gameMessage = "";

//Game instructions to players
//var itemList = document.getElementById("itemIHave");
// Create elements and nodes to inserted
var newItem;

//The input and output fields
var input = document.getElementById("input");
var output = document.getElementById("output");
var item;
           
// output for location names and details
var locName = document.getElementById("locName");
var details = document.getElementById("details");

// Events & Methods
// The image for our location 
var image = document.getElementById("imgloc");

//Display the player's location
render();


// The buttons

// event to take items 
var getItem = document.getElementById("get");
getItem.addEventListener("click" , clickGet , false);


// event to use items
var itemToUse = document.getElementById("use");
itemToUse.addEventListener("click" , clickUse , false);


// event to drop items
var diregardItem = document.getElementById("drop");
diregardItem.addEventListener("click" , clickDrop , false);


// event to save the game
var saveGame = document.getElementById("save");
saveGame.addEventListener("click" , clickSave , false);

// event to return to the game we saved
var prevGame =  document.getElementById("prev");
prevGame.addEventListener("click" , returnGame , false);

function clickGet()
{
 
	takeItem();

}


function clickUse()
{

	useItem();

}


function clickDrop()
{

	dropItem();

}


function returnGame()
{
 
  	backpack = localStorage.getItem("allItems");
  	mapLocation = localStorage.getItem("loc");
	render();//display the saved location
	gameMessage = localStorage.getItem("msg");
	locName.innerHTML = localStorage.getItem("locname");
	details.innerHTML = localStorage.getItem("detail");
	
}

function clickSave()
{
	
	// save backpack
	localStorage.setItem("allItems", backpack);
	
	// save location
	localStorage.setItem("loc", mapLocation);
	
	// save game message
	localStorage.setItem("msg", gameMessage);
	
	// save name of location
	localStorage.setItem("locname", locName.innerHTML);
	
	// save details
	localStorage.setItem("detail", details.innerHTML);
	
	// Notify players
	gameMessage = "Your game was saved!";
	
	setTimeout(function(){ render(); }, 1000);
	
	// test if we get all the item
	//testStorage();
			
}

function testStorage()
{
	var key;
	var value = [];
	
	for(var i = 0; i < localStorage.length; ++i)
	{
		
		key = localStorage.key(i);
		value.push(localStorage[key]);
	
	}
	
	//alert(value);
	
}



// Action to make according arrow keys press by players
document.onkeydown = function Venture(event)
{
   /* Problem to solve: Ignore arrow keys when the cursor is focus on input tag or items */
	
   // Use windows event to adapt the game with IE browser
   event = event || window.event;
	
   //Get the player's input and convert it to lower-case
   playersInput = input.value;
   playersInput = playersInput.toLowerCase();

   //Reset these variables from the previous turn
   gameMessage = "";
   output.innerHTML = "";
   
   //Choose the correct action
   switch(event.keyIdentifier)
   {
      
	  /* To go North */
     case "Up":
	 
	 if(mapLocation >= 3)
	 { 
	   
	   mapLocation -= 3;
	 
	 }
      else
	 {
	 
	   gameMessage = "Inaccessible location";
	 
	 }
       break;
      
	 /* To go East */
     case "Right":
       // All index of the loc at the east have remainder 2 when divided by 3 on 2 , 5 , 8
	 if( mapLocation % 3 !== 2 )
	 { 
	
		mapLocation += 1;
	 
	 }
      else
	 {
	 
	    gameMessage = "Inaccessible location";
		
	 }
       break;

	 /* To go South */
     case "Down":
       
	 if((mapLocation + 3) <= 8)
	 { 
		//Render the game
		 mapLocation += 3;
		 
	 }
      else
	 {
	   
	    gameMessage = "Inaccessible location";
	 
	 }
       break;
 
	 /* To go West */
     case "Left":
     // All west location' index 0, 3, 6 don't have 0 remainder 
	 if(mapLocation % 3 != 0)
	 { 
 
		mapLocation -= 1;
		
	 }
      else
	 {
	    gameMessage = "Inaccessible location";
	 } 
       break;
	   
   }

   render();
  /* setInterval(function(){ render(); }, 3000); */ 
}


function takeItem()
{
   
   item = document.getElementById("input").value;
	
   //Find the index number of the item in the items array
   var itemIndexNumber = itemInGame.indexOf(item);
   //alert("i said " + itemIndexNumber + "= "+  itemInGame[itemIndexNumber]);
   //Does the item exist in the game world and is it at the player's current location?
   if(itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === mapLocation )
   {
     output.innerHTML = "You take the " + item + ".";

     // Add the item to the player's backpack
     backpack.push(item); 
     // alert("backpack: " + backpack);
     
     // alert(" item in game " + itemInGame);
     // Display the item to be added in the backpack
     // We use itemInGame to view the item remove from the game
	 
	displayItem(itemInGame[itemIndexNumber]);
     
     // Remove the item from the game world
     // Once an item was remove the next item will take its spot in the array
     itemInGame.splice(itemIndexNumber, 1);
     itemLocations.splice(itemIndexNumber, 1);
     
     
     // Display in the console for testing
    /*  alert("World items: " + items);
     alert("backpack items: " + backpack); */
   }
   else
   {
     // Message if the player tries to take an item that isn't in the current location
     output.innerHTML = "You can't do that.";
   }
   
   	// Clear text on our input
   	input.value = "";
}

function dropItem()
{

   // Try to drop the item only if the backpack isn't empty
   if(backpack.length !== 0)
   {

     // Find the item's array index number in the backpack
     var backpackIndexNumber = backpack.indexOf(item);
          
     // The item is in the backpack if the backpackIndexNumber isn't -1
     if(backpackIndexNumber !== -1)
     {
        
      // Tell the player that the item has been dropped
      output.innerHTML  = "You drop the " + item + ".";
       
      // Add the item from the backpack to the game world
      itemInGame.push(backpack[backpackIndexNumber]);
      itemLocations.push(mapLocation);
       
      // Remove the item from the player's backpack
      backpack.splice(backpackIndexNumber, 1);
      //alert(itemInGame);
      
	  // Invoke this function once we remove the dropped item from the backpack
	  displayItem(itemInGame[itemIndexNumber]);

     }
     else
     {
           
      // Message if the player tries to drop something that's not in the backpack
      gameMessage = "You can't do that.";
      
     }
   }
   else
   {
	   
     // Message if the backpack is empty
     gameMessage = "You're not carrying anything.";
   
   }
}

function useItem()
{
alert("this works");
   //1. Find out if the item is in the backpack

   // Find the item's array index number in the backpack
   var backpackIndexNumber = backpack.indexOf(item);

   // If the index number is -1, then it isn't in the backpack.
   // Tell the player that he or she isn't carrying it.
   if(backpackIndexNumber === -1)
   {
      output.innerHTML= "You're not carrying it.";
   }

   // If there are no items in the backpack, then
   // tell the player the backpack is empty
   if(backpack.length === 0)
   {
      output.innerHTML+= " Your backpack is empty";
   }

   // 2. If the item is found in the backpack
   // figure out what to do with it
   if(backpackIndexNumber !== -1)
   {
     switch(item)
     {
	 
       case "flute":
          output.innerHTML= "Beautiful music fills the air.";
         break;

       case "sword":
         if(mapLocation === 3)
         {
            output.innerHTML= "You swing the sword and slay the dragon!";
         }
         else
         {
            output.innerHTML= "You swing the sword listlessly.";
         }
         break;
		
		// Actions made to get the flute item
		// Needs to get to location 1
       case "stone":
         if(mapLocation === 1)
         {
           
		    output.innerHTML= "You drop the stone in the well.";
		    output.innerHTML+= " A magical flute appears!";

		   //Remove the stone from the player's backpack
		   backpack.splice(backpackIndexNumber, 1);

		   //Add the flute to the world
		   items.push("flute");
		   itemLocations.push(mapLocation);
         
		 }
         else
         {
		 
            output.innerHTML= "You fumble with the stone in your pocket.";
         }
         break;
      }//end of switch

   }
}


function render()
{
	
   // Render the location
   // We have our image names are similar to index 
   image.src = "Images/" + mapLocation +".jpg";
   
   // Display the location name
   locName.innerHTML = map[mapLocation];
	  
   
   //Display an item if there's one in this location
   //1. Loop through all the game items
   for(var i = 0; i < itemInGame.length; i++)
   {
   	   
     // Find out if there's an item at this location
     if(mapLocation === itemLocations[i])
     { 
       // Display it 
       output.innerHTML += "<br>You can find the <strong>" + itemInGame[i] + "</strong> here.";
     }
	 
   }
   
   output.innerHTML += "<br><em>" + gameMessage + "</em>";
}

function displayItem(item)
{
    // check if item was added in the backpack
    if(backpack.indexOf(item) !== -1)
     {  
	
	// Create a new element for an item
	newItem = document.createElement("li");
        // Assign item string from back to our new element text node
	newItem.innerHTML = item;
	// alert(backpack[i])
	// add the new element node
	document.getElementById("itemIHave").appendChild(newItem);

     }
    else//if not then remove the item from the display
    {
	
        /*Problem to solve remove the li child of the ul element tag from html */

	// Create a new element for an item
	newItem = document.createElement("li");
        // Assign item string from back to our new element text node
	newItem.innerHTML = item;
	// alert(backpack[i])
	// add the new element node
	document.getElementById("itemIHave").appendChild(newItem);
	
    }    

}








