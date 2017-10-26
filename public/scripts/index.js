function fetchGame() { 
	$.ajax({
	    type: 'GET',
	    datatype: 'json',
	    url: '/game'
	}).done(function (data) {
	    console.log(data);
	    $('#option1').text(data.result.options[0].num_of_votes);
	    $('#option2').text(data.result.options[1].num_of_votes);
	    $('#option3').text(data.result.options[2].num_of_votes);
	    
	}).fail(function (e) { 
	    
	});
}

$(document).ready(function() { 
	fetchGame();

	var interval = setInterval(function() {
        fetchGame();
    }, 1000)
});