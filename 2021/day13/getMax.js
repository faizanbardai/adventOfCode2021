const getMax = (dots) => {
    let xMax;
    let yMax;
    Array.from(dots.keys()).forEach((dot) => {
        const [x, y] = dot.split(',').map(Number);
        xMax = xMax > x ? xMax : x;
        yMax = yMax > y ? yMax : y;
    });
    return { xMax, yMax };
};
exports.getMax = getMax;
