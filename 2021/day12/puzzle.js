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
    const smallCaves = [];
    cavesMap.forEach((caves, start) => {
        caves.sort();
        caves.push(caves.splice(caves.indexOf(Dir.end), 1)[0]);
        cavesMap.set(start, caves);
        if (start !== Dir.start && start.toLowerCase() === start) smallCaves.push(start);
    });

    // findPaths();
    // console.log({ part1: pathCount.size });
    // pathCount.clear();
    smallCaves.forEach((smallCave) => {
        findPaths(Dir.start, [Dir.start], smallCave);
    });
    console.log(pathCount);
    console.log({ part2: pathCount.size });
};
puzzleOne();
const pathCount = new Set();

const findPaths = (start = Dir.start, paths = [Dir.start], smallCaveTwice = null) => {
    if (paths[paths.length - 1] === Dir.end) {
        return;
    }

    const caves = cavesMap.get(start);

    for (let i = 0; i < caves.length; i++) {
        const cave = caves[i];

        if (cave === Dir.end) {
            pathCount.add([...paths, cave].join(','));
            break;
        }

        if (cave === Dir.start) continue;

        const isSmallCave = cave.toLowerCase() === cave;
        const smallCaveCount = paths.filter((c) => c === cave).length;
        if (isSmallCave && smallCaveCount === 1 && cave === smallCaveTwice) {
            findPaths(cave, [...paths, cave], smallCaveTwice);
        }

        if (isSmallCave && paths.includes(cave)) continue;

        findPaths(cave, [...paths, cave], smallCaveTwice);
    }
};

const puzzleTwo = async () => {
    const data = await getData(input).then(transform);
    console.log(data);
};
// puzzleTwo();
