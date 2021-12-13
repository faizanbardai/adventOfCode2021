const transform = (data) => {
    const dots = [];
    const folds = [];
    data.forEach((line) => {
        if (line.includes('fold')) folds.push(line);
        if (line.includes(',')) dots.push(line);
    });
    return [dots, folds];
};
exports.transform = transform;
