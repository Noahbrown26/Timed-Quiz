const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const Max_Scores = 5;


finalScore.innerText = mostRecentScore;


//finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {

saveScoreBtn.disabled = !username.value

});

saveHighScore = (e) => {
    e.preventDefault();
    console.log('saved');

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);

    highScores.sort( (a,b) => b.score - a.score)
        
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    console.log(highScores);

    username.value = '';

    return window.location.assign('./highscores.html');

}

