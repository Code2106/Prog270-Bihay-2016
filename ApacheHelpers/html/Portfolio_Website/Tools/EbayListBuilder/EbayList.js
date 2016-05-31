
//ebay template Elements 
var itemName = document.getElementById('itemName');
var itemDescription = document.getElementById('itemDescription');
var brand = document.getElementById('brand');
var model = document.getElementById('model');
var size = document.getElementById('size');
var power = document.getElementById('power');
var upc = document.getElementById('upc');
var cosmetic = document.getElementById('cosmetic'); 
var condition = document.getElementById('cond');
var test = document.getElementById('test');

// Form Elements
// Capture form element
var eFrom = document.getElementById('form');

// create an array for form element objects
var formIDArray = ['productName','summary','brand','model','size','power','upc','rate','condition','test'];


var submitButton = document.getElementById('submit');
submitButton.addEventListener("click",sendData,true);

function sendData()
{
	// loop through name of our string name of id from form element
	for( i = 0; i < formIDArray.length; ++i){
	  // set formIDArray[i](this return id name) to localStorage, use dom elements property from eFrom to return value
	 localStorage.setItem(formIDArray[i], eFrom.elements[formIDArray[i]].value);
	
	}
	
    // Good news: we are able to capture object from template after we sent the form action to template, we are also able to retain localstorage of productname
	// We may use sessionStorage.setItem('key', 'value'); or sessionStorage.getItem('key') to store data, i might try it;
	
}
	
// This will pass in values from local storage to our template element innerHTMl property
function getData(){

// Need to improve needs to clear labels without details or unused objects without details or optional field that are blank in our form must omitted in the template

// First check if the specific item we are looking for in localstorage is empty

    itemName.innerHTML = localStorage.getItem("productName");
		
	itemDescription.innerHTML =  localStorage.getItem("summary");

	brand.innerHTML = localStorage.getItem("brand");

	model.innerHTML = localStorage.getItem("model");

	size.innerHTML =  localStorage.getItem("size");

	power.innerHTML = localStorage.getItem("power");

	upc.innerHTML = localStorage.getItem("upc");

	cosmetic.innerHTML = localStorage.getItem("rate");

	condition.innerHTML = localStorage.getItem("condition");

	test.innerHTML = localStorage.getItem("test");
    
	// clear our localStorage after use
	localStorage.clear();
	
}
	
	



