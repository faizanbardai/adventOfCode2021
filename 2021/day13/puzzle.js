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
    const [dots, fold] = data;
    dots.forEach((dot) => dotsMap.set(dot, 1));
    // drawMap(dotsMap);
    // console.log(dots);
    // console.log(dotsMap);
    // let newSheet;
    fold.forEach((f) => {
        dotsMap = foldPaper(dotsMap, f);
    });
    drawMap(dotsMap);
    const count = countDots(dotsMap);
    // console.log(count);

    // const newSheet2 = foldPaper(newSheet, fold[1]);
    // const count2 = countDots(newSheet2);
    // drawMap(newSheet2);
    // console.log(count2);
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
            if (y < foldValue) {
                afterFold.set(dot, value);
            }
            if (y > foldValue) {
                const counterPartDot = `${x},${foldValue * 2 - y}`;
                const oldValue = dotsMap.get(counterPartDot);
                const newValue = oldValue ? value + oldValue : value;
                afterFold.set(counterPartDot, newValue);
            }
        });
    }
    if (foldAxis === 'x') {
        afterFold.set(`${foldValue - 1},${0}`, 0);
        dotsMap.forEach((value, dot) => {
            const [x, y] = dot.split(',').map(Number);
            if (x < foldValue) {
                afterFold.set(dot, value);
            }
            if (x > foldValue) {
                const counterPartDot = `${foldValue * 2 - x},${y}`;
                const oldValue = dotsMap.get(counterPartDot);
                const newValue = oldValue ? value + oldValue : value;
                afterFold.set(counterPartDot, 1);
            }
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
            array[y][x] = '.';
            const fill = dots.get(`${x},${y}`);
            if (fill) array[y][x] = '#';
        }
    }
    array.forEach((line) => console.log(line.join('..')));
    // console.log(array);
};

const getMax = (dots) => {
    let xMax;
    let yMax;
    dots.forEach((value, dot) => {
        const [x, y] = dot.split(',').map(Number);
        xMax = xMax > x ? xMax : x;
        yMax = yMax > y ? yMax : y;
    });
    return { xMax, yMax };
};

const countDots = (dots) => {
    let counter = 0;
    dots.forEach((value, dot) => {
        if (value > 0) counter++;
    });
    return counter;
};

const puzzleTwo = async () => {
    const data = await getData(input).then(transform);
    console.log(data);
};
// puzzleTwo();
