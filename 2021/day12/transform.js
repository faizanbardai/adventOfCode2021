const transform = (data) => {
    return data.filter((line) => Boolean(line)).map((line) => line.split('-'));
};
exports.transform = transform;
