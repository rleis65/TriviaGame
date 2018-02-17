var triviaQuestions = [{
	question: "What is the correct airport code for Chicago O'Hare International airport?",
	answerList: ["CHI", "ORD", "OHI", "CGO"],
	answer: 1
},{
	question: "What airline has a major hub at Hartsfield-Jackson Atlanta International airport?",
	answerList: ["United Airlines", "JetBlue", "Delta Airlines", "American Airlines"],
	answer: 2
},{
	question: "What airline used to be headquarted in Kansas City, MO?",
	answerList: ["American", "TWA", "Frontier", "PanAm"],
	answer: 1
},{
	question: "To date, what is the best-selling commercial airliner of all time?",
	answerList: ["Boeing 727", "Airbus A320", "Boeing 737", "Boeing 747"],
	answer: 2
},{
	question: "What was John F. Kennedy International Airport called prior to being named after the former US president?",
	answerList: ["Idlewild Airport", "New York-Queens Airport", "LaGuardia Airport", "New York International Airport"],
	answer: 0
},{
	question: "What is the correct airport code for George Bush Intercontinental Airport(Houston)?",
	answerList: ["GEB", "HOU", "HST", "IAH"],
	answer: 3
},{
	question: "What was the name of Denver's airport prior to the opening of the new airport in 1995?",
	answerList: ["Denver International Airport", "Rocky Mountain High Airport", "Stapelton Intenational Airport", "Coors International Airport"],
	answer: 2
},{
	question: "What major airport in the U.S. is widely considered by pilots to be the most dangerous at which to land?",
	answerList: ["Denver International Airport", "Miami International Airport", "Seattle-Tacoma International Airport", "San Diego International Airport"],
	answer: 3
},{
	question: "What is the correct airport code for Orlando International Airport?",
	answerList: ["MCO", "ORL", "ODO", "OIA"],
	answer: 0
},{
	question: "Which of the following is the busiest hub for United Airlines?",
	answerList: ["San Francisco Int'l", "George Bush Intercontinental", "Chicago O'Hare Int'l", "Denver Int'l"],
	answer: 2
},{
	question: "Which of the following is not a hub for Delta Airlines?",
	answerList: ["Philadelphi Int'l", "Hartsfield-Jackson Atlanta Int'l", "Salt Lake City Int'l", "Detroit Metropolitan Airport"],
	answer: 0
},{
	question: "What was the destination of the very first departure from the new Denver Int'l Airport?",
	answerList: ["Los Angeles Int'l", "Chicago O'Hare Int'l", "Memphis Int'l", "Kansas City Int'l"],
	answer: 3
},{
	question: "From what airport did US Airways 1549, 'The Miracle on the Hudson', depart?",
	answerList: ["LaGuardia Airport", "JFK Int'l", "Newark Int'l", "Boston Logan Int'l"],
	answer: 0
},{
	question: "At what airport is the major air hub and sorting facility for UPS located?",
	answerList: ["Memphis Int'l", "Dallas-Fort Worth Int'l", "Cleveland Hopkins Int'l", "Louisville Int'l"],
	answer: 3
},{
	question: "What airline was the first customer for the Boeing 747?",
	answerList: ["TWA", "United Airlines", "Northwest Airlines", "PanAm World Airways"],
	answer: 3
}];

var picArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Correct--Cleared for takeoff!",
	incorrect: "Negative Ghostrider, pattern is full.",
	endTime: "Time's up!",
	finished: "Let's see how you did!"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#pic').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 20;
	$('#timeLeft').html('<h3>Time Left: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Left: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#pic').html('<img src = "assets/images/'+ picArray[currentQuestion] +'.jpg" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#pic').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}