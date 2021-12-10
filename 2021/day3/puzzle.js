const getData = require('../helpers/getData');

let input = './dummy.txt';
input = './input.txt';

const task1 = async () => {
    const data = await getData(input);
    // console.log(data);
    const length = data[0].length;
    const gamma = [];
    const epsilon = [];
    for (let i = 0; i < length; i++) {
        const { max, min } = getHigherBit(i, data);
        gamma.push(max);
        epsilon.push(min);
    }
    console.log({ gamma: parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2) });
};

const task2 = async () => {
    const data = await getData(input);
    console.log(data);
};

const getHigherBit = (i, data) => {
    const col = data.map((num) => parseInt(num[i]));
    const count0 = col.reduce((sum, num) => (sum += num === 0), 0);
    const count1 = col.reduce((sum, num) => (sum += num === 1), 0);
    const max = count0 > count1 ? 0 : 1;
    const min = max === 1 ? 0 : 1;
    console.log({ count0, count1, max, min });
    return { max, min };
};

task1();
