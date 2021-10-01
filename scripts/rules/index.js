const fs = require("fs").promises;
const { MigrationRulesHelper, Severity } = require("./MigrationRulesHelper");

const MAX_DAYS_IN_THE_PAST = 5;
const MIGRATIONS_FOLDER = "./migrations";

const splitMigration = (parsedString) => {
  const returningObject = {};
  const afterUp = parsedString.split("public async up(")[1];
  const splitAfterUp = afterUp.split("public async down(");
  returningObject.up = splitAfterUp[0];
  returningObject.down = splitAfterUp[1];
  return returningObject;
};

const getLastExistingMigrationName = async () => {
  const migrationFilesRaw = await fs.readdir(MIGRATIONS_FOLDER);
  const regex = new RegExp(/\d{13}-\W*\D*.ts/);
  const migrationFiles = migrationFilesRaw.filter((m) => regex.test(m));
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

const checkTimestamp = async (fileName) => {
  const timestampString = fileName.split("-")[0];
  let timestamp;
  try {
    timestamp = new Date(timestampString);
  } catch (e) {
    MigrationRulesHelper.addOutputMessage(
      Severity.CRITICAL,
      "add",
      fileName,
      `${timestampString} is not a legal timestamp!`
    );
    return;
  }

  const timestampStringOfLastExistingMigrationRaw =
    await getLastExistingMigrationName();

  const timestampStringOfLastExistingMigration =
    timestampStringOfLastExistingMigrationRaw.split("-")[0];
  let timestampOfLastExistingMigration = new Date(
    timestampStringOfLastExistingMigration
  );

  if (timestamp < timestampOfLastExistingMigration) {
    MigrationRulesHelper.addOutputMessage(
      Severity.CRITICAL,
      "add",
      fileName,
      `Migration is added in wrong order!`
    );
  }

  const now = new Date();
  let maximumPastDate = new Date();
  maximumPastDate.setDate(maximumPastDate.getDate() - MAX_DAYS_IN_THE_PAST);
};

module.exports = {
  checkMigrationName,
  checkConstraints,
  checkKeywords,
  checkTimestamp,
};
