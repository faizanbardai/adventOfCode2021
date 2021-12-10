const { max } = require('lodash');
const getFill = ({ X1, Y1, X2, Y2 }) => {
    console.log({ X1, Y1, X2, Y2 });
    const HV = Y1 === Y2 ? 'H' : 'V';
    console.log(HV);
    let higher, lower;
    if (HV === 'H') {
        higher = max([X1, X2]);
    }
    if (HV === 'V') {
        higher = max([Y1, Y2]);
    }
    console.log({ higher, lower });
};

getFill({
    X1: 0,
    Y1: 9,
    X2: 5,
    Y2: 9,
});
