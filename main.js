var origBoard;
const playerOne = 'O';
const playerTwo = 'X';
var currentPlayer = Math.round(Math.random() * (2 - 1) + 1);
console.log("Player " + currentPlayer + " is starting.");
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
startGame();

function startGame()
{
    origBoard = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++)
    {
        cells[i].innerText = '';
        cells[i].addEventListener('click', turnClick(cells[i]), false);
    }
}

function turnClick(cell)
{
    return function(){
        if(currentPlayer == 1)
        {
            origBoard[cell.id] = playerOne;
            cell.innerText = playerOne;
            currentPlayer++;
            console.log(origBoard);
        } else {
            origBoard[cell.id] = playerTwo;
            cell.innerText = playerTwo;
            currentPlayer--;
            console.log(origBoard);
        }

    }
}
