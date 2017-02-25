
//Giphy API key.
const KEY = "&api_key=" + "dc6zaTOxFJmzC";

//Giphy endpoint url
const APIURL = "https://api.giphy.com/v1/gifs/search?q=";

//Topics Array
var topics = ["Dr. Evil","Joker","Dr. Doom","Lex Luthor","Magneto","Ultron"];


$(document).ready(function(){

	//Initially displays buttons in topics array when page loads.
	displayButtons();

	$("#submit-button").on("click", function(event){
		
		 event.preventDefault();
		 
		 var stuff = $("#input-box").val();		
		 
	
		if (stuff !== "") 	 
		{
			topics.push(stuff);

		 	displayButtons();
		}
		 	
		//Clears out the previous text in form.
		$("form")[0].reset();	
		
	});//END .on("click"

		

	//Event Handler for topic buttons
	//When a topic button is clicked displayGifs if called,
	//passing the buttons "search-string" attr.
	//Note: Have to use Event Delegation for dynamiclly generated
	// elements
	$("#buttons-div").on("click",".topic-button", function(){

		displayGifs($(this).attr("search-string"));
	});


	//Event Handler for gifs.
	// When a gif is clicked, changes it from still to 
	// animated or vise versa. 
	$("#gifs-div").on("click",".gif-img", function(){
		
		//If "animation" attr is "false" (gif is still), 
		//changes "src" attr to "animated-src" attr and 
		//changes "animation" attr to "true"; 
		if(($(this).attr("animation"))=="false")
		{

			$(this).attr("src",$(this).attr("animated-src"));
		 	$(this).attr("animation", "true");
		}
		//Else, changes "src" attr to "still-src" attr and 
		//change "animation" attr to "false".
		else
		 { 	
		 	$(this).attr("src", $(this).attr("still-src"));
		 	$(this).attr("animation", "false");
		 }

	});
	

});//END $(document).ready


//========================================================


function displayButtons()
{
	$("#buttons-div").empty();
	
	//Loop for each element in topics array.
	topics.forEach(function(element){
		
		var newButton = $("<button>");		

		//removes leading and trailing spaces and replaces
		//any spaces with "+" for api search string.
		var searchString = element.trim().replace(" ", "+");
		
		//creates button attriute for search-string
		newButton.attr("search-string", searchString );
		
		newButton.addClass("topic-button btn-lg");
		newButton.html(element);
		$("#buttons-div").append(newButton);
	});//END forEach

}//END displayButtons

//========================================================

function displayGifs(searchTerm)
{

	$("#gifs-div").empty();
	
	var queryURL = APIURL + searchTerm + "&limit=10" + KEY;

	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) 
    {
    	// loop for each element in response.data array
    	response.data.forEach(function(element){


    		var newDiv = $("<div>");
    		newDiv.addClass("thumbnail");

    		var gifImage = $("<img>");
    		gifImage.addClass("gif-img");
    		
    		//sets attribute for animation flag
    		gifImage.attr("animation", "false" );

    		//sets attribute for animated source
    		gifImage.attr("animated-src", element.images.fixed_height.url );
    		
    		//sets attribute for still source
    		gifImage.attr("still-src", element.images.fixed_height_still.url );

    		gifImage.attr("src", element.images.fixed_height_still.url);
    		
    		//this gets rating info.
    		var rating = $("<h4>");
    		rating.html("Rated: " + element.rating.toUpperCase()); 
    		
    		newDiv.append(gifImage);
    		newDiv.append(rating);

    		$("#gifs-div").append(newDiv);
    		

    	});//END forEach

   });//END $.ajax

}//END displayGifs