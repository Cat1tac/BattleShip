const player1 = require('./gameboard');
test ("hit!", () => {
    expect(player1.receiveAttack(1,1)).toEqual(true);
})