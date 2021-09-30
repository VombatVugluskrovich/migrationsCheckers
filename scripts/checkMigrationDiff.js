const fs = require("fs");
const path = require("path");
const rules = require("./rules");

const MIGRATIONS_DIFF_FILE_PATH = path.join(
  __dirname,
  "output/migrations-diff.txt"
);

const run = async () => {
  const diff = fs.readFileSync(MIGRATIONS_DIFF_FILE_PATH, "utf8");
  const diffLines = diff.split(/\r?\n/);
  for (let diffLine of diffLines) {
      
    console.log(diffLine);
    for (let checkRule of Object.values(rules)) {
      await checkRule(diffLine);
    }
  }
};

run();
