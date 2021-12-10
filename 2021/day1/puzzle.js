const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);

const input = './input.txt';
const dummy = './dummy.txt';
const data = [];

const countIncrese = () => {
    eachLine(input, (line, last) => {
        data.push(parseInt(line));
        if (last) {
            const increment = getIncrement(data);
            console.log(increment);

            const sumOfThree = [];
            data.forEach((value, index, data) => {
                if (data[index] && data[index + 1] && data[index + 2]) {
                    sumOfThree.push(data[index] + data[index + 1] + data[index + 2]);
                }
            });
            console.log(getIncrement(sumOfThree));
        }
    });
};

const getIncrement = (data) =>
    data.reduce((inr, v, i, data) => {
        if (i === 0) return inr;
        if (parseInt(v) > parseInt(data[i - 1])) inr++;
        return inr;
    }, 0);

countIncrese();
