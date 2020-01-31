const Evaluator = require('./Evaluator');
const Parser = require('./Parser');
const Token = require('./Tokenize');
const Util = require('util');

let str = '1 AND (2 OR (3 AND 4)) AND 5';

console.log(new Token().tokenize(str));
const asts = new Parser().parse(str);
const results = new Evaluator(asts).evaluate();
