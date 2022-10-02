const scoreUI = document.querySelectorAll('.player-score')
const maxScoreUI = document.querySelector('#max-score')
const optionButtons = document.querySelectorAll('.game-button')
const playAgain = document.querySelector('.retry')
const winnerScreen = document.querySelector('.winners-screen')
let playerOneScore = 0;
let playerTwoScore = 0;
let playerOne, playerTwo, maxScore

for (let el of scoreUI) {
    el.dataset.team === '1' ? playerOne = el : playerTwo = el
}

for (let el of optionButtons) {
    el.addEventListener('click', () => {
        maxScoreUI.disabled = true
        maxScore = Number(maxScoreUI.value)

        if (el.dataset.addScore === '1') {
            playerOneScore = Number(playerOne.innerHTML)
            playerOneScore++
            playerOne.innerHTML = playerOneScore
        }
        else if (el.dataset.addScore === '2') {
            playerTwoScore = Number(playerTwo.innerHTML)
            playerTwoScore++
            playerTwo.innerHTML = playerTwoScore
        } else {
            playerOne.innerHTML = '0';
            playerTwo.innerHTML = '0';
            maxScoreUI.value = '5';
            maxScoreUI.disabled = false
        }

        checkForWinner();
    })
}

function checkForWinner() {
    let currentLeadScore = playerOneScore > playerTwoScore ? playerOneScore : playerTwoScore
    let currentLead = playerOneScore > playerTwoScore ? '1' : '2'

    if (currentLeadScore === maxScore) {
        greetWinner(playerOneScore, playerTwoScore, currentLead);
        console.log(`p${currentLead} wins!`);
        playerOne.innerHTML = '0';
        playerTwo.innerHTML = '0';
        playerOneScore = 0;
        playerTwoScore = 0;
        maxScoreUI.value = 5;
        maxScoreUI.disabled = false
    } else if (maxScore - currentLeadScore === 1 && playerOneScore === playerTwoScore) {
        console.log('overtime triggered')
        maxScore++
        maxScoreUI.value = maxScore
    }
}

function greetWinner(p1, p2, winner) {
    const finalScoresUI = document.querySelectorAll('.final-score');
    const winnerName = document.querySelector('.winner-name');
    winnerScreen.classList.add('visible');
    for (let el of finalScoresUI) {
        el.dataset.player === '1' ? el.innerHTML = p1 : el.innerHTML = p2;
    }
    winner === '1' ? winnerName.innerHTML = 'Player 1 Wins!' : winnerName.innerHTML = 'Player 2 Wins!'
}

playAgain.addEventListener('click', () => {
    winnerScreen.classList.remove('visible')
})