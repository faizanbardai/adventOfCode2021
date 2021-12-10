const transform = (data) => {
    return data.filter((line) => Boolean(line));
};
exports.transform = transform;
