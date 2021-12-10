const getData = require('../helpers/getData');
const { transform } = require('./transform');

let input = './test.txt';
// input = './puzzle.txt';

const puzzleOne = async () => {
    const data = await getData(input).then(transform);
    console.log(data);
};
puzzleOne();

const puzzleTwo = async () => {
    const data = await getData(input).then(transform);
    console.log(data);
};
// puzzleTwo();
