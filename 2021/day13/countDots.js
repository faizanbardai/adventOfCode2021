const countDots = (dots) => Array.from(dots.values()).filter((num) => num === 1).length;
exports.countDots = countDots;
