import "./styles.css"
const Players = require("./players");

const playerOne = new Players("real");
const cpu = new Players("bot");

domBoard();
function domBoard(){
    //player one board
    const playerSide = document.querySelector('.playerSide');
    console.log(playerOne.playerBoard.board);

    createBoard(playerOne.playerBoard.board, playerSide);

    //enemy side
    const enemySide = document.querySelector('.enemySide');
    createBoard(cpu.playerBoard.board, enemySide);

}

function createBoard(board, side){
    const battlefield = document.createElement('table');
    battlefield.classList.add('battlefield');

    for(let r = 0; r < board.length; r++){
        const battlefieldRow = document.createElement('tr');
        battlefieldRow.classList.add('battlefieldRow');

        for(let c = 0; c < board[r].length; c++){
            const battlefieldCell = document.createElement('td')
            battlefieldCell.classList.add('battlefieldCell');
            battlefieldCell.dataset.x = r;
            battlefieldCell.dataset.y = c;

            if(board[r][c] !== 0){
                battlefieldCell.classList.add('battlefieldCell_ship');
            } else {
                battlefieldCell.classList.add('battlefieldCell_empty');
            }
    
            battlefieldRow.appendChild(battlefieldCell);
        }
        battlefield.appendChild(battlefieldRow);
    }
    side.appendChild(battlefield);
}