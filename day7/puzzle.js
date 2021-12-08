const getData = require('../helpers/getData');

let input = './dummy.txt';
// input = './input.txt';

const crabPositions = new Map();
const crabs = [];
let max;
let min;

const task1 = async () => {
    let data = await getData(input);
    data = data.toString().split(',').map(Number);
    max = Math.max(...data);
    min = Math.min(...data);
    data.forEach(addCrab);
    crabs.forEach(countDistance);
    const distances = crabs.map(countLeast);
    const minimum = Math.min(...distances);
    const crab = distances.findIndex((x) => x === minimum);
    console.log({ max, min, crab, minimum, distances });
};
task1();

const addCrab = (crabName) => {
    const crab = crabPositions.get(crabName);
    if (crab) {
        crabPositions.set(crabName, { ...crab, count: crab.count + 1 });
    } else {
        crabPositions.set(crabName, { count: 1 });
        crabs.push(crabName);
    }
};

const countDistance = (crab) => {
    const crabInfo = crabPositions.get(crab);
    crabInfo.distance = [];
    for (let i = min; i <= max; i++) {
        crabInfo.distance[i] = calcDist(crab, i);
    }
};

const countLeast = (crabName, i) => {
    const distance = crabs.reduce((d, c) => {
        const crabInfo = crabPositions.get(c);
        const { distance, count } = crabInfo;
        const value = distance[i];
        d += value * count;
        return d;
    }, 0);
    return distance;
};

const calcDist = (from, to) => {
    let big = Math.max(from, to);
    let small = Math.min(from, to);
    let dis = 0;
    while (big !== small) {
        dis += Math.abs(big - small);
        big--;
    }
    // console.log({ from, to, dis });
    return dis;
};
