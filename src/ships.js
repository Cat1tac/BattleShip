class Ship {
    constructor(length, name, orientation){
        this.length = length;
        this.name = name;
        this.orientation = orientation;
        this.attacked = 0;
    }

    hit(){
        this.attacked++;
        return this.attacked;
    }

    isSunk(){
        if (this.hit() === this.length){
            return true;
        }
        return false;
    }
}

module.exports = Ship