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

    //rows
    for(let r = 0; r < board.length; r++){
        const battlefieldRow = document.createElement('tr');
        battlefieldRow.classList.add('battlefieldRow');

        //columns
        for(let c = 0; c < board[r].length; c++){
            const battlefieldCell = document.createElement('td')
            battlefieldCell.classList.add('battlefieldCell');
            battlefieldCell.dataset.x = r;
            battlefieldCell.dataset.y = c;

            //places initial ship location
            if(board[r][c] !== 0){
                if(findShip(r,c)){
                    battlefieldCell.classList.add('battlefieldCell_busy');
                } else {
                    const shipLocation = document.createElement('div');
                    shipLocation.classList.add('ship');
                    shipLocation.dataset.length = board[r][c].length;
                    if (board[r][c].orientation === "vertical"){
                        shipLocation.classList.add('ship_v');
                        shipLocation.dataset.position = 'v';
                        shipLocation.style.height = (2 * shipLocation.dataset.length) + "em";
                    } else {
                        shipLocation.classList.add('ship_h');
                        shipLocation.dataset.position = 'h';
                        shipLocation.style.width = (2 * shipLocation.dataset.length) + "em";
                    }
                    
                    battlefieldCell.appendChild(shipLocation);
    
                    battlefieldCell.classList.add('battlefieldCell_busy');
                }
                
            } else {
                battlefieldCell.classList.add('battlefieldCell_empty');
            }
    
            battlefieldRow.appendChild(battlefieldCell);
        }
        battlefield.appendChild(battlefieldRow);
    }
    side.appendChild(battlefield);

    function findShip(r,c){
        //checks if a ship is already on the board
        if(board[r][c].orientation === "vertical"){
            for(let i = 0; i < board[r][c].length; i++){
                if(board[r - 1][c].name === board[r][c].name){
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            for(let i = 0; i < board[r][c].length; i++){
                if(board[r][c - 1].name === board[r][c].name){
                    return true;
                } else {
                    return false;
                }
            }
        }
        
    }
}