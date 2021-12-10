const { sortBy } = require('lodash');
const getData = require('../helpers/getData');

let input = './dummy.txt';
input = './input.txt';
const charOpen = [];
const sbo = '[';
const rbo = '(';
const cbo = '{';
const tbo = '<';
const sbc = ']';
const rbc = ')';
const cbc = '}';
const tbc = '>';

const task1 = async () => {
    const data = await getData(input).then((data) => data.map((line) => line.split('')));
    // const points = data.reduce((acc, line) => {
    //     acc += checkLine(line);
    //     return acc;
    // }, 0);
    // console.log(points);

    const complete = data
        .map(checkLine)
        .filter((line) => line.length > 0)
        .map((line) =>
            line
                .map(getClosePoint)
                .reverse()
                .reduce((acc, value) => {
                    return acc * 5 + value;
                }, 0)
        );
    console.log(sortBy(complete)[Math.floor(complete.length / 2)]);
};
task1();

const checkLine = (line) => {
    let found = false;
    let value = 0;
    let charOpen = [];
    let charClose = [];
    line.forEach((char) => {
        if (!found) {
            switch (char) {
                case sbo:
                case rbo:
                case cbo:
                case tbo:
                    charOpen.push(char);
                    break;
                case sbc:
                case rbc:
                case cbc:
                case tbc:
                    if (charOpen[charOpen.length - 1] === getClose(char)) {
                        charOpen.pop();
                    } else {
                        charOpen = [];
                        // console.log(char, charOpen, getPoint(char));
                        found = true;
                        // value = getPoint(char);
                    }
                    break;
            }
        }
    });
    // console.log(charOpen);
    return charOpen;
    // return value;
};

const getClose = (openChar) => {
    switch (openChar) {
        case sbc:
            return sbo;
        case rbc:
            return rbo;
        case cbc:
            return cbo;
        case tbc:
            return tbo;
    }
};

const getPoint = (char) => {
    switch (char) {
        case rbc:
            return 3;
        case sbc:
            return 57;
        case cbc:
            return 1197;
        case tbc:
            return 25137;
    }
};

const getClosePoint = (char) => {
    switch (char) {
        case rbo:
            return 1;
        case sbo:
            return 2;
        case cbo:
            return 3;
        case tbo:
            return 4;
    }
};

const task2 = async () => {
    const data = await getData(input);
    console.log(data);
};
// task2();
