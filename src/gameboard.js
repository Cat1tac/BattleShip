 const Ship = require ("./ships");

 //multiple gameboards will be created
function gameboard(player) {
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
    //empty spaces will be 0, ships will be ones, and hit spots will be 2

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

        console.log(board)
    }

    return {
        player: player,
        receiveAttack: function(r,c) {
            if(typeof board[r][c] === "object"){
                return true;
            }
            return false;
        }
    };
 }

 const player1 = gameboard('cpu');
 player1;

//functions that will be tested: receive attack, moveship
module.exports = player1;