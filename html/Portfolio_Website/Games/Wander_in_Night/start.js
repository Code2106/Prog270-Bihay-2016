

	var prevGame =  document.getElementById("prev");
	prevGame.addEventListener("click" , returnGame , false);
	 
	 
	 function returnGame()
	{
 
  		backpack = localStorage.getItem("allItems");
  		mapLocation = localStorage.getItem("loc");
		render();//display the saved location
		gameMessage = localStorage.getItem("msg");
		locName.innerHTML = localStorage.getItem("locname");
		details.innerHTML = localStorage.getItem("detail");
	
	}
	


