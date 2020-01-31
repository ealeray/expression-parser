const Visitor = require('./Visitor.js');

class Evaluator {
    constructor(asts) {
        this.asts = asts;
        this.visitor = new Visitor();
    }

    evaluate() {
        console.log('======================== RESULTS ========================');
        return this.visitor.visitExpressions(this.asts);
    }
}

module.exports = Evaluator;
