const getData = require('../helpers/getData');

let input = './dummy.txt';
// input = './input.txt';

const task1 = async () => {
    const data = await getData(input);
    console.log(data);
};
task1();

const task2 = async () => {
    const data = await getData(input);
    console.log(data);
};
task2();
