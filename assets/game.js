const question = document.getElementById('question');
const choices = Array.from( document.getElementsByClassName('choice-text'));
var timerEl = document.getElementById('countdown');

let currentQuestion = {};
let acceptingAnswers = false;
let timeLeft = 44;
let availableQuestions = [];


    // Question Objects //

let questions = [
    {
        question: "Commonly used data types DO Not Inlude:",
        choice1: "Strings",
        choice2: "Booleans",
        choice3: "Alerts",
        choice4: "Numbers",
        answer: 3
    },
    {
        question: "The condition in an if / else statement is enclosed with _______.",
        choice1: "Quotes",
        choice2: "Curly Brackets",
        choice3: "Paranthesis",
        choice4: "Square Brackets",
        answer: 2
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        choice1: "Numbers and Strings",
        choice2: "Other Arrays",
        choice3: "Booleans",
        choice4: "All of the Above",
        answer: 4
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        choice1: "Commas",
        choice2: "Curly Brackets",
        choice3: "Quotes",
        choice4: "Paranthesis",
        answer: 3
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger:",
        choice1: "JavaScript",
        choice2: "Terminal / Bash",
        choice3: "For Loops",
        choice4: "Console.log",
        answer: 4
    },
];

// Function that starts game//

startGame = () => {
availableQuestions = [...questions];
getNewQuestion();
};

// function that fetches new questions //

getNewQuestion = () => {


    // send user to end screen if timer or questions run out //

    if(availableQuestions.length === 0 || timeLeft === 0){

        localStorage.setItem('mostRecentScore', timeLeft);


        return window.location.assign('endscreen.html');
    }

        countdown.innerText = "time:" + timeLeft;


    // Randomly pulls questions & answers from the arrays and sets the text using the appropriate data numbers //

const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })    
    
    // remove most recent question from available questions //

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

    // After answering a question, get a new question //

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let applyClass = 'incorrect';
            if (selectedAnswer == currentQuestion.answer) {
            applyClass = 'correct';
        }  
        
        if (applyClass == 'incorrect') {
            timeLeft -= 5;
            timerEl.innerText = "-5" ;
        }

        selectedChoice.parentElement.classList.add(applyClass);
        
        setTimeout( () =>  {
        selectedChoice.parentElement.classList.remove(applyClass);
        getNewQuestion();

        }, 1000 );

    });
});


    // Countdown function to tick down the timer every second and also reduce time if the player answers incorrect //

function countdown() {
  
    var timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timerEl.textContent = 'Time: ' + timeLeft;
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = 'Time: ' + timeLeft;
        timeLeft--;
      } else {
        clearInterval(timeInterval);
        return window.location.assign('endscreen.html');
      }
    }, 1000);
  }

        // Calling Game Functions //

startGame();
countdown();



