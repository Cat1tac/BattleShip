 const Ship = require ("./ships");

 //multiple gameboards will be created
function gameboard(player) {
    let shipAmount = 5;
    const rowlength = 10;
    const columnlength = 10;
    let board = []
    for (let r = 0; r < rowlength; r++){
        let row = [];
        for (let c = 0; c < columnlength; c++){
            row.push(0)
       }
       board.push(row);
    }
    createShips();
    //empty spaces will be 0, hit ships will be 1, missed spots will be 2

    function placeShip(ship, direction, row, column){
        ship.orientation = direction;
        if (direction === "vertical"){
            for(let i = 0; i < ship.length; i++){
                board[i + row][column] = ship;
            }
        } 
        if (direction === "horizontal"){
            for(let i = 0; i < ship.length; i++){
                board[row][i + column] = ship;
            }
        } 
    }
    
    function createShips() {
        const carrier = new Ship(5, "carrier");
        const battleship = new Ship(4, "battleship");
        const cruiser = new Ship(3, "cruiser");
        const submarine = new Ship(3, "submarine");
        const destroyer = new Ship(2, "destroyer");
        
        placeShip(carrier, "vertical", 1, 1);
        placeShip(battleship, "horizontal", 1, 4);
        placeShip(cruiser, "vertical", 3, 5);
        placeShip(submarine, "horizontal", 7, 1);
        placeShip(destroyer, "vertical", 6, 8);
    }

    function checkSunkShips(ship){
        if(ship){
            shipAmount--;
            if(shipAmount === 0){
                console.log("player x won");
            }
        }
    }

    return {
        player: player,
        board,
        receiveAttack: function(r,c) {
            if(typeof board[r][c] === "object"){
                console.log("hit!");
                checkSunkShips(board[r][c].isSunk());
                board[r][c] = 1;
                return true;
            }
            board[r][c] = 2;
            console.log("missed shot");
            return false;
        },
        moveShip: function(lr, lc, nr, nc) {
            const previous = board[lr][lc];
            if(previous.orientation === "vertical"){
                for(let i = 0; i < previous.length; i++){
                    if(board[nr + i] === undefined || typeof board[nr + i][nc] === "object"){
                        return false;
                    }
                }
                for(let i = 0; i < previous.length; i++){
                    board[nr + i][nc] = previous;
                    board[lr + i][lc] = 0;
                }
            } else {
                for(let i = 0; i < previous.length; i++){
                    if(typeof board[nr][nc + i] === "object" || board[nr][nc + i] === undefined){
                        return false;
                    }
                }
                for(let i = 0; i < previous.length; i++){
                    board[nr][nc + i] = previous;
                    board[lr][lc + i] = 0;
                }
            }
            console.log(board);
            return true
        }
    };
 }
//functions that will be tested: receive attack, moveship
module.exports = gameboard;
