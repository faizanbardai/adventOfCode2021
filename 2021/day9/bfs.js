const { sortBy } = require('lodash');
const getData = require('../helpers/getData');

let input = './dummy.txt';
input = './input.txt';
const dataMap = new Map();
const task2 = async () => {
    /**
     * [
     *  [1,2,3...],
     *  [1,2,3...]
     *  ...
     * ]
     */
    const data = await getData(input).then((data) => data.map((line) => line.split('').map(Number)));
    // Assign data to dataMap: x0-y1 -> 5
    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data[x].length; y++) {
            dataMap.set(`x${x}-y${y}`, data[x][y]);
        }
    }
    // 
    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data[x].length; y++) {
            const isLow =            getLowPoints({ x, y });
            if(isLow) 
        }
    }
    touched = new Map(basins);
    const pointsArray = [];
    basins.forEach((value, key) => {
        const points = 1 + getAdjacentLowPoints(key, key);
        console.log(touched);
        pointsArray.push(points);
    });
    // console.log(pointsArray);
    // console.log(pointsArray.sort((a, b) => b - a));
    console.log(pointsArray.sort((a, b) => b - a).slice(0, 3));
    const sortedArray = pointsArray
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((acc, num) => (acc = acc * num));
    console.log(sortedArray);
    // const points = getAdjacentLowPoints('01', '01');

    // console.log(basins);
    // console.log(touched);
};

const basins = new Map();
let touched;

const getLowPoints = ({ x, y }) => {
    let isLowPoint = true;
    const v = dataMap.get(`x${x}-y${y}`);
    const up = dataMap.get(`x${x - 1}-y${y}`);
    const down = dataMap.get(`x${x + 1}-y${y}`);
    const right = dataMap.get(`x${x}-y${y + 1}`);
    const left = dataMap.get(`x${x}-y${y - 1}`);
    if (up !== undefined && v > up) isLowPoint = false;
    if (down !== undefined && v > down) isLowPoint = false;
    if (right !== undefined && v > right) isLowPoint = false;
    if (left !== undefined && v > left) isLowPoint = false;
    if (isLowPoint) basins.set(`x${x}-y${y}`, v);
};

const getAdjacentLowPoints = (xy, origin) => {
    let points = 0;
    const [x, y] = xy
        .split('-')
        .map((x) => [...x].splice(1))
        .map((x) => x.join(''))
        .map(Number);
    const v = dataMap.get(`x${x}-y${y}`);
    const up = dataMap.get(`x${x - 1}-y${y}`);
    const down = dataMap.get(`x${x + 1}-y${y}`);
    const right = dataMap.get(`x${x}-y${y + 1}`);
    const left = dataMap.get(`x${x}-y${y - 1}`);
    if (left !== undefined && left !== 9 && v < left && !touched.get(`x${x}-y${y - 1}`)) {
        touched.set(`x${x}-y${y - 1}`, { origin, left });
        points++;
        points += getAdjacentLowPoints(`x${x}-y${y - 1}`, origin);
    }
    if (right !== undefined && right !== 9 && v < right && !touched.get(`x${x}-y${y + 1}`)) {
        touched.set(`x${x}-y${y + 1}`, { origin, right });
        points++;
        points += getAdjacentLowPoints(`x${x}-y${y + 1}`, origin);
    }
    if (up !== undefined && up !== 9 && v < up && !touched.get(`x${x - 1}-y${y}`)) {
        touched.set(`x${x - 1}-y${y}`, { origin, up });
        points++;
        points += getAdjacentLowPoints(`x${x - 1}-y${y}`, origin);
    }
    if (down !== undefined && down !== 9 && v < down && !touched.get(`x${x + 1}-y${y}`)) {
        touched.set(`x${x + 1}-y${y}`, { origin, down });
        points++;
        points += getAdjacentLowPoints(`x${x + 1}-y${y}`, origin);
    }

    return points;
};

task2();
