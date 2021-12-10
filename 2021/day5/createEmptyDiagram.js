// task1();
const createEmptyDiagram = (x, y) => {
    const data = [];
    // const h = Array(10).fill(0);
    // return Array(10).fill([...h]);
    for (let i = 0; i <= x; i++) {
        data[i] = [];
        for (let j = 0; j <= y; j++) {
            data[i][j] = 0;
        }
    }
    return data;

    // return [
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // ];
};

// createEmptyDiagram();
exports.createEmptyDiagram = createEmptyDiagram;
