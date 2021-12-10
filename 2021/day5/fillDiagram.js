const diagonal = require('./diagonal');
const fillDiagram = (lineOfVent, diagram) => {
    const { X1, Y1, X2, Y2 } = lineOfVent;

    const HVD = (() => {
        if (X1 === X2) return 'H';
        if (Y1 === Y2) return 'V';
        return 'D';
    })();

    switch (HVD) {
        case 'H':
            {
                let higher = Y1 > Y2 ? Y1 : Y2;
                let lower = higher === Y1 ? Y2 : Y1;
                while (higher >= lower) {
                    diagram[lower][X1] += 1;
                    lower++;
                }
            }
            break;
        case 'V':
            {
                let higher = X1 > X2 ? X1 : X2;
                let lower = higher === X1 ? X2 : X1;
                while (higher >= lower) {
                    diagram[Y1][lower] += 1;
                    lower++;
                }
            }
            break;
        case 'D':
            {
                const toFil = diagonal(lineOfVent);
                toFil.forEach((c) => {
                    diagram[c[1]][c[0]] += 1;
                });
            }
            break;
    }

    // if (X1 !== X2 && Y1 !== Y2) return diagram;

    // let HV = 'H';
    // HV = X1 === X2 ? 'H' : 'V';

    // if (HV === 'H') {
    //     let higher = Y1 > Y2 ? Y1 : Y2;
    //     let lower = higher === Y1 ? Y2 : Y1;
    //     while (higher >= lower) {
    //         diagram[lower][X1] += 1;
    //         lower++;
    //     }
    // }

    // if (HV === 'V') {
    //     let higher = X1 > X2 ? X1 : X2;
    //     let lower = higher === X1 ? X2 : X1;
    //     while (higher >= lower) {
    //         diagram[Y1][lower] += 1;
    //         lower++;
    //     }
    // }

    return diagram;
};

exports.fillDiagram = fillDiagram;
