const { MigrationRulesHelper, Severity } = require("./MigrationRulesHelper");

const MIGRATIONS_FOLDER = "./migrations";
const MIGRATION_FILE_NAME_PATTERN = "d{13}-W*D*.ts";

const splitMigration = (parsedString) => {
  const returningObject = {};
  const afterUp = parsedString.split("public async up(")[1];
  const splitAfterUp = afterUp.split("public async down(");
  returningObject.up = splitAfterUp[0];
  returningObject.down = splitAfterUp[1];
  return returningObject;
};

const getLastExistingMigrationName = () => {
  const migrationFiles = fs
    .readdirSync(MIGRATIONS_FOLDER)
    .filter((m) => m.match(MIGRATION_FILE_NAME_PATTERN));
  console.log("MIGRACIJE:", migrationFiles);
  return migrationFiles[migrationFiles.length - 1];
};

const checkMigrationName = async (fileName, fileContent) => {
  const regex = new RegExp(/\d{13}-\W*\D*.ts/);
  if (!regex.test(fileName)) {
    MigrationRulesHelper.addOutputMessage(
      Severity.CRITICAL,
      "add",
      fileContent,
      "Invalid migration name"
    );
  }
};
const checkTimestamp = async (migrationName) => console.log("timestamp");
const checkIfTimestampLast = async (file) => console.log("lastTimestamp");

const checkKeywords = async (filePath, fileContent) => {
  const keywords = ["DROP", "DELETE"];
  for (let keyword of keywords) {
    if (
      fileContent.includes(keyword) ||
      fileContent.includes(keyword.toLowerCase()) ||
      fileContent.includes(keyword.toUpperCase())
    ) {
      MigrationRulesHelper.addOutputMessage(
        Severity.WARNING,
        "add",
        filePath,
        `Migration contains keyword: ${keyword}`
      );
    }
  }
};

const checkConstraints = async (fileName, fileContent) => {
  const dividedMigration = splitMigration(fileContent);
  const constraints = [
    "dropUniqueConstraint",
    "dropUniqueConstraint",
    "createUniqueConstraint",
    "ADD CONSTRAINT",
    "Add constraint",
    "add constraint",
  ];
  constraints.forEach((constraint) => {
    if (dividedMigration.up.includes(constraint)) {
      MigrationRulesHelper.addOutputMessage(
        Severity.WARNING,
        "add",
        fileName,
        `Constraint changed: ${constraint}`
      );
    }
  });
};

module.exports = {
  checkMigrationName,
  checkConstraints,
  checkKeywords,
};
