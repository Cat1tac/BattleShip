const player1 = require('./gameboard');
test ("hit!", () => {
    expect(player1.receiveAttack(1,1)).toEqual(true);
})

test ("hit!", () => {
    expect(player1.receiveAttack(1,4)).toEqual(true);
})

test ("hit!", () => {
    expect(player1.receiveAttack(2,7)).toEqual(false);
})

test ("hit!", () => {
    expect(player1.receiveAttack(7,8)).toEqual(true);
})