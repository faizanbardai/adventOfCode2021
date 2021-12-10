const getDangerousArea = (data) => {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (data[i][j] > 1) count++;
        }
    }
    return count;
};
exports.getDangerousArea = getDangerousArea;
