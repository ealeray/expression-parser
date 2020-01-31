const Token = require('./Tokenize.js');
const { Binary, Literal, Grouping } = require('./Ast');

class Parser {
    constructor() {
        this.inst = null;
        this.index = 0;
        this.tokens = null;
        this.expr = [];
    }

    static getInst() {
        if (!this.inst) {
            this.inst = new Parser();
        }
        return this.inst;
    }

    advance() {
        this.index++;
    }

    peep() {
        return this.tokens[this.index + 1];
    }

    current() {
        return this.tokens[this.index];
    }

    parse(str) {
        const tokenizer = new Token();
        const tokens = tokenizer.tokenize(str);
        this.tokens = tokens;

        while (this.current().type != 'EOF') {
            const expr = this.or();
            if (expr) {
                this.expr.push(expr);
            }
        }
        return this.expr;
    }

    or() {
        const left = this.and();
        if (this.current().value == 'OR') {
            this.advance();
            return new Binary(left, 'OR', this.and());
        }
        return left;
    }

    and() {
        const left = this.primary();
        if (this.current().value == 'AND') {
            this.advance();
            return new Binary(left, 'AND', this.or());
        }
        return left;
    }

    primary() {
        const curr = this.current();
        this.advance();
        if (curr.type == 'NUM') {
            return new Literal(curr.value);
        }
        if (curr.type == 'LPAREN') {
            const expr = this.or();
            this.advance();
            return new Grouping(expr);
        }
    }
}

module.exports = Parser;
