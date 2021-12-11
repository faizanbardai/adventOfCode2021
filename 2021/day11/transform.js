const transform = (data) => {
    return data.filter((line) => Boolean(line)).map((x) => x.split('').map(Number));
};
exports.transform = transform;
