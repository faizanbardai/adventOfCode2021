const getData = require('../helpers/getData');

let input = './dummy.txt';
input = './input.txt';

let drawNumbers = '7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1';
drawNumbers =
    '93,49,16,88,4,92,23,38,44,98,97,8,5,69,41,70,19,11,29,40,90,43,79,96,68,10,31,35,34,32,0,67,83,33,2,76,24,87,99,77,82,66,12,15,28,59,64,95,91,71,62,22,53,46,39,81,75,86,74,56,50,18,17,73,13,54,60,48,21,51,52,55,85,80,30,36,47,3,26,57,84,25,63,27,37,94,7,45,58,9,78,65,72,6,14,61,20,1,42,89';

const task1 = async () => {
    let data = await getData(input);
    let boards = [];
    let n = 1;
    data = data.reduce((newData, line) => {
        if (line !== '') {
            newData.push(line);
        }

        if (newData.length === 5) {
            boards.push(newData);
            newData = [];
        }

        return newData;
    }, []);
    boards = boards.map(transformToNum);

    const fixedDrawNumbers = drawNumbers.split(',').map((x) => parseInt(x));
    fixedDrawNumbers.forEach((drawNum) => {
        boards = boards.map((board) => {
            const markedBoard = markNull(drawNum, board);
            const hasWon = checkWin(markedBoard);
            if (hasWon) {
                const sum = sumOfAllUnmarkedNumbers(markedBoard);
                if (sum > 0) console.log(sum, drawNum, sum * drawNum);
                return [
                    [null, null, null, null, null],
                    [null, null, null, null, null],
                    [null, null, null, null, null],
                    [null, null, null, null, null],
                    [null, null, null, null, null],
                ];
            }
            return markedBoard;
        });
    });
};

const task2 = async () => {
    let data = await getData(input);

    console.log(boards);

    // console.log(data);
};

const transformToNum = (puzzle) => {
    return puzzle.reduce((numline, line) => {
        const textLine = line
            .split(' ')
            .filter((x) => x !== '')
            .map((x) => parseInt(x));
        numline.push(textLine);
        return numline;
    }, []);
};

task1();
const markNull = (num, puzzle) => {
    const markedPuzzle = [[], [], [], [], []];
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            markedPuzzle[x][y] = num === puzzle[x][y] ? null : puzzle[x][y];
        }
    }
    return markedPuzzle;
};

const checkWin = (puzzle) => {
    let isWin = false;
    // console.log(puzzle.some((line) => checkHorizontal(line)));
    for (let x = 0; x < 5; x++) {
        // console.log(puzzle[x]);
        if (checkHorizontal(puzzle[x])) isWin = true;
    }

    const turned = revertPuzzle(puzzle);
    for (let x = 0; x < 5; x++) {
        // console.log(puzzle[x]);
        if (checkHorizontal(turned[x])) isWin = true;
    }
    return isWin;
};

const checkHorizontal = (line) => line.every((x) => x === null);

const revertPuzzle = (puzzle) => {
    const markedPuzzle = [[], [], [], [], []];
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            markedPuzzle[x][y] = puzzle[y][x];
        }
    }
    return markedPuzzle;
};

const sumOfAllUnmarkedNumbers = (puzzle) => {
    let sum = 0;
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            sum += puzzle[x][y] ? puzzle[x][y] : 0;
        }
    }
    return sum;
};

// task2();
