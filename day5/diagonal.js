const diagonal = ({ X1, Y1, X2, Y2 }) => {
    const toReturn = [];

    let quad = [];
    if (X1 < X2 && Y1 < Y2) quad = [1, 1]; //0,0 -> 9,9
    if (X1 > X2 && Y1 > Y2) quad = [-1, -1]; //9,9 -> 0,0
    if (X1 < X2 && Y1 > Y2) quad = [1, -1]; //0,9 -> 9,0
    if (X1 > X2 && Y1 < Y2) quad = [-1, 1]; //9,0 -> 0,9

    while (X1 !== X2 || Y1 !== Y2) {
        toReturn.push([X1, Y1]);
        X1 += quad[0];
        Y1 += quad[1];
    }
    toReturn.push([X2, Y2]);

    return toReturn;
};

module.exports = diagonal;
// diagonal({ X1: 1, Y1: 1, X2: 3, Y2: 3 });
