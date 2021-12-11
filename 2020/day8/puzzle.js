const getData = require('../../helpers/getData');
const { transform } = require('./transform');

let input = './test.txt';
input = './puzzle.txt';

const puzzleOne = async () => {
    const data = await getData(input).then(transform);
    const response = runInstruction(data[0], 0, data);
    console.log(response);
};
puzzleOne();

const msg = {
    finished: 'finished',
    inLoop: 'in loop',
};

const runInstruction = (line, i, data, visited = new Map(), res = { acc: 0, msg: null }) => {
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
            return runInstruction(data[i + 1], i + 1, data, visited, res);
        }
        case 'acc': {
            res.acc += dir === 1 ? +num : -num;
            return runInstruction(data[i + 1], i + 1, data, visited, res);
        }
        case 'jmp': {
            const next = dir === 1 ? i + num : i - num;
            return runInstruction(data[next], next, data, visited, res);
        }
    }
};

const findFix = async () => {
    const data = await getData(input).then(transform);
    const potentialFixes = new Map();
    data.forEach((line, i) => {
        if (['nop', 'jmp'].includes(line.ins)) {
            potentialFixes.set(i, line);
        }
    });
    for (let [i, fix] of potentialFixes) {
        const newData = Array.from(data);
        newData[i] = { ...fix, ins: fix.ins === 'nop' ? 'jmp' : 'nop' };
        // console.log(i, newData[i], data[i]);
        const res = runInstruction(newData[0], 0, newData);
        if (res.msg === msg.inLoop) {
            continue;
        }
        if (res.msg === msg.finished) {
            console.log(res);
            break;
        }
    }
};
findFix();
