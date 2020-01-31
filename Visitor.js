const { Binary, Literal, Grouping } = require('./Ast');
const Util = require('util');
let values = [true, false, false, false, true];

class Visitor {
    visitBinary(ctx) {
        const type = ctx.operator;
        switch (type) {
            case 'OR':
                return ctx.left.visit(this) || ctx.right.visit(this);
            case 'AND':
                return ctx.left.visit(this) && ctx.right.visit(this);
        }
    }

    visitLiteral(ctx) {
        return values[ctx.value - 1];
    }

    visitGrouping(expr) {
        const e = expr.expr;
        return e.visit(this);
    }

    visitExpressions(expressions) {
        for (const expr of expressions) {
            console.log(Util.inspect(expr, { depth: null }));
            console.log(expr.visit(this));
        }
    }
}

module.exports = Visitor;
