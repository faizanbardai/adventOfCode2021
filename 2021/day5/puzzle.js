const getData = require('../helpers/getData');
const { createEmptyDiagram } = require('./createEmptyDiagram');
const { fillDiagram } = require('./fillDiagram');
const { getDangerousArea } = require('./getDangerousArea');

let input = './dummy.txt';
input = './input.txt';

const task1 = async () => {
    let data = await getData(input);
    let highestX = 0;
    let highestY = 0;
    data = data.map((x) => {
        const [X1Y1, X2Y2] = x.split(' -> ');
        let [X1, Y1] = X1Y1.split(',');
        let [X2, Y2] = X2Y2.split(',');

        X1 = parseInt(X1);
        X2 = parseInt(X2);
        Y1 = parseInt(Y1);
        X2 = parseInt(X2);

        if (X1 > highestX) highestX = X1;
        if (X2 > highestX) highestX = X2;
        if (Y1 > highestY) highestY = Y1;
        if (Y2 > highestY) highestY = Y2;

        return {
            X1: parseInt(X1),
            Y1: parseInt(Y1),
            X2: parseInt(X2),
            Y2: parseInt(Y2),
        };
    });

    let diagram = createEmptyDiagram(highestX, highestY);
    data.forEach((line) => {
        data = fillDiagram(line, diagram);
        console.log(line);
    });
    const dangerousArea = getDangerousArea(data);
    console.log(dangerousArea);
};
task1();

const task2 = async () => {
    const data = await getData(input);
    console.log(data);
};
// task2();
