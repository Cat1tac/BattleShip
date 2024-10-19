class Ship {
    constructor(length, name, orientation){
        this.length = length;
        this.name = name;
        this.orientation = orientation
    }

    hit(){
        let attacked = 0;
        attacked++;
        return attacked;
    }

    isSunk(){
        if (this.hit === this.length){
            return true
        }
        return false;
    }
}

module.exports = Ship