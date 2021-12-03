const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);

const dummy = './dummy.txt';
const input = './input.txt';
const data = [];
let x = 0;
let y = 0;
let aim = 0;

const dive = () => {
    eachLine(input, (line, last) => {
        const [direction, value] = line.split(' ');
        console.log({ direction, value });
        switch (direction) {
            case 'forward':
                x += parseInt(value);
                y += aim * parseInt(value);
                break;
            case 'down':
                aim += parseInt(value);
                break;
            case 'up':
                aim -= parseInt(value);
                break;
        }
        console.log({ aim, x, y }, x * y);
    });
};

dive();
