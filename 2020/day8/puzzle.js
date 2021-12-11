const getData = require('../../helpers/getData');
const { transform } = require('./transform');

let input = './test.txt';
// input = './puzzle.txt';

const visited = new Map();
const puzzleOne = async () => {
    const data = await getData(input).then(transform);
    try {
        const response = runInstruction(data[0], 0, data);
        console.log({ response });
    } catch (error) {
        console.log(error);
    }
};
// puzzleOne();

const msg = {
    finished: 'finished',
    inLoop: 'in loop',
};

const runInstruction = (line, i, data, res = { acc: 0, msg: null }) => {
    if (res.msg) {
        return res;
    }
    if (!data[i]) {
        res.msg = msg.finished;
        return res;
    }
    if (visited.has(i)) {
        res.msg = msg.inLoop;
        return res;
    }
    visited.set(i, data[i]);
    const { ins, dir, num } = line;
    switch (ins) {
        case 'nop': {
            return runInstruction(data[i + 1], i + 1, data, res);
        }
        case 'acc': {
            res.acc += dir === 1 ? +num : -num;
            return runInstruction(data[i + 1], i + 1, data, res);
        }
        case 'jmp': {
            const next = dir === 1 ? i + num : i - num;
            return runInstruction(data[next], next, data, res);
        }
    }
};

const findFix = async () => {
    const data = await getData(input).then(transform);
    console.log(data);
};
findFix();
