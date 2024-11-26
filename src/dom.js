import Ship from "./ships";
import "./styles.css"
const Players = require("./players");

const playerOne = new Players("real");
const cpu = new Players("bot");
let moves = [];

setupBoard();
const startGamebutton = document.getElementById("startGame");
startGamebutton.addEventListener("click", () => {
    const playerShips = document.querySelectorAll(".playerSide > * > * > * > .ship");
        playerShips.forEach(ship => {
        ship.style.pointerEvents = "none";
    });

    const enemySide = document.querySelector('.enemySide');
    enemySide.style.pointerEvents = "auto";

    playerTurn();
});

function setupBoard(){
    //player one board
    const playerSide = document.querySelector('.playerSide');
    createBoard(playerOne.playerBoard.board, playerSide);
    moveShipPointClick();

    //enemy side
    const enemySide = document.querySelector('.enemySide');
    enemySide.style.pointerEvents = "none";
    createBoard(cpu.playerBoard.board, enemySide);

    //moveActualShip(playerOne.playerBoard.board);
    //moveDomShip();
}

function moveShipPointClick(){
    const playerShips = document.querySelectorAll(".playerSide > * > * > * > .ship");
    playerShips.forEach(ship => {
        //Highlight Ships
        ship.addEventListener("mouseenter", () => {
            document.querySelectorAll(`.playerSide > * > * > * > #${ship.id}`).forEach(wholeShip => {
                wholeShip.style.borderColor = "purple";
            });
        });
        ship.addEventListener("mouseleave", () => {
            document.querySelectorAll(`.playerSide > * > * > * > #${ship.id}`).forEach(wholeShip => {
                wholeShip.style.borderColor = "rgb(73, 0, 0)";
            });   
        });

        //Click on Ships
        ship.addEventListener("click", (e) => {
            e.stopPropagation();
            const wholeShip = document.querySelectorAll(`.playerSide > * > * > * > #${ship.id}`);
            const x = parseInt(wholeShip[0].parentElement.dataset.x);
            const y = parseInt(wholeShip[0].parentElement.dataset.y);
            
            cellsActive(wholeShip, x, y);
        });

        ship.addEventListener("dblclick", (e) => {
            e.stopPropagation();
            const wholeShip = document.querySelectorAll(`.playerSide > * > * > * > #${ship.id}`);
            const x = parseInt(wholeShip[0].parentElement.dataset.x);
            const y = parseInt(wholeShip[0].parentElement.dataset.y);

            if(playerOne.playerBoard.rotateShip(x, y)){
                if(wholeShip[0].dataset.position === "v"){
                    for(let i = 0; i < wholeShip.length; i++){
                        //Nakes vertical ships horizontal in dom
                        wholeShip[i].dataset.position = "h";
                        document.querySelector(`[data-x="${x}"][data-y="${y + i}"]`).appendChild(wholeShip[i]);
                    }
                } else {
                    for(let i = 0; i < wholeShip.length; i++){
                        //updates vertical ships in dom
                        wholeShip[i].dataset.position = "v";
                        document.querySelector(`[data-x="${x + i}"][data-y="${y}"]`).appendChild(wholeShip[i]);
                    }
                }
            } else {
                //Notify player they cannot rotate their ship there
            }
            
        });
    });

    function cellsActive(ships, x, y){
        const playerCells = document.querySelectorAll(".playerSide > * > * > *");
        playerCells.forEach(cell => {
            cell.style.pointerEvents = "auto";
            cell.onclick = function(){
                const newX = parseInt(cell.dataset.x);
                const newY = parseInt(cell.dataset.y);

                //updates ships in console
                if(playerOne.playerBoard.moveShip(x, y, newX, newY)){
                    if(ships[0].dataset.position === "v"){
                        for(let i = 0; i < ships.length; i++){
                            //updates vertical ships in dom
                            document.querySelector(`[data-x="${newX + i}"][data-y="${newY}"]`).appendChild(ships[i]);
                        }
                    } else {
                        for(let i = 0; i < ships.length; i++){
                            //updates horizontal ships in dom
                            document.querySelector(`[data-x="${newX}"][data-y="${newY + i}"]`).appendChild(ships[i]);
                        }
                    }
                } else {
                    //Notify player they cannot move their ship there
                }
                
                playerCells.forEach(cell => {
                    cell.style.pointerEvents = "none";
                });

                const playerShips = document.querySelectorAll(".playerSide > * > * > * > .ship");
                playerShips.forEach(ship => {
                    ship.style.pointerEvents = "auto";
                });

                cell.onclick = null;
            };
        });
    }
}

function playerTurn(){
    const enemyCells = document.querySelectorAll('.enemySide > * > * > *');
    enemyCells.forEach(cell => {
        cell.addEventListener("click", () => {
            const x = cell.dataset.x;
            const y = cell.dataset.y;
            if(cpu.playerBoard.receiveAttack(x,y)) {
                //if hit ship
                cell.classList.add("hitSpot");
                cell.removeChild(cell.firstChild);
            } else {
                //if missed ship
                cell.classList.add("missedSpot");
            }
            botTurn();
        });
    });
}

function botTurn(){
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);

    if(moves.includes(cell)){
        botTurn();
    }

    if(playerOne.playerBoard.receiveAttack(x,y)){
        //if hit ship
        cell.classList.add("hitSpot");
        cell.removeChild(cell.firstChild);
    } else {
        //if missed ship
        if(!cell.classList.contains("hitSpot")){
            cell.classList.add("missedSpot");
        }   
    }
    moves.push(cell); 
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
            if(board[r][c] instanceof Ship){
                const shipLocation = document.createElement('div');
                shipLocation.classList.add('ship');
                shipLocation.dataset.length = board[r][c].length;
                shipLocation.id = board[r][c].name;
                if (board[r][c].orientation === "vertical"){
                    shipLocation.dataset.position = 'v';
                } else {
                    shipLocation.dataset.position = 'h';
                }

                battlefieldCell.appendChild(shipLocation);
    
                battlefieldCell.classList.add('battlefieldCell_busy');
                
            } else {
                battlefieldCell.classList.add('battlefieldCell_empty');
            }
    
            battlefieldRow.appendChild(battlefieldCell);
        }
        battlefield.appendChild(battlefieldRow);
    }
    side.appendChild(battlefield);
}

/* Everything i need to do
- Associate "1" with corresponding ship or figure out another way to move and rotate ships without 1's preventing it
- hide enemy board
- add win/lose screen once all players ships have been destroyed
- improve UX
*/