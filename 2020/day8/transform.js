const transform = (data) => {
    return data
        .filter((line) => Boolean(line))
        .map((line) => {
            const [a, b, c, d, e, ...rest] = line.split('');
            const ins = [a, b, c].join('');
            const dir = e === '+' ? 1 : 0;
            const num = parseInt(rest.join(''));
            return { ins, dir, num };
        });
};
exports.transform = transform;
