const getData = async (txtFile) => {
    const lineReader = require('line-reader');
    const Promise = require('bluebird');
    const eachLine = Promise.promisify(lineReader.eachLine);

    const data = [];
    await eachLine(txtFile, (line, last) => {
        data.push(line);
    });
    return data;
};

module.exports = getData;
