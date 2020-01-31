let isNum = string => {
    return !isNaN(string - parseFloat(string));
};

let isOP = string => {
    return string.toUpperCase() == 'OR' || string.toUpperCase() == 'AND';
};

module.exports = { isNum, isOP };
