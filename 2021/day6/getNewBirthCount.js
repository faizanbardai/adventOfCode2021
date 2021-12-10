const getNewBirthCount = (day, fishCycle) => {
    const newBirth = (day - fishCycle) / 7;
    if (newBirth >= 0) return parseInt(Math.abs(newBirth)) + 1;
    else return 0;
};

// const test1 = getNewBirthCount(1, 3);

exports.getNewBirthCount = getNewBirthCount;
