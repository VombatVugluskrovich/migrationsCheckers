const fs = require('fs');
const path = require('path');

const MIGRATIONS_DIFF_FILE_PATH = path.join(__dirname, 'output/migrations-diff.txt');
const rules = [
    () => console.log('prva'),
    () => console.log('druga'),
];

const run = async () => {
    const diff = fs.readFileSync(MIGRATIONS_DIFF_FILE_PATH, 'utf8');
    const diffLines = diff.split(/\r?\n/);

    for (let diffLine of diffLines) {
        console.log(diffLine);
        for (let checkRule of rules) {
            await checkRule(diffLine);
        }
    }
}

run();