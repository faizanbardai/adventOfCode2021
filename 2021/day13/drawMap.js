const { getMax } = require('./getMax');

const drawMap = (dots) => {
    const { xMax, yMax } = getMax(dots);
    const array = [];
    for (let y = 0; y <= yMax; y++) {
        array[y] = [];
        for (let x = 0; x <= xMax; x++) {
            array[y][x] = ' ';
            const fill = dots.get(`${x},${y}`);
            if (fill) array[y][x] = '#';
        }
    }
    array.forEach((line) => console.log(line.join('  ')));
};
exports.drawMap = drawMap;
