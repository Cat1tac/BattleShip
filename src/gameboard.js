 import {Ship} from "./ships";

 function gameboard() {
    const rowlength = 10;
    const columnlength = 10;
    let board = []
    for (let r = 0; r <= rowlength; r++){
        let row = [];
        for (let c = 0; c <= columnlength; c++){
            row.push(0)
       }
       board.push(row);
    }
    console.log(board);
    //empty spaces will be 0, ships will be ones, and hit spots will be 2







 }

 