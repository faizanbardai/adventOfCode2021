const getData = require('../../helpers/getData');
const { transform } = require('./transform');

let input = './test.txt';
// input = './puzzle.txt';

const cavesMap = new Map();

const Dir = {
    start: 'start',
    end: 'end',
    // loop: 'loop',
};

const puzzleOne = async () => {
    const data = await getData(input).then(transform);
    // One way
    data.forEach((line) => {
        const [start, end] = line;
        const dir = cavesMap.get(start);
        if (end !== Dir.start && start !== Dir.end) {
            if (dir) cavesMap.set(start, [...dir, end]);
            else cavesMap.set(start, [end]);
        }
    });
    // return
    data.forEach((line) => {
        const [end, start] = line;
        const dir = cavesMap.get(start);
        if (end !== Dir.start && start !== Dir.end) {
            if (dir) cavesMap.set(start, [...dir, end]);
            else cavesMap.set(start, [end]);
        }
    });
    cavesMap.forEach((caves, start) => {
        caves.sort();
        caves.push(caves.splice(caves.indexOf(Dir.end), 1)[0]);
        cavesMap.set(start, caves);
    });
    console.log(cavesMap);
    findPaths();
    console.log(pathCount);
};
puzzleOne();
let pathCount = 0;

const findPaths = (start = Dir.start, paths = [Dir.start]) => {
    if (paths[paths.length - 1] === Dir.end) {
        console.log(paths);
        return;
    }

    const caves = cavesMap.get(start);

    for (let i = 0; i < caves.length; i++) {
        const cave = caves[i];

        if (cave === Dir.end) {
            pathCount++;
            console.log([...paths, cave]);
            break;
        }

        if (cave === Dir.start) continue;

        const isSmallCave = cave.toLowerCase() === cave;

        if (isSmallCave && paths.includes(cave)) continue;

        findPaths(cave, [...paths, cave]);
    }
};

const puzzleTwo = async () => {
    const data = await getData(input).then(transform);
    console.log(data);
};
// puzzleTwo();
