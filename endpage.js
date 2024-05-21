username = document.getElementById('username');
saveScoreBtn = document.getElementById('saveScoreBtn');
finalScore = document.getElementById('finalScore');
mostRecentScore = localStorage.getItem('mostRecentScore');
highScores = JSON.parse(localStorage.getItem('highScores')) || [];


// function setQuestion(index) {
//     questionHeading.innerHTML = questions[index].question;
//     choice1.textContent = questions[index].choice1;
//     choice2.textContent = questions[index].choice2;
//     choice3.textContent = questions[index].choice3;
//     choice4.textContent = questions[index].choice4;
// }
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});


// function addEventListeners(rndIndex) {
//     for (let i = 1; i <= 4; i++) {
//         let choice = document.getElementById(`choice${i}`).querySelector('div');
//         choice.addEventListener('click', function() {
//             console.log(i,choice);
//             checkAnswer(i,rndIndex);
//         });
//     }
// }

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};