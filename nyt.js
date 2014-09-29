//define functions and variables at top
var YTkey = 'AIzaSyDNjLfwF-2d4-XHUd4PsMB49cU4LLejOxY';

function searchNYT(word){
	console.log(word);

	var NYTURL = 'http://api.nytimes.com/svc/movies/v2/reviews/search.jsonp?query&api-key=42063812dc9ae09594a07d4c014974ad:10:69849853&query=' + word;

	$.ajax({
		url: NYTURL,
		type: 'GET',
		dataType: 'jsonp',
		error: function(data){
			console.log("Oh no! Didn't work...");
		},
		success: function(data){
			console.log("Whoohoo!!");
			console.log(data);

			console.log("The Title");
			console.log(data.results[0].display_title);

			console.log("The Headline");
			console.log(data.results[0].headline);

			console.log("The Release Date");
			console.log(data.results[0].dvd_release_date);

			console.log("The Trailer");
			console.log(data.results[0].related_urls[4].suggested_link_text);

			var theSearchedTerm = data.results[0].display_title;
			var summary = data.results[0].summary_short;
			var theSearchedResults = data.results[0].headline;
			var DVDdate = data.results[0].dvd_release_date;
			var TrailerURL = data.results[0].related_urls[4].url;

			$('#theResults').html('<br>' + '<h4>' + theSearchedTerm + '</h4>' + '<h5>' + "SUMMARY: " + summary + '</h5><h3><i>' + "REVIEWER SENTIMENT: " + theSearchedResults + '</i></h3><h3>' + "RELEASED ON: " + DVDdate + '</h3>');
			makeYoutubeRequest(theSearchedTerm);
		}
	});
}

function makeYoutubeRequest(word){
	var url = 'https://www.googleapis.com/youtube/v3/search?';
	var myParams = 'part=snippet&q=' + word + '+film' + '&type=video&order=viewCount&key=';
	var myKey = YTkey;
	var myURL = url + myParams + myKey;
	console.log(word);

	$.ajax({
		url: myURL,
		type: 'GET',
		dataType: 'jsonp',
		error: function(data){
			console.log("We got problems");
			console.log(data.status);
		},
		success: function(data){
			console.log("WooHoo2!");
			console.log(data);

			//Get the video id
			var theVideoId = data.items[0].id.videoId;
			console.log(theVideoId);
			var embedString = '<iframe width="420" height="315" src="//www.youtube.com/embed/' + theVideoId + '" frameborder="0" allowfullscreen></iframe>';
			$('#theResults').append(embedString + '<br><br><br><br>');

		}
	});
}

$(document).ready(function(){
	console.log("We are loaded!");

	//button listener
	$('#theButton').click(function(){

		console.log("Clicked the button!");
		var searchTerm = $('#theInput').val();
		
		//function to make NYT API request
		searchNYT(searchTerm);

		});


});

console.log("Not ready!");