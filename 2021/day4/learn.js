const fs = require('fs');
const lines = fs
    .readFileSync('./dummy.txt', { encoding: 'utf-8' })
    .split(/[\r?\n]+/)
    .filter((x) => Boolean(x))
    .map((x) => {
        x.replace(/[\n ,]+/g, ' ');
    });
console.log(lines);
