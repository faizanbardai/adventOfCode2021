const foldPaper = (dotsMap, fold) => {
    const afterFold = new Map();
    const foldAxis = fold.split('=')[0].slice(-1);
    const foldValue = parseInt(fold.split('=')[1]);
    if (foldAxis === 'y') {
        afterFold.set(`${0},${foldValue - 1}`, 0);
        dotsMap.forEach((value, dot) => {
            const [x, y] = dot.split(',').map(Number);
            if (y < foldValue) afterFold.set(dot, value);
            if (y > foldValue) afterFold.set(`${x},${foldValue * 2 - y}`, 1);
        });
    }
    if (foldAxis === 'x') {
        afterFold.set(`${foldValue - 1},${0}`, 0);
        dotsMap.forEach((value, dot) => {
            const [x, y] = dot.split(',').map(Number);
            if (x < foldValue) afterFold.set(dot, value);
            if (x > foldValue) afterFold.set(`${foldValue * 2 - x},${y}`, 1);
        });
    }
    return afterFold;
};
exports.foldPaper = foldPaper;
