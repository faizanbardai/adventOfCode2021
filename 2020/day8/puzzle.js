const getData = require('../../helpers/getData');
const { transform } = require('./transform');

let input = './test.txt';
// input = './puzzle.txt';

const visited = new Map();
const puzzleOne = async () => {
    const data = await getData(input).then(transform);
    try {
        const acc = runInstruction(data[0], 0, data);
    } catch (error) {
        console.log(error);
    }
};
puzzleOne();

const runInstruction = (line, i, data, acc = 0) => {
    if (!data[i]) throw Error({ message: `finished at ${acc}`, type: 0 });
    if (visited.has(i)) throw Error({ message: `acc is ${acc}`, type: 1 });
    visited.set(i, data);
    const { ins, dir, num } = line;
    switch (ins) {
        case 'nop':
            acc += runInstruction(data[i + 1], i + 1, data, acc);
            break;
        case 'acc':
            acc = dir === 1 ? acc + num : acc - num;
            acc += runInstruction(data[i + 1], i + 1, data, acc);
            break;
        case 'jmp':
            const nextInsToRun = dir === 1 ? i + num : i - num;
            acc += runInstruction(data[nextInsToRun], nextInsToRun, data, acc);
            break;
    }
    return acc;
};

const puzzleTwo = async () => {
    const data = await getData(input).then(transform);
    console.log(data);
};
// puzzleTwo();
