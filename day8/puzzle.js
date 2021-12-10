const getData = require('../helpers/getData');
const fs = require('fs');

let input = './dummy.txt';
input = './input.txt';

const task1 = async () => {
    const lines = fs
        .readFileSync(input, { encoding: 'utf-8' })
        .split(/\r?\n/)
        .filter((x) => Boolean(x))
        .map((a) => a.split(' | ')[1])
        .map((a) =>
            a
                .split(' ')
                .map((o) => o.length)
                .filter((c) => [2, 4, 3, 7].includes(c))
        )
        .map((c) => c.length)
        .reduce((a, b) => a + b, 0);
    console.log(lines);
};
// task1();

const task2 = async () => {
    const lines = fs
        .readFileSync(input, { encoding: 'utf-8' })
        .split(/\r?\n/)
        .filter((x) => Boolean(x))
        .map((a) => a.split(' | '))
        .map(littleDeduction)
        .map(Number)
        .reduce((a, b) => a + b);
    console.log(lines);
};

const littleDeduction = (input) => {
    const circuit = new Map();
    let [signals, output4Digit] = input;
    signals = signals.split(' ').map((c) => [...c].sort().join(''));

    signals.forEach((signal) => {
        switch (signal.length) {
            case 2:
                circuit.set(1, signal);
                break;
            case 3:
                circuit.set(7, signal);
                break;
            case 4:
                circuit.set(4, signal);
                break;
            case 7:
                circuit.set(8, signal);
                break;
            case 5:
                circuit.set(235, circuit.has(235) ? circuit.get(235).concat(' ' + signal) : signal);
                break;
            case 6:
                circuit.set(690, circuit.has(690) ? circuit.get(690).concat(' ' + signal) : signal);
            default:
                break;
        }
    });
    /**
     * Known
     * 1 [2] cf
     * 7 [3] acf
     * 4 [4] bcdf
     * 8 [7] abcdefg
     *
     * To find:
     * 3 [5] acdfg      length is 5 and has 1 (both c and f)
     * 5 [5] abdfg      length is 5 and has either c or f
     * 2 [5] acdeg      length is 5 and is not 3 or 5 from above
     *
     * Length: 6
     * 0 [6] abcefg     length is 6 and has 4 - 1 [bcdf - cf] (both b and d)
     * 9 [6] abcdfg     length is 6 and is not 0 (from above) and includes 1 (both c and f)
     * 6 [6] abdefg     length is 6 and is not 0 or 9 (from above)
     *
     */

    const three = signals.find((signal) => {
        const one = circuit.get(1);
        const check = signal.length === 5 && signal.includes(one[0]) && signal.includes(one[1]);
        return check;
    });
    circuit.set(3, three);

    const five = signals.find((signal) => {
        const one = circuit.get(1);
        const four = circuit.get(4);
        const bd = four.replace(one[0], '').replace(one[1], '');
        const check = signal.length === 5 && signal.includes(bd[0]) && signal.includes(bd[1]);
        return check;
    });
    circuit.set(5, five);

    const two = signals.find((signal) => {
        const three = circuit.get(3);
        const five = circuit.get(5);
        return signal.length === 5 && ![three, five].includes(signal);
    });
    circuit.set(2, two);

    const zero = signals.find((signal) => {
        const one = circuit.get(1);
        const four = circuit.get(4);
        const bd = four.replace(one[0], '').replace(one[1], '');
        return signal.length === 6 && !(signal.includes(bd[0]) && signal.includes(bd[1]));
    });
    circuit.set(0, zero);

    const nine = signals.find((signal) => {
        const one = circuit.get(1);
        const zero = circuit.get(0);
        return signal.length === 6 && signal !== zero && signal.includes(one[0]) && signal.includes(one[1]);
    });
    circuit.set(9, nine);

    const six = signals.find((signal) => {
        const zero = circuit.get(0);
        const nine = circuit.get(9);
        return signal.length === 6 && ![zero, nine].includes(signal);
    });
    circuit.set(6, six);

    const value = output4Digit
        .split(' ')
        .map((c) => [...c].sort().join(''))
        .map((digit) => getByValue(circuit, digit))
        .join('');
    return value;
};

function getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
        if (value === searchValue) return key;
    }
}

task2();
