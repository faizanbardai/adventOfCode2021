/**
[
  [ null, null, null, null, null ],
  [ null, null, null, null, null ],
  [ null, null, null, null, null ],
  [ null, null, null, null, null ],
  [ null, null, null, null, null ]
]
 * 
 * @returns null Array
 */
const nullBoard = () => {
    const array = Array(5).fill(null);
    return Array(5).fill(array);
};

module.exports = nullBoard;
