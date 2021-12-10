const fs = require('fs');

// const lines = fs
//     .readFileSync('../day5/input.txt', { encoding: 'utf-8' })

//     .split(/\r?\n/)
//     // .toString()
//     // .split('\r\n')
//     .filter((x) => Boolean(x))
//     .map((a) => a.split(' -> '))
//     .map((a) => a.split(','));

const lines = fs
    .readFileSync('../day5/input.txt', { encoding: 'utf-8' })
    .split(/\r?\n/)
    .map((a) => a.split(' -> ').map((a) => a.split(',').map(Number)));

console.log(lines);
