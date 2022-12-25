window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let timeLeft = 180;
    let elem = document.getElementById('gameTimer');

let timerId = setInterval(countdown, 1000);

function countdown() {
    if (timeLeft == 0) {
        clearTimeout(timerId);
        doSomething();
    } else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
    }
}

function doSomething() {
    alert("Times up GameOver")
}

let board = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''];
let currentPlayer = 'X';
let isGameActive = true;

const PLAYERX_WON = 'PLAYERX_WON!';
const PLAYERO_WON = 'PLAYERO_WON!';
const TIE = 'TIE!';


const winningConditions = [
    [0, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, 32, 33, 34],
    [35, 36, 37, 38, 39, 40, 41],
    [42, 43, 44, 45, 46, 47, 48],
    [0, 7, 14, 21, 28, 35, 42],
    [1, 8, 15, 22, 29, 36, 43],
    [2, 9, 16, 23, 30, 37, 44],
    [3,  10, 17, 24, 31, 38, 45],
    [4, 11, 18, 25, 32, 39, 46],
    [5, 12, 19, 26, 33, 40, 47],
    [6, 13, 20, 27, 34, 41, 48],
    [0, 8, 16, 24, 32, 40, 48],
    [6, 12, 18, 24, 30, 36, 42]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 15; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        const d = board[winCondition[3]];
        const e = board[winCondition[4]];
        const f = board[winCondition[5]];
        const g = board[winCondition[6]];
        if (a === '' || b === '' || c === '' || d === '' || e === '' || f === '' || g === '') {
            continue;
        }
        if (a === b && b === c && c === d && d === e && e === f && f === g) {
            roundWon = true;
            break;
        }

    }
    if(roundWon) {
        announce(currentPlayer == 'X' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
    }

    if(!board.includes(''))
    announce(TIE);
}

const announce = (type) => {
    switch(type){
        case PLAYERO_WON:
            announcer.innerHTML = 'Player <span class="playerO">O</span> Wins ! ! !';
            break;
            case PLAYERX_WON:
            announcer.innerHTML = 'Player <span class="playerX">X</span> Wins ! ! !';
            break;
            case TIE:
                announcer.innerText = 'TIE';
                    }
                    announcer.classList.remove('hide');
                };

                const isValidAction = (tile) => {
                    if (tile.innerText === 'X' || tile.innerText === 'O'){
                        return false;
                    }

                    return true;
                };

                const updateBoard = (index) => {
                    board[index] = currentPlayer
                }

                const changePlayer = () => {
                    playerDisplay.classList.remove(`player${currentPlayer}`);
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    playerDisplay.innerText = currentPlayer;
                    playerDisplay.classList.add(`player${currentPlayer}`);
                }

                const userAction = (tile, index) => {
                    if(isValidAction(tile) && isGameActive) {
                        tile.innerText = currentPlayer;
                        tile.classList.add(`player${currentPlayer}`);
                        updateBoard(index);
                        handleResultValidation();
                        changePlayer();
                    }
                }

                const resetBoard = () => {
                    board = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''];
                    isGameActive = true;
                    announcer.classList.add('hide');

                    if(currentPlayer === 'O') {
                        changePlayer();
                    }
                

                    tiles.forEach(tile => {
                        tile.innerText = '';
                        tile.classList.remove('playerX');
                        tile.classList.remove('playerO');
                    });
                }

                tiles.forEach( (tile, index) => {
                    tile.addEventListener('click', () => userAction (tile, index));
                });

resetButton.addEventListener('click', resetBoard);
});
