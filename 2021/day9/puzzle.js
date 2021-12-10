const getData = require('../helpers/getData');

let input = './dummy.txt';
// input = './input.txt';

const task1 = async () => {
    const data = await getData(input);
    data.map((x) => x.split('').map(Number)).forEach(getBasin);
    // const answer = basins.reduce((a, v) => (a += parseInt(v) + 1), 0);
    // const array = data.map((line) => line.split(''));
    // checkBasin('64', array);
    console.log(basinsMap);
};
task1();
const basins = []; // [0,1,2...]
const basinsMap = new Map(); // x-y -> 5
const locations = new Set();

const checkBasin = (xy, array) => {
    const found = [];
    const [x, y] = xy.split('').map(Number);
    const { right, left, top, bottom } = getRLTB(array, x, y);

    for (let i = 0; i < right.length; i++) {
        if (right[i] == 9) break;
        if (right[i] < right[i + 1]) found.push(`${x}${y + i + 1}`);
        // console.log(right[i], array[x][y], array[x][y + i + 1], right[i] < right[i + 1]);
    }
    console.log(
        found.map((coordinate) => {
            const [x, y] = coordinate.split('').map(Number);
            console.log(array[x][y]);
        })
    );

    console.log({ right, left, top, bottom });
};

const getRLTB = (array, x, y) => {
    const right = array[y].slice(x + 1);
    const left = array[y].slice(0, x).reverse();
    const top = array
        .map((line) => line[x])
        .slice(0, y)
        .reverse();
    const bottom = array.map((line) => line[x]).slice(y + 1);
    return { right, left, top, bottom };
};

const getBasin = (line, yAxis, array) => {
    const up = array[yAxis - 1];
    const bottom = array[yAxis + 1];
    line.forEach((v, xAxis, line) => {
        const left = line[xAxis - 1];
        const right = line[xAxis + 1];
        const isLow = isLowest(v, left, right, up ? up[xAxis] : undefined, bottom ? bottom[xAxis] : undefined);
        if (isLow) {
            basins.push(v);
            basinsMap.set(`${yAxis}${xAxis}`, v);
        }
    });
};

const isLowest = (v, l, r, u, b) => {
    const testR = r ? v < r : true;
    const testL = l ? v < l : true;
    const testU = u ? v < u : true;
    const testB = b ? v < b : true;
    const result = testR && testL && testU && testB;
    return result;
};

const task2 = async () => {
    const data = await getData(input);
    console.log(data);
};
// task2();
