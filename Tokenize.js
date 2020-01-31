const utility = require('./Utility');

class Token {
    constructor() {
        this.inst = null;
        this.tokens = [];
    }

    static getInst() {
        if (!this.inst) {
            this.inst = new Token();
            return this.inst;
        }
    }

    tokenize(expression) {
        expression = expression.trim();
        var x = '';
        for (var index = 0; index < expression.length; index++) {
            x += expression[index];
            const peek = expression[index + 1];

            if (utility.isNum(x.trim()) && !utility.isNum(peek)) {
                this.tokens.push({ type: 'NUM', value: x.trim() });
                x = '';
            }

            if (x.trim() == '(' || x.trim() == ')') {
                x.trim() == '(' ? this.tokens.push({ type: 'LPAREN' }) : this.tokens.push({ type: 'RPAREN' });
                x = '';
            }

            if (utility.isOP(x.trim())) {
                this.tokens.push({ type: 'OPER', value: x.trim() });
                x = '';
            }

            if (index == expression.length - 1) {
                this.tokens.push({ type: 'EOF' });
                x = '';
            }
        }
        return this.tokens;
    }
}

module.exports = Token;
