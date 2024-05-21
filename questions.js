
// function checkAnswer(choiceNum,rndIndex) {
//     let correctChoice = questions[rndIndex].answer;
//     let selectedChoice = questions[rndIndex][`choice${choiceNum}`];
//     let label = document.querySelector(`label#choice${choiceNum}`);

//     if (selectedChoice === questions[rndIndex][`choice${correctChoice}`]) {
//         label.style.backgroundColor = '#208d36';
//         console.log('Correct answer');

//     } else {
//         console.log('Wrong answer');
//         label.style.backgroundColor = 'red';
//     }
// }

// // Start the quiz by setting the first question and adding event listeners
// // while (questions.length > 0){

//     let rndIndex = getRandomInteger(0, questions.length);
//     setQuestion(rndIndex);
//     addEventListeners();
//     questions.splice(rndIndex, 1);

// // }

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBar = document.getElementById("progressBarFull");

let questions = [   
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];

// // first functionality we will add is to check which choice is selected by the user.
// choice1 = document.getElementById('choice1').querySelector('div');
// choice2 = document.getElementById('choice2').querySelector('div');
// choice3 = document.getElementById('choice3').querySelector('div');
// choice4 = document.getElementById('choice4').querySelector('div');
// questionHeading = document.querySelector('.container h1');

// console.log(choice1, choice2, choice3, choice4, questionHeading);

// // now we will try to get the question and choices from the array and set them to the choice boxes using Math.random() method.

// min = 0;


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

//     if (selectedChoice === questions[rndIndex][`choice${correctChoice}`]) {
//         label.style.backgroundColor = '#208d36';
//         console.log('Correct answer');

//     } else {
//         console.log('Wrong answer');
//         label.style.backgroundColor = 'red';
//     }
// }

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

//     let rndIndex = getRandomInteger(0, questions.length);
//     setQuestion(rndIndex);
//     addEventListeners();
//     questions.splice(rndIndex, 1);

// // }

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("endpage.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();