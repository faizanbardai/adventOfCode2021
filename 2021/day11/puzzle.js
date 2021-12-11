const getData = require('../../helpers/getData');
const { transform } = require('./transform');

let input = './test.txt';
// input = './puzzle.txt';

const octopuses = new Map();

const totalFlashes = async () => {
    const data = await getData(input).then(transform);
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            octopuses.set(`x${i}y${j}`, data[i][j]);
        }
    }
    let flashCount = 0;
    for (let day = 1; day < 2000; day++) {
        increaseEnergy();
        makeFlash();
        const allFlashed = hasAllFlashed();
        if (allFlashed) {
            console.log({ day, allFlashed });
            break;
        } else {
            const array = [];
            for (let i = 0; i < data.length; i++) {
                array[i] = [];
                for (let j = 0; j < data[i].length; j++) {
                    array[i][j] = octopuses.get(`x${i}y${j}`);
                    if (octopuses.get(`x${i}y${j}`) === 0) flashCount++;
                }
            }
            if (day === 100) console.log({ day, flashCount });
        }
    }
};
totalFlashes();

const makeFlash = (alreadyFlashed = new Set()) => {
    const allFlashed = toBeFlashed();
    if (allFlashed.length > 0) {
        allFlashed.forEach((oct) => {
            if (!alreadyFlashed.has(oct)) {
                flashAndIncreaseAdjacent(oct);
                alreadyFlashed.add(oct);
            }
        });
        makeFlash(alreadyFlashed);
    }
};

const toBeFlashed = () => {
    let octWithEnergy9 = [];
    octopuses.forEach((energy, oct) => {
        if (energy > 9) octWithEnergy9.push(oct);
    });
    return octWithEnergy9;
};

const increaseEnergy = () => {
    octopuses.forEach((energy, oct) => {
        energy += 1;
        octopuses.set(oct, energy);
    });
};

const flashAndIncreaseAdjacent = (oct) => {
    octopuses.set(oct, 0);

    const [, x, , y] = oct.split('').map(Number);
    const top = `x${x - 1}y${y}`;
    const bottom = `x${x + 1}y${y}`;
    const right = `x${x}y${y + 1}`;
    const left = `x${x}y${y - 1}`;
    const topRight = `x${x - 1}y${y + 1}`;
    const topLeft = `x${x - 1}y${y - 1}`;
    const bottomRight = `x${x + 1}y${y + 1}`;
    const bottomLeft = `x${x + 1}y${y - 1}`;
    [top, bottom, right, left, topRight, topLeft, bottomRight, bottomLeft].forEach((oct) => {
        let energy = octopuses.get(oct);
        if (energy) {
            energy++;
            octopuses.set(oct, energy);
        }
    });
};

const hasAllFlashed = () => {
    let count = 0;
    octopuses.forEach((oct) => {
        if (oct === 0) count++;
    });
    return count === 100;
};
