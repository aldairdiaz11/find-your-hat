'use strict';

// const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(h, w) {
        this._hat_pos = [0, 0];
        this._x_pos = 0;
        this._y_pos = 0;
        this._field = this.generateField(h, w);
    }

    set field(char) {
        this._field[this._y_pos][this._x_pos] = char;
    }

    set hat_position(pos) {
        this._hat_pos = pos;
    }

    print() {
        console.log('\n');
        this.field = pathCharacter;
        for (let column = 0; column < this._field.length; column++) {
            let row = this._field[column];
            console.log(row.join(" "));
        }
    }

    generateField(height, width) {
        const options = [fieldCharacter, hole, fieldCharacter] // probability of 1/3 to get a hole
        let field = [];
        for (let h = 0; h < height; h++) {
            let newRow = []
            for (let w = 0; w < width; w++) {
                newRow.push(options[Math.floor(Math.random() * options.length)]);
            }
            field.push(newRow);
        }

        // Place hat in field
        let posHat = false;
        while (!posHat) {
            const heightHat = Math.floor(Math.random() * height);
            const widthHat = Math.floor(Math.random() * width);

            if (widthHat && heightHat !== 0) {
                field[heightHat][widthHat] = hat;
                this.hat_position = [heightHat, widthHat];
                posHat = true;
            }
        }
        return field;
    }

    move_player(direction) {
        const valid_moves = ["a", "w", "s", "d"];

        // Check if user input a valid direction

        if (valid_moves.includes(direction)) {
            switch (direction) {
                case "a":
                    this._x_pos -= 1;
                    break;
                case "w":
                    this._y_pos += 1;
                    break;
                case "s":
                    this._y_pos -= 1;
                    break;
                case "d":
                    this._x_pos += 1;
                    break;
                default:
                    break;
            }
            return true;
        } else {
            return false;
        }
        // if not skip
    }

    check_game_status() {
        // Winning case:
        if (this._hat_pos[0] === this._y_pos && this._hat_pos[1] === this._x_pos) {
            console.log("You win");
            return true;

            // Out of bones options: // todo work on this
        } else if (this._y_pos > this.field.length) {
            return false;
        }
    }

}


const newField = new Field(5, 6);
newField.print()

const prompt = require('prompt-sync')({sigint: true});

let game = true
while (game) {
    // todo ask the user to input next move until they'd find their hat
    console.log("Make a move: ⬅️(a)⬆️(w)➡️(d)⬇️(s)");


    let input = prompt(''); // Use node to ask the user to input a direction

    // todo after make a move, the game should print the current field map with the tiles they entered
    if (newField.move_player(input)) {
        // todo if the user wins or lose end the game
        if (newField.check_game_status())
            game = false;
        newField.print();
    }
}
