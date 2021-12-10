const getData = require('../helpers/getData');

let input = './dummy.txt';
// input = './input.txt';

const task1 = async () => {
    const data = await getData(input);
    const coordinates = data.map((coordinate) => {
        const [FROM, TO] = coordinate.split(' -> ');
        const [x1, y1] = FROM.split(',').map(Number);
        const [x2, y2] = TO.split(',').map(Number);
        return { from: { x: x1, y: y1 }, to: { x: x2, y: y2 } };
    });
    // console.log(coordinates);
    const valuesToAdd = (coordinate) => {
        console.log(coordinate);
        const key = `${coordinate.from.x}`;
        const isHorizontal = coordinate.from.x === coordinate.to.x;
        if (isHorizontal) {
        } else {
        }
    };

    valuesToAdd(coordinates[0]);
};
task1();

const task2 = async () => {
    const data = await getData(input);
    console.log(data);
};
// task2();
