'use strict';

/*   VARIABLES   */
const params = {
	playerName: '',
	liczbaRund: '',
	playerScore: '',
	compScore: '',
	progress: []
};

const playerChoiceText = document.getElementById('player-choice');
const computerChoiceText = document.getElementById('computer-choice');
const output = document.getElementById('output');
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');
const moveWinner = document.getElementById('winner-looser');
const gameWinner = document.getElementById('winner');
const selectedMove = document.getElementsByClassName('player-move');
const resultTable = document.getElementById('round-winner');

const modalWinner = document.querySelector('#modal-overlay-winner');
const modalStart = document.querySelector('#modal-overlay-start');
const playerName = document.getElementById('player-name');
const roundsToPlay = document.getElementById('rounds');

const buttonPaper = document.getElementById('paper-button');
const buttonStone = document.getElementById('stone-button');
const buttonScisors = document.getElementById('scisors-button');
const buttonGra = document.getElementById('gra');
const gameButtons = [buttonPaper, buttonStone, buttonScisors];
const messages = document.querySelectorAll('.move-message');

output.innerHTML = `Kliknij "Zagramy?" aby wybrac ilość rund! <br><br>`;

/*   FUNCTIONS   */
const toggleButtonsColor = () => gameButtons.forEach(button => button.classList.toggle('disabled'));

const toggleMessagesVisibility = () => messages.forEach(message => message.classList.toggle('js-hidden'));

const disableButtons = () => {
	buttonPaper.disabled = true;
	buttonStone.disabled = true;
	buttonScisors.disabled = true;
	toggleButtonsColor();
}
disableButtons();

const enableButtons = () => {
	buttonPaper.disabled = false;
	buttonStone.disabled = false;
  buttonScisors.disabled = false;
  (() => gameButtons.forEach(button => button.classList.contains('disabled') ? button.classList.remove('disabled') : null))();
};

const displayPlayerMove = (playerMove) => {
	const choice = playerMove;
	playerChoiceText.innerHTML = `You played ${choice}`;
	return choice;
};

for ( let m = 0; m < selectedMove.length; m++ ) {
  selectedMove[m].addEventListener('click', (e) => {
    const played = e.target.getAttribute('id');
    let playerMove;
    if (played == 'paper-button'){
      playerMove = `Paper`;
    }
    else if (played == 'stone-button'){
      playerMove = `Stone`;
    }
    else {
      playerMove = `Scisors`;
    }
    roundWinner(playerMove, getComputerMoveDescription);
    gameOver();
  });
};

const getComputerMove = () => {
	return Math.round(Math.random()*2 +1);
};

const getComputerMoveDescription = () => {
  const computerChoice = getComputerMove();
	if (computerChoice == 1){
		computerChoiceText.innerHTML = `Computer played Paper`;
	}
	else if (computerChoice == 2){
		computerChoiceText.innerHTML = `Computer played Stone`;
	}
	else {
		computerChoiceText.innerHTML = `Computer played Scisors`;
	};
	return computerChoice;
};

const startGame = () => {
	params.playerName = document.getElementById('player-name').value;
	params.liczbaRund = document.getElementById('rounds').value;
	if (params.liczbaRund > 0) {
		output.innerHTML +=
			`Gramy do ${params.liczbaRund} wygranych rund. <br> Twój Ruch! <br>`;
    enableButtons();
    document.getElementById('player-choice').innerHTML = '';
    document.getElementById('computer-choice').innerHTML = '';
    (() => messages.forEach(message => message.classList.contains('js-hidden') ? message.classList.remove('js-hidden') : null))()
		document.getElementById('round-winner').innerHTML = '';
	}
	else {
		output.innerHTML += `Podaj liczbę, na przykład 10. <br><br>`;
	}
};

const gameOverCommon = () => {
  disableButtons();
  toggleMessagesVisibility();
  modalWinner.classList.add('show');
  moveWinner.innerHTML = ``;
  output.innerHTML = `Kliknij "Zagramy?" aby wybrac ilość rund! <br><br>`;
  playerName.value = ``;
  roundsToPlay.value = ``;
};

const gameOver = () => {
	if (params.playerScore == params.liczbaRund){
		gameWinner.innerHTML = `Koniec Gry. Wygrałeś`;
    gameOverCommon();
	}
	else if (params.compScore == params.liczbaRund){
		gameWinner.innerHTML = `Koniec Gry. Przegrałeś`;
    gameOverCommon();
	}
};

const roundWinner = (playerMove, getComputerMoveDescription) => {
	const player = displayPlayerMove(playerMove);
  const computer = getComputerMoveDescription();
  let compPlayed;

	if (computer == 1){	compPlayed = 'Paper';}
	else if (computer == 2){	compPlayed = 'Stone';}
  else { compPlayed = 'Scisors';}
  
	if ((player === 'Paper' && computer == 2) || (player === 'Stone' && computer == 3) || (player === 'Scisors' && computer == 1)){
		moveWinner.innerHTML = 'YOU WIN';
		params.playerScore++;
		playerScore.innerHTML = params.playerScore;
		params.progress.push({content: `YOU WIN! You played - ${player}  Computer played - ${compPlayed}. Result: ${params.playerScore} - ${params.compScore}`});
		progressCount();
	}
	else if ((player === 'Paper' && computer == 1) || (player === 'Stone' && computer == 2) || (player === 'Scisors' && computer == 3)) {
		moveWinner.innerHTML = 'DRAW';
		params.progress.push({content: 'DRAW'});
		progressCount();
	}
	else {
		moveWinner.innerHTML = 'YOU LOOSE';
		params.compScore++;
		computerScore.innerHTML = params.compScore;
		params.progress.push({content: 'YOU LOOSE! You played - ' + player + ' Computer played - ' + compPlayed + '.'
		+ ' Result: ' + params.playerScore + ' - ' + params.compScore});
		progressCount();
	}
};

const progressCount = () => {
	const resultTableParagraph = document.createElement('p');
  for (let x in params.progress) {
      resultTableParagraph.innerHTML = 'Round ' + params.progress.length + '. ' + params.progress[x].content;
      resultTable.appendChild(resultTableParagraph);
  }
};

const writeResult = () => {
	playerScore.innerHTML = params.playerScore;
	computerScore.innerHTML = params.compScore;
};

const resetScoreTable = () => {
	params.playerScore = 0;
	params.compScore = 0;
	params.progress = [];
	playerScore.innerHTML = 0;
	computerScore.innerHTML = 0;
	gameWinner.innerHTML = '';
	output.innerHTML = '';
};

buttonGra.addEventListener('click', () => {
	modalStart.classList.add('show');
	resetScoreTable();
});


/*   MODALS   */
(() => {
	const modals = document.querySelectorAll('.modal');
	const hideModal = (e) => {
		e.preventDefault();
		document.querySelector('#modal-overlay-winner').classList.remove('show');
		document.querySelector('#modal-overlay-start').classList.remove('show');
	};
	
	const closeButtons = document.querySelectorAll('.modal .close');
	for(let i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', hideModal);
	};

	document.querySelector('#start').addEventListener('click', (e) => {hideModal(e), startGame()});
	
	document.querySelector('#modal-overlay-winner').addEventListener('click', hideModal,);
	document.querySelector('#modal-overlay-start').addEventListener('click', hideModal);
	
	for(let i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', (e) => {
			e.stopPropagation();
		});
	};
})();