const gameboard = require("./gameboard");

class Players {
    constructor(name){
        this.name = name;
        this.playerBoard = gameboard(name);
    }
}

module.exports = Players;

//const playerOne = new Players(real);
//const cpu = new Players(bot);

//playerOne.playerBoard