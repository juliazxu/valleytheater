//define functions and variables at top
var YTkey = 'AIzaSyDNjLfwF-2d4-XHUd4PsMB49cU4LLejOxY';

//defining NYT Movie Reviews API function to search their database
function searchNYT(word, callback){
	var NYTURL = 'http://api.nytimes.com/svc/movies/v2/reviews/search.jsonp?query&api-key=42063812dc9ae09594a07d4c014974ad:10:69849853&query=' + word;

	$.ajax({
		url: NYTURL,
		type: 'GET',
		dataType: 'jsonp',
		success: function(data){
			$('#loading').css("display", "none"); //displays loading gif when loading
			$('#theResults').css("display", "block"); //loads results when loaded
			if (data.num_results == '0'){
				$('#theResults').slickAdd("<div><h4>" + "NO RESULTS. TRY AGAIN." + "</h4></div>");

			} 
			else {
				console.log(data.results);
				max = data.results.length > 5 ? 5 : data.results.length;
				for (i=0; i<max; i++){
					res = data.results[i];
					var theSearchedTerm = res.display_title;
					var summary = res.summary_short;
					var theSearchedResults = res.headline;
					if (summary != ""){
					html = '<div>' + '<br>' + '<h4>' + theSearchedTerm + '</h4>' + '<h5>' + "SUMMARY: " + summary + '</h5><h3><i>' + "REVIEWER SENTIMENT: " + theSearchedResults + '</i></h3><h3><br>';
					makeYoutubeRequest(theSearchedTerm, html); //runs second API function to query corresponding YouTube video
					}
				}	
				
			}	
		}
	});
}

function makeYoutubeRequest(word, html){

	var url = 'https://www.googleapis.com/youtube/v3/search?';
	var myParams = 'part=snippet&q=' + word + '+film' + '&type=video&order=relevance&key=';
	var myKey = YTkey;
	var myURL = url + myParams + myKey;

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
			$('#theResults').slickAdd(html + embedString + '<br><br><br></div>');
		}
	});
}

function start(){

	//displays loading gif instead of empty results box
		
	}


$(document).ready(function(){
	console.log("We are loaded!");
	$('#theResults').slick();
	$('#form').submit(function(e){
		e.preventDefault();

		$('#loading').css("display", "initial");
		$('#theResults').css("display", "none");
		for (i=0;i<4;i++){
			$('#theResults').slickRemove(0);
		}
		var searchTerm = $('#theInput').val();
		
		//function to make NYT API request
		console.log("YAYA");
		searchNYT(searchTerm);
		return false;
	});

});
