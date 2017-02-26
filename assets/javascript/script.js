/*		Douglas Aquilino       February 25, 2017 
			RCB - "GifTastic" Homework #6 			  
            		script.js                  
*/
/*
 An array of strings called 'topics' populated with some
 'super villians' is created.  

 Then buttons are created and displayed on the page for each
 element in topics array. 

 When the user clicks on a button, 10 static, non-animated gif images 
 from the GIPHY API are place on the page.

 When the user clicks one of the still GIPHY images, the gif will animate.
 If the user clicks the gif again, it will stop playing.

 Under every gif, is displayed its rating (PG, G, so on).

 User input from an input box in a form on the page is taken 
 and added to the topics array. Then the buttons are once again
 rendered on the page. All when the 'submit' button is clicked.
*/


//Giphy API key.
const KEY = "&api_key=" + "dc6zaTOxFJmzC";

//Giphy endpoint url
const APIURL = "https://api.giphy.com/v1/gifs/search?q=";

//Topics Array
var topics = ["Dr. Evil","Joker","Dr. Doom","Lex Luthor","Magneto","Ultron"];


$(document).ready(function(){

	//Initially displays buttons in topics array when page loads.
	displayButtons();

	
	//Event handler for 'submit' button.
	//
	$("#submit-button").on("click", function(event){
		
		//Prevents default action from being triggered 
		event.preventDefault();
		 
		//Gets user data (newVillian) from input box
		var newVillian = $("#input-box").val();		
		 
		//If input box is not empty. Adds newVillan to 'topics'.
		//Calls displayButtons to render 'topics' into buttons. 
		if (newVillian !== "") 	 
		{
			topics.push(newVillian);

		 	displayButtons();
		}
		 	
		//Clears out the text in form.
		$("form")[0].reset();	
		
	});//END .on("click"

		

	//Event Handler for .topic-button(s)
	//When a .topic-button is clicked displayGifs if called,
	//passing in buttons "search-string" attr.
	//Note: Have to use Event Delegation for dynamiclly generated
	// elements
	$("#buttons-div").on("click",".topic-button", function(){

		displayGifs($(this).attr("search-string"));
	});


	//Event Handler for .gifs-img(s).
	//When a gif is clicked, changes it from still to 
	//animated or vise versa. 
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
	});//END on.("click"
	
});//END $(document).ready


//========================================================


//Creates a button for each element in 'topics' array
//appending them to #buttons-div.
function displayButtons()
{
	//'Clears out' div
	$("#buttons-div").empty();
	
	//Loop for each element in topics array.
	topics.forEach(function(element){
		
		//creates button element
		var newButton = $("<button>");		

		//removes leading and trailing spaces and replaces
		//any spaces with "+" for api search string.
		var searchString = element.trim().replace(" ", "+");
		
		//creates button attribute for search-string
		newButton.attr("search-string", searchString );
		
		//Adds classes and html to button
		newButton.addClass("topic-button btn-lg");
		newButton.html(element);
		
		//Appends button to div
		$("#buttons-div").append(newButton);
	});//END forEach

}//END displayButtons

//========================================================


//Using ajax and Giphy API queries Giphy for data on searchTerm.
//Parses returned JSON for images.fixed_height_small.url,
//images.fixed_height_small_still.url,  and .ratings properties.
//Using those properties creates a .thumbnail div, then appends
//the #gifs-div for display.
function displayGifs(searchTerm)
{
	//'Clears out' div
	$("#gifs-div").empty();
	
	var queryURL = APIURL + searchTerm + "&limit=10" + KEY;

	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) 
    {
    	// loop for each element in response.data array
    	response.data.forEach(function(element){

    		//creates new <div> will class .thumbnail
    		var newDiv = $("<div>");
    		newDiv.addClass("thumbnail");

    		//create a new <img> with class .gif-img
    		var gifImage = $("<img>");
    		gifImage.addClass("gif-img");
    		
    		//sets attribute for animation flag
    		gifImage.attr("animation", "false" );

    		//sets attribute for alt if image doesn't load
    		gifImage.attr("alt", "giphy-gif" );

    		//sets attribute for animated source
    		gifImage.attr("animated-src", element.images.fixed_height_small.url );
    		
    		//sets attribute for still source
    		gifImage.attr("still-src", element.images.fixed_height_small_still.url );

    		//initially sets image source to still source 
    		gifImage.attr("src", element.images.fixed_height_small_still.url);
    		
    		//create a new <h4> with rating info.
    		var rating = $("<h4>");
    		rating.html("Rated: " + element.rating.toUpperCase()); 
    		
    		
    		//Appends new <img> and new <h4> to new <div>
    		newDiv.append(gifImage);
    		newDiv.append(rating);

    		//Appends new <div> to #gifs-div
    		$("#gifs-div").append(newDiv);
    		
    	});//END forEach

   });//END $.ajax

}//END displayGifs