import "./styles.css"
const Players = require("./players");

const playerOne = new Players("real");
const cpu = new Players("bot");
let moves = [];

setupBoard();
const startGamebutton = document.getElementById("startGame");
startGamebutton.addEventListener("click", () => {

});

function setupBoard(){
    //player one board
    const playerSide = document.querySelector('.playerSide');
    createBoard(playerOne.playerBoard.board, playerSide);
    moveShipPointClick();


    //enemy side
    const enemySide = document.querySelector('.enemySide');
    createBoard(cpu.playerBoard.board, enemySide);

    //moveActualShip(playerOne.playerBoard.board);
    //moveDomShip();
    playerTurn();
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
    });

    function cellsActive(ships, x, y){
        const playerCells = document.querySelectorAll(".playerSide > * > * > *");
        playerCells.forEach(cell => {
            cell.style.pointerEvents = "auto";
            cell.onclick = function(){
                const newX = parseInt(cell.dataset.x)
                const newY = parseInt(cell.dataset.y)
                playerOne.playerBoard.moveShip(x, y, newX, newY);
                if(ships[0].dataset.position === "v"){
                    for(let i = 0; i < ships.length; i++){
                        document.querySelector(`[data-x="${newX + i}"][data-y="${newY}"]`).appendChild(ships[i]);
                    }
                } else {
                    for(let i = 0; i < ships.length; i++){
                        document.querySelector(`[data-x="${newX}"][data-y="${newY + i}"]`).appendChild(ships[i]);
                    }
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

function moveActualShip(board){
    const ships = document.querySelectorAll('.playerSide > * > * > * > .ship');
    ships.forEach(ship => {
        ship.addEventListener("mousedown", () => {
            console.log(ship.id);
            board[ship.parentNode.dataset.x][ship.parentNode.dataset.y];
        });
    });
    

}


function moveDomShip(){
    const ships = document.querySelectorAll('.playerSide > * > * > * > .ship');
    let offsetX;
    let offsetY;

    ships.forEach(ship => {
        snapToBoard(ship);
        //movement of ship
        const move = (e) => {
            ship.style.left = `${e.clientX - offsetX}px`;
            ship.style.top = `${e.clientY - offsetY}px`;
        }

        ship.addEventListener("mousedown", (e) => {
            offsetX = e.clientX - ship.offsetLeft;
            offsetY = e.clientY - ship.offsetTop;
            console.log(`Ship ${ship.offsetLeft} ${ship.offsetTop}`);
            document.addEventListener("mousemove", move);
        });

        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", move);

        });
    });
}

function snapToBoard(ship){
    const cells = document.querySelectorAll('.battlefieldCell');

    cells.forEach(cell => {
        cell.addEventListener("mousedown", () => {
            console.log(`Cell X: ${cell.offsetLeft} Y: ${cell.offsetTop}`);
            console.log(`${cell.offsetLeft + 34} > ${ship.offsetLeft} >= ${cell.offsetLeft}`)
            if(cell.offsetLeft + 34 > ship.offsetLeft >= cell.offsetLeft && cell.offsetTop + 34 > ship.offsetTop >= cell.offsetTop){
                cell.style.background = "purple";
            }
                
        });
    });
    //find how to get ship offset and cell offset when ship is hovering over the cell
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
                
               /*
                if(findShip(r,c)){
                    battlefieldCell.classList.add('battlefieldCell_busy');
                } else {
                    const shipLocation = document.createElement('div');
                    shipLocation.classList.add('ship');
                    shipLocation.dataset.length = board[r][c].length;
                    if (board[r][c].orientation === "vertical"){

                        shipLocation.dataset.position = 'v';
                        shipLocation.style.height = (2 * shipLocation.dataset.length + 0.4) + "em";
                    } else {

                        shipLocation.dataset.position = 'h';
                        shipLocation.style.width = (2 * shipLocation.dataset.length + 0.4) + "em";
                    }
                    
                    battlefieldCell.appendChild(shipLocation);
    
                    battlefieldCell.classList.add('battlefieldCell_busy');
                }
                */
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

/* Everything i need to do
- Find someway to make ships snap in place (skip for now)
- allow players to place ships and randomize where bot places its ships
- make js follow the dom (basically done)
- add a "start game" button so players can setup board then actually play
- hide enemy board
- add win/lose screen once all players ships have been destroyed
- improve UX
*/