'use strict';

// const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(h, w) {
        this._field = Field.generateField(h, w)
    }

    print() {
        console.log('\n');
        for (let column = 0; column < this._field.length; column++) {
            let row = this._field[column];
            console.log(row.join(" "));
        }
    }

    static generateField(height, width) {
        const options = [fieldCharacter, hole, fieldCharacter] // probability of 1/3 to get a hole
        let field = [];
        for (let h = 0; h < height; h++) {
            let newRow = []
            for (let w = 0; w < width; w++) {
                newRow.push(options[Math.floor(Math.random() * options.length)]);
            }
            field.push(newRow);
        }
        field[0][0] = pathCharacter; // player start place

        // Place hat in field
        let posHat = false;
        while (!posHat) {
            const heightHat = Math.floor(Math.random() * height);
            const widthHat = Math.floor(Math.random() * width);


            if (widthHat && heightHat !== 0) {
                field[heightHat][widthHat] = hat;
                posHat = true
            }
        }
        return field;
    }
}


const newField = new Field(5, 6);
newField.print()

let game = true
while (game) {
    // todo ask the user to input next move until they'd find their hat

    // todo after make a move, the game should print the current field map with the tiles they entered

    // todo if the user wins, lose or
    game = false
}
