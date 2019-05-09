let playsBoard; // will become array holding each players choices


const winCombos = [
    [0, 1, 2], //top left - top right
    [3, 4, 5], //middle left - middle right
    [6, 7, 8], //bottom left- bottom right

    [0, 3, 6], //top left - bottom left
    [1, 4, 7], //middle top - middle bottom
    [2, 5, 8], //top right - bottom right

    [0, 4, 8], //top left - bottom right
    [2, 4, 6], //top right - bottom left
];
const cells = document.querySelectorAll('.cell');
const select = document.getElementById('players')

const players = [
    'X',
    'O',
];

let activePlayer;

function startGame(choice)
{
    select.style.display = 'none';
    choice == 'X' ? activePlayer = 0 : activePlayer = 1;
    console.log("Player " + players[activePlayer] + " is starting.");
    playsBoard = Array.from(Array(9).keys());
    initalizeCells();
}

function turnClick(cell)
{
            let target = cell.target.id;
            playsBoard[target] = players[activePlayer];
            document.getElementById(target).innerText = players[activePlayer];
            let gameWon = checkWin(playsBoard, players[activePlayer]);
            if (gameWon){
                gameOver(gameWon);
            } else {
                activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
            }
}

function checkWin(board, player)
{
    let plays = board.reduce((a, e, i) =>            // <------ididnt come up with this myself
        (e === player) ? a.concat(i) : a, []);

    let gameWon = null;

    for (let [index,win] of winCombos.entries()){
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon
}

function gameOver(gameWon)
{
    for (let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor =
            gameWon.player == 'X' ? "blue" : "red";
    }
    for (let i = 0; i < cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false);
    }
}

function initalizeCells()
{
    for (let i = 0; i < cells.length; i++)
    {
        cells[i].style.removeProperty('background-color');
        cells[i].innerText = '';
        cells[i].addEventListener('click', turnClick, false);
    }
}

function reset()
{
    initalizeCells();
    select.style.display = 'flex';
}
