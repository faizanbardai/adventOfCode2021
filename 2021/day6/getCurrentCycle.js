const getCurrentCycle = (day, fishCycle) => {
    const mod = parseInt(day % 7);
    const currentCycle = Math.abs(fishCycle - mod);
    return currentCycle;
};

// const test1 = getCurrentCycle(1, 4);
// console.log(test1);
exports.getCurrentCycle = getCurrentCycle;
