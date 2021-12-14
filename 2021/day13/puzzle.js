const getData = require('../../helpers/getData');
const { countDots } = require('./countDots');
const { drawMap } = require('./drawMap');
const { foldPaper } = require('./foldPaper');
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

const transparentOrigami = async () => {
    const data = await getData(input).then(transform);
    const [dots, folds] = data;
    let dotsMap = new Map();
    dots.forEach((dot) => dotsMap.set(dot, 1));
    console.log({ part1: countDots(foldPaper(dotsMap, folds[0])) });
    folds.forEach((fold) => (dotsMap = foldPaper(dotsMap, fold)));
    drawMap(dotsMap);
};
transparentOrigami();
