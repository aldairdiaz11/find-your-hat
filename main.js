'use strict';

// const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._fieldd = field;
    }

    print() {
        console.log('\n');
        for (let i = 0; i < this._fieldd.length; i++) {
            let row = this._fieldd[i];
            console.log(`${row[0]}  ${row[1]}  ${row[2]}`);
        }
    }
}


const newField = new Field([
    [pathCharacter, fieldCharacter, hole],
    [fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, hat, fieldCharacter]
]);

newField.print()
