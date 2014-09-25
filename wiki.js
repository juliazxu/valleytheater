//define functions at top
function searchWikipedia(word){
	console.log(word);

	var WikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + word;

	$.ajax({
		url: WikiURL,
		type: 'GET',
		dataType: 'jsonp',
		error: function(data){
			console.log("Oh no! Didn't work...");
		},
		success: function(data){
			console.log("Whoohoo!!");
			console.log(data);

			console.log("The Term");
			console.log(data[0]);

			console.log("The Results")
			console.log(data[1]);

			var theSearchedTerm = data[0];
			var theSearchResults = data[1];


			$('#theResults').append('<h3>' + theSearchedTerm + '</h3>');
			for (var i=0; i < theSearchResults.length; i++){
				$('#theResults').append('<li>' + theSearchResults[i] + '</li>');
			}
		}

	});


}


$(document).ready(function(){
	console.log("We are loaded!");

	//button listener
	$('#theButton').click(function(){

		console.log("Clicked the button!");
		var searchTerm = $('#theInput').val();
		

		//function to make API request
		searchWikipedia(searchTerm);

		});


});

console.log("Not ready!");