'use strict';

// const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(h, w) {
        this._x_pos = 0;
        this._y_pos = 0;
        this._field = this.generateField(h, w);
    }

    set field(char) {
        // Sets path character on field
        this._field[this._y_pos][this._x_pos] = char;
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
                posHat = true;
            }
        }
        return field;
    }

    move_player(direction) {
        // Check if user input a valid direction and move player
        switch (direction) {
            case "a":
                this._x_pos -= 1;
                return true;
            case "w":
                this._y_pos -= 1;
                return true;
            case "s":
                this._y_pos += 1;
                return true;
            case "d":
                this._x_pos += 1;
                return true;
            default:
                return false;
        }
    }

    check_game_status() {
        // Winning case:
        if (this._field[this._y_pos][this._x_pos] === hat) {
            console.log("You win");
            return true;

            // Out of bones cases:
        } else if (this._y_pos >= this._field.length || this._y_pos < 0) {
            console.log("Out of bones you lose");
            return true;
        } else if (this._x_pos >= this._field[0].length || this._x_pos < 0) {
            console.log("Out of bones you lose");
            return true;

            // in case to fall into a hole
        } else if (this._field[this._y_pos][this._x_pos] === hole) {
            console.log("You fall in a hole, Game Over");
            return true;
        } else {
            return false;
        }
    }

}


const newField = new Field(5, 6);
newField.print()

const prompt = require('prompt-sync')({sigint: true});

let game = true
while (game) {
    // ask the user to input next move until they'd find their hat
    console.log("Make a move: ⬅️(a)⬆️(w)➡️(d)⬇️(s)");


    let input = prompt(''); // Use node to ask the user to input a direction

    // after make a move, the game should print the current field map with the tiles they entered
    if (newField.move_player(input)) {
        // todo if the user wins or lose end the game
        if (newField.check_game_status()) {
            game = false;
            continue;
        }
        newField.print();
    }
}
