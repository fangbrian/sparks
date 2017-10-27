var option1VotesOld = 0;
var option2VotesOld = 0;
var option3VotesOld = 0;

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

		$('#option1ProfilePicture').css({opacity: 1});
		$('#option2ProfilePicture').css({opacity: 1});
		$('#option3ProfilePicture').css({opacity: 1});
	    
		$("#headerMessage").text("Who is the best match?");
		$(".votes_container").show();

		$('#option1ProfilePicture').css("borderWidth", "2px");
		$('#option2ProfilePicture').css("borderWidth", "2px");
		$('#option3ProfilePicture').css("borderWidth", "2px");
		

	    if (data.result.is_complete) {
	    	var option1Votes = data.result.options[0].num_of_votes;
		    var option2Votes = data.result.options[1].num_of_votes;
		    var option3Votes = data.result.options[2].num_of_votes;
		    var highestNumberOfVotes = 0;

		    if (option1Votes > highestNumberOfVotes) {
		    	highestNumberOfVotes = option1Votes;
		    } else {
		    	$('#option1ProfilePicture').css({opacity: 0.5});
		    }

		    if (option2Votes > highestNumberOfVotes) {
		    	highestNumberOfVotes = option2Votes;
		    } else {
		    	$('#option2ProfilePicture').css({opacity: 0.5});
		    }

		    if (option3Votes > highestNumberOfVotes) {
		    	highestNumberOfVotes = option3Votes;
		    } else {
		    	$('#option3ProfilePicture').css({opacity: 0.5});
		    }

		    if (highestNumberOfVotes == 0) {
		    	$("#headerMessage").text("Game Over. \n Nothing decided");
		    } else {
		    	$("#headerMessage").text("We have a winner. Sending bagel now...");
			}

			if (highestNumberOfVotes == option1Votes) {
				$('#option1ProfilePicture').css({opacity: 1});
				$('#option1ProfilePicture').css({height: 180});
				$('#option1ProfilePicture').css({width: 180});
				$('#option1ProfilePicture').css("borderWidth", "10px");
			} else {
				$('#option1ProfilePicture').css({opacity: 0.5});
			}

			if (highestNumberOfVotes == option2Votes) {
				$('#option2ProfilePicture').css({opacity: 1});
				$('#option2ProfilePicture').css({height: 180});
				$('#option2ProfilePicture').css({width: 180});
				$('#option2ProfilePicture').css("borderWidth", "10px");
			} else {
				$('#option2ProfilePicture').css({opacity: 0.5});
			}

			if (highestNumberOfVotes == option3Votes) {
				$('#option3ProfilePicture').css({opacity: 1});
				$('#option3ProfilePicture').css({height: 180});
				$('#option3ProfilePicture').css({width: 180});
				$('#option3ProfilePicture').css("borderWidth", "10px");
			} else {
				$('#option3ProfilePicture').css({opacity: 0.5});
			}

			$(".votes_container").hide();
	    } else { 
			var option1Votes = data.result.options[0].num_of_votes;
		    var option2Votes = data.result.options[1].num_of_votes;
		    var option3Votes = data.result.options[2].num_of_votes;
		    var highestNumberOfVotes = 0;

			if (option1VotesOld < option1Votes) {
				$('#option1ProfilePicture').animate({
					borderWidth: 10
				});
			} else {
				$('#option1ProfilePicture').css("borderWidth", "2px");
			}

			if (option2VotesOld < option2Votes) {
				$('#option2ProfilePicture').animate({
					borderWidth: 10
				});
			} else {
				$('#option2ProfilePicture').css("borderWidth", "2px");
			}

			if (option3VotesOld < option3Votes) {
				$('#option3ProfilePicture').animate({
					borderWidth: 10
				});
			} else {
				$('#option3ProfilePicture').css("borderWidth", "2px");
			}

			option1VotesOld = option1Votes;
			option2VotesOld = option2Votes;
			option3VotesOld = option3Votes;
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