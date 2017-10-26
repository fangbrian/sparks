function fetchGame() { 
	$.ajax({
	    type: 'GET',
	    datatype: 'json',
	    url: '/game'
	}).done(function (data) {
	    console.log(data);
	    $('#option1Votes').text(data.result.options[0].num_of_votes);
	    $('#option2Votes').text(data.result.options[1].num_of_votes);
	    $('#option3Votes').text(data.result.options[2].num_of_votes);

	    $('#option1ProfilePicture').attr("src", data.result.options[0].img_url);
	    $('#option2ProfilePicture').attr("src", data.result.options[1].img_url);
	    $('#option3ProfilePicture').attr("src", data.result.options[2].img_url);

		$("#profilePicture").attr("src", data.result.profile[0].img_url);
	    
	    
	}).fail(function (e) { 
	    
	});
}

$(document).ready(function() { 
	fetchGame();

	var interval = setInterval(function() {
        fetchGame();
    }, 1000)
});