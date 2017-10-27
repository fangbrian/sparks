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
	    
		$("#headerMessage").text("Who is the best match?");
	    if (data.result.is_complete) {
	    	var option1Votes = data.result.options[0].num_of_votes;
		    var option2Votes = data.result.options[1].num_of_votes;
		    var option3Votes = data.result.options[2].num_of_votes;
		    var highestNumberOfVotes = 0;

		    if (option1Votes >= highestNumberOfVotes) {
		    	highestNumberOfVotes = option1Votes;
		    } else {
		    	$('#option1ProfilePicture').attr("opacity", 0.5);
		    }

		    if (option2Votes >= highestNumberOfVotes) {
		    	highestNumberOfVotes = option2Votes;
		    } else {
		    	$('#option2ProfilePicture').attr("opacity", 0.5);
		    }

		    if (option3Votes >= highestNumberOfVotes) {
		    	highestNumberOfVotes = option3Votes;
		    } else {
		    	$('#option3ProfilePicture').attr("opacity", 0.5);
		    }

		    $("#headerMessage").text("We have a winner");
	    }
	    
	}).fail(function (e) { 
	    
	});
}

$(document).ready(function() { 
	fetchGame();

	var interval = setInterval(function() {
        fetchGame();
    }, 1000)
});