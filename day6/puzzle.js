const getData = require('../helpers/getData');
const { getCurrentCycle } = require('./getCurrentCycle');
const { getNewBirthCount } = require('./getNewBirthCount');

let input = './dummy.txt';
input = './input.txt';

let fishTank = [];

const fishMap = new Map();

const task1 = async () => {
    const data = await getData(input);
    fishTank = data[0].split(',').map(Number);
    const days = 256;
    for (let day = 0; day <= days; day++) {
        cycleTrack(day);
        // console.log(fishMap);
        console.log({ day, fish: fishMap.size });
    }
};
task1();

const cycleTrack = (days) => {
    fishTank.forEach((fish, i) => {
        addFish(i, fish, days);
    });
};

const addFish = (i, fishCycle, days) => {
    const fish = fishMap.get(i);
    if (!fish) {
        fishMap.set(i, { parent: 'origin', original: fishCycle, current: fishCycle, days, child: 0 });
    } else {
        fish.current += -1;
        if (fish.current < 0) {
            fish.current = 6;
            fishTank.push(8);
            fish.child++;
            fishMap.set(fishMap.size, { parent: i, original: 8, current: 8, days, child: 0 });
        }
        fish.days++;
        fishMap.set(i, fish);
    }
};

const task2 = async () => {
    const data = await getData(input);
    console.log(data);
};
// task2();
