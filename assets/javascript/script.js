/*		notes

	$(".gif-button").on("click")
	wont work after displayButtons is called.


*/

//GIPHY API KEY.
const KEY = "&api_key=" + "dc6zaTOxFJmzC";
const APIURL = "http://api.giphy.com/v1/gifs/search?q=";
var topics = ["cat","dog","horse","hamster","ferret","mice"];





$(document).ready(function(){

	//Initially displays buttons in topics array when page loads.
	displayButtons();
	
	

	$("#submit-button").on("click", function(event){
		
		 event.preventDefault();
		 
		 var stuff = $("#input-box").val();		
		 
		 topics.push(stuff);

		 displayButtons();
		
	});


	//Event Handler for Topic Buttons
	//Have to use Event Delegation for dynamiclly generated
	// elements
	$("#buttons-div").on("click",".topic-button", function(){
		displayGifs($(this).html());//change html attr data val
	});


	// Event Handler for gifs.
	//if animation is true (is animated)
	//change source to still-src.
	// change animation to "false"

	$("#gifs-div").on("click",".gif-img", function(){
		

		 if(($(this).attr("animation"))=="false")
		 {
	console.log("animation false");
		 	$(this).attr("src",$(this).attr("animated-src"));
		 	$(this).attr("animation", true);
		 }
		 else
		 {
	console.log("animation true");	 	
		 	$(this).attr("src", $(this).attr("still-src"));
		 	$(this).attr("animation", false);
		 }

	});
	

});//END $(document).ready


//========================================================


function displayButtons()
{
	$("#buttons-div").empty();

	
	topics.forEach(function(element){
		
		var newButton = $("<button>");		

		//var search = element;
		//search
		//parse space before and after
		//replace " " with "+" for attr data value
		//newButton.attr("data-value", data);
		
		newButton.addClass("topic-button");
		newButton.html(element);
		$("#buttons-div").append(newButton);

	});
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

    	response.data.forEach(function(element){

    		var x = $("<img>");
    		x.addClass("gif-img");
    		
    		//sets attribute for animation flag
    		x.attr("animation", false );

    		//sets attribute for animated source
    		x.attr("animated-src", element.images.fixed_width.url );
    		
    		//sets attribute for still source
    		x.attr("still-src", element.images.fixed_width_still.url );

    		x.attr("src", element.images.fixed_width_still.url);
    		
    		$("#gifs-div").append(x);


    	});

   });//END $.ajax



	
}//END displayGifs