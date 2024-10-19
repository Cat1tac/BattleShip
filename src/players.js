const gameboard = require("./gameboard");

class Players {
    constructor(name){
        this.name = name;
        this.playerBoard = gameboard(name)
    }
}

const playerOne = new Players(person);
const cpu = new Players(bot);