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
    if(player === "bot"){
        randomizeBotShips();
    } else {
        createPlayerShips();
    }

    //Border of ships
    function B(ship) {
        this.shipBorder = ship.name;
    }
    
    //empty spaces will be 0, b will be area around ships

    function placeShip(ship, direction, r, c){
        ship.orientation = direction;
        if (direction === "vertical"){
            for(let i = 0; i < ship.length; i++){
                board[r + i][c] = ship;

                addBorders(r, c, ship, i);
            }
        } 
        if (direction === "horizontal"){
            for(let i = 0; i < ship.length; i++){
                board[r][c + i] = ship;

                addBorders(r, c, ship, i);
            }
        } 
    }
    
    function createPlayerShips() {
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

        console.log(board);
    }

    function randomizeBotShips() {
        const carrier = new Ship(5, "carrier");
        const battleship = new Ship(4, "battleship");
        const cruiser = new Ship(3, "cruiser");
        const submarine = new Ship(3, "submarine");
        const destroyer = new Ship(2, "destroyer");

        let randR = Math.floor(Math.random() * 10);
        let randC = Math.floor(Math.random() * 10); 
        let randOrientation = Math.floor(Math.random() * 2);

        placeBotShip(carrier, randR, randC, randOrientation);
        placeBotShip(battleship, randR, randC, randOrientation);
        placeBotShip(cruiser, randR, randC, randOrientation);
        placeBotShip(submarine, randR, randC, randOrientation);
        placeBotShip(destroyer, randR, randC, randOrientation);

        function placeBotShip(ship, r, c, orientation){
            if(orientation === 0){
                for(let i = 0; i < ship.length; i++){
                    //checks if placement is legal and runs function again if not
                    if(board[r + i] === undefined || typeof board[r + i][c] === "object"){
                        randR = Math.floor(Math.random() * 10);
                        randC = Math.floor(Math.random() * 10); 
                        randOrientation = Math.floor(Math.random() * 2);
                        placeBotShip(ship, randR, randC, randOrientation);
                        return;
                    }
                }
                for(let i = 0; i < ship.length; i++){
                    ship.orientation = "vertical";
                    board[r + i][c] = ship;

                    addBorders(r, c, ship, i);
                }
            } else { 
                for(let i = 0; i < ship.length; i++){
                    //checks if placement is legal and runs function again if not
                    if(board[r][c + i] === undefined || typeof board[r][c + i] === "object"){
                        randR = Math.floor(Math.random() * 10);
                        randC = Math.floor(Math.random() * 10); 
                        randOrientation = Math.floor(Math.random() * 2);
                        placeBotShip(ship, randR, randC, randOrientation);
                        return;
                    }
                }
                for(let i = 0; i < ship.length; i++){
                    ship.orientation = "horizontal";
                    board[r][c + i] = ship;

                    addBorders(r, c, ship, i);
                }
            }
        }
    }

    function addBorders(r, c, ship, i){
        const b = new B(ship)
        if(ship.orientation === "vertical"){
            //right side of ship
            if(board[r + i][c + 1] !== undefined){
                board[r + i][c + 1] = b;
            }
            //left side of ship
            if(board[r + i][c - 1] !== undefined){
                board[r + i][c - 1] = b;
            } 
            //top of ship
            if(i === 0){
                if(board[r - 1] !== undefined){
                    board[r - 1][c] = b;
                }
            }
            //bottom of ship
            if(i === ship.length - 1){
                if(board[r + ship.length] !== undefined){
                    board[r + ship.length][c] = b;
                }
            }  
        } else {
            //top side of ship
            if(board[r - 1] !== undefined){
                board[r - 1][c + i] = b;
            }
            //bottom side of ship
            if(board[r + 1] !== undefined){
                board[r + 1][c + i] = b;
            } 
            //left of ship
            if(i === 0){
                if(board[r][c - 1] !== undefined){
                    board[r][c - 1] = b;
                }
            }
            //right of ship
            if(i === ship.length - 1){
                if(board[r][c + ship.length] !== undefined){
                    board[r][c + ship.length] = b;
                }
            }  
        }
    }

    function reAddAllBorders(){
        let covered = [];
        for(let r = 0; r < board.length; r++){
            for(let c = 0; c < board[r].length; c++){
                if(!covered.includes(board[r][c].name) && typeof board[r][c] === "object"){
                    covered.push(board[r][c].name);
                    for(let i = 0; i < board[r][c].length; i++){
                        addBorders(r, c, board[r][c], i);
                    }
                }
            }
        }
    }

    function deleteAllBorders(){
        for(let r = 0; r < board.length; r++){
            for(let c = 0; c < board[r].length; c++){
                if(board[r][c] instanceof B){
                    board[r][c] = 0;
                }
            }
        }
    }

    return {
        player: player,
        board,
        receiveAttack: function(r,c) {
            if(board[r][c] instanceof Ship){
                return true;
            }
            board[r][c] = 2;
            return false;
        },
        checkSunkShips: function(r,c){
            if(!(board[r][c] instanceof Ship)){
                return false;
            }
            if(board[r][c].isSunk()){
                shipAmount--;
                if(shipAmount === 0){
                    return true;
                } 
            }
            board[r][c] = 1;
            return false;
        },
        moveShip: function(lr, lc, nr, nc) {
            const previous = board[lr][lc];
            if(previous.orientation === "vertical"){
                for(let i = 0; i < previous.length; i++){
                    //checks if move is legal
                    if(board[nr + i] === undefined || board[nr + i][nc] !== 0 && board[nr + i][nc].shipBorder !== previous.name && board[nr + i][nc].name !== previous.name){
                        return false;
                    }
                }
                for(let i = 0; i < previous.length; i++){
                    board[nr + i][nc] = previous;
                    board[lr + i][lc] = 0;
                }
            } else {
                for(let i = 0; i < previous.length; i++){
                    //checks if move is legal
                    if(board[nr][nc + i] === undefined || board[nr][nc + i] !== 0 && board[nr][nc + i].shipBorder !== previous.name && board[nr][nc + i].name !== previous.name){
                        return false;
                    }
                }
                for(let i = 0; i < previous.length; i++){
                    board[nr][nc + i] = previous;
                    board[lr][lc + i] = 0;
                }
            }

            //rerenders borders
            deleteAllBorders();
            reAddAllBorders()
            console.log(board);
            return true;
        },
        rotateShip: function(r, c) {
            if(board[r][c].orientation === "vertical"){
                for(let i = 1; i < board[r][c].length; i++){
                    //checks if move is legal
                    if(board[r][c + i] === undefined || board[r][c + i] !== 0 && board[r][c + i].shipBorder !== board[r][c].name){
                        return false;
                    }
                }
                for(let i = 1; i < board[r][c].length; i++){
                    board[r + i][c] = 0;
                    board[r][c + i] = board[r][c];
                    board[r][c].orientation = "horizontal";
                }
            } else {
                for(let i = 1; i < board[r][c].length; i++){
                    //checks if move is legal
                    if(board[r + i] === undefined || board[r + i][c] !== 0 && board[r + i][c].shipBorder !== board[r][c].name){
                        return false;
                    }
                }
                for(let i = 1; i < board[r][c].length; i++){
                    board[r][c + i] = 0;
                    board[r + i][c] = board[r][c];
                    board[r][c].orientation = "vertical";
                }
            }
            //rerenders borders
            deleteAllBorders();
            reAddAllBorders()
            console.log(board);
            return true;
        }
    };
 }
//functions that will be tested: receive attack, moveship
module.exports = gameboard;
