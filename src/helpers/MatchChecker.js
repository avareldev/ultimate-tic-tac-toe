export default class MatchChecker {
    
    constructor(board) {
        this.board = board;
    }

    checkForWinner() {
        return this.checkRows()
            || this.checkCols()
            || this.checkDiagonals();
    }

    checkRows() {
        let hasWinner = false;
        this.board.forEach((row) => {
            if (!hasWinner) {
                hasWinner = this.compareFields(row);
            }
        });
        return hasWinner;
    }

    checkCols() {
        let hasWinner = false;
        for (let i=0; i<this.board.length; i++) {
            let col = [];
            for (let j=0; j<this.board[0].length; j++) {
                col.push(this.board[j][i]);
            }
            hasWinner = this.compareFields(col);
            if (hasWinner) {
                return true;
            }
        }
        return false;
    }

    checkDiagonals() {
        let diagonal = [];
        for (let i=0; i<this.board.length; i++) {
            diagonal.push(this.board[i][i]);
        }
        if (this.compareFields(diagonal)) {
            return true;
        }
        diagonal = [];
        for (let i=0; i<this.board.length; i++) {
            diagonal.push(this.board[i][(this.board.length -1) - i]);
        }
        return this.compareFields(diagonal);
    }

    compareFields(fields) {
        let result = true;
        let value = null;
        fields.forEach(field => {
            if (result) {
                if (value === null) {
                    value = field;
                } else {
                    result = field !== '' && value === field;
                }
            }
        });
        return result;
    }
}