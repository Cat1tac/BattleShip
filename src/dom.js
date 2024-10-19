import "./styles.css"
const Players = require("./players");

const playerOne = new Players("real");
const cpu = new Players("bot");

domBoard();
function domBoard(){
    //player one board
    const playerSide = document.querySelector('.playerSide');
    console.log(playerOne.playerBoard.board);

    const playerBattlefield = document.createElement('table');
    playerBattlefield.classList.add('battlefield');

    for(let r = 0; r < playerOne.playerBoard.board.length; r++){
        const battlefieldRow = document.createElement('tr');
        battlefieldRow.classList.add('battlefieldRow');

        for(let c = 0; c < playerOne.playerBoard.board[r].length; c++){
            const battlefieldCell = document.createElement('td')
            battlefieldCell.classList.add('battlefieldCell');
            battlefieldCell.classList.add('battlefieldCell_empty');

            battlefieldRow.appendChild(battlefieldCell);
        }
        playerBattlefield.appendChild(battlefieldRow);
    }
    playerSide.appendChild(playerBattlefield);

    //enemy side
    const enemySide = document.querySelector('.enemySide')
}