
	var showButton = document.querySelector("#show");
	var clearButton = document.querySelector("#clear"); 

	// Get our values from textbox
	var redInput = document.querySelector('#redVal'); 
	var greenInput = document.querySelector('#greenVal');
	var blueInput = document.querySelector('#blueVal');
	
	//Array of color values to be validated
	var colorVal = [redInput,greenInput,blueInput];
	
    //Create event listener
	showButton.addEventListener("click", showDiv, false);
	
	clearButton.addEventListener("click", clearColorHandler, false);

		
	function showDiv(e)
	{
	
		var r = parseInt(redInput.value);
		var g = parseInt(greenInput.value);
		var b = parseInt(blueInput.value);
		
		//check if all are valid value
		if(validateColorValues())
		{
		   
			resultColor.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
			alert(rgbToHex(r, g, b));
			resultColor.style.display = "block";
		 
			redInput.value = "";
			greenInput.value = "";
			blueInput.value = "";
		  
		  return;
		}
         		 
		 alert("Invalid Input");

	}

	function clearColorHandler() 
	{
	
		resultColor.style.backgroundColor = "OldLace";
	    alert("Color bar was cleared!");
	
	}

	function validateColorValues()
	{
		var num;

		for( i = 0; i < colorVal.length; i++)
		{
		
 			num = parseInt(colorVal[i]);

			if( !isNaN(num) || num < 0 || num > 255 )/*if nan is true we have invalid input however we hope it false because we need a numerical input*/
			{
				return false;
			}
			else
			{
				return true;
			}
			
		}
	}


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) 
{
    return "Hex is #" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}






