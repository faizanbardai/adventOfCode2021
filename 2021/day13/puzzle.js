const getData = require('../../helpers/getData');
const { transform } = require('./transform');

let input = './test.txt';
input = './puzzle.txt';

/**
 * --> x Array [y][x] ==> x,y
 * y
 * [ x0y0 x1y0 x2y0... ]
 * [ x0y1 x1y1 x2y1... ]
 * [ x0y2 x1y2 x2y2... ]
 * ...
 * ...
 * ...
 */

let dotsMap = new Map();

const getPuzzleData = async () => {
    const data = await getData(input).then(transform);
    const [dots, folds] = data;
    dots.forEach((dot) => dotsMap.set(dot, 1));
    console.log({ part1: countDots(foldPaper(dotsMap, folds[0])) });
    folds.forEach((fold) => (dotsMap = foldPaper(dotsMap, fold)));
    drawMap(dotsMap);
};
getPuzzleData();
const foldPaper = (dotsMap, fold) => {
    const afterFold = new Map();
    const foldAxis = fold.split('=')[0].slice(-1);
    const foldValue = parseInt(fold.split('=')[1]);
    if (foldAxis === 'y') {
        afterFold.set(`${0},${foldValue - 1}`, 0);
        dotsMap.forEach((value, dot) => {
            const [x, y] = dot.split(',').map(Number);
            if (y < foldValue) afterFold.set(dot, value);
            if (y > foldValue) afterFold.set(`${x},${foldValue * 2 - y}`, 1);
        });
    }
    if (foldAxis === 'x') {
        afterFold.set(`${foldValue - 1},${0}`, 0);
        dotsMap.forEach((value, dot) => {
            const [x, y] = dot.split(',').map(Number);
            if (x < foldValue) afterFold.set(dot, value);
            if (x > foldValue) afterFold.set(`${foldValue * 2 - x},${y}`, 1);
        });
    }
    return afterFold;
};

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

const getMax = (dots) => {
    let xMax;
    let yMax;
    Array.from(dots.keys()).forEach((dot) => {
        const [x, y] = dot.split(',').map(Number);
        xMax = xMax > x ? xMax : x;
        yMax = yMax > y ? yMax : y;
    });
    return { xMax, yMax };
};

const countDots = (dots) => Array.from(dots.values()).filter((num) => num === 1).length;
