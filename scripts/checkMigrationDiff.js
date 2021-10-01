const fs = require("fs").promises;
const path = require("path");
const rules = require("./rules");

const diffFilters = ["add", "change", "delete", "modify", "rename"];
const MIGRATIONS_DIFF_FILE_PATH_BASE = "output/migrations-diff-";

const {
  MigrationRulesHelper,
  Severity,
} = require("./rules/MigrationRulesHelper.js");

const run = async () => {
  const diffFileNames = [];
  for (let diffFilter of diffFilters) {
    diffFileNames.push({
      type: diffFilter,
      path: path.join(
        __dirname,
        MIGRATIONS_DIFF_FILE_PATH_BASE + diffFilter + ".txt"
      ),
    });
  }

  for (let diffFileName of diffFileNames) {
    const diff = await fs.readFile(diffFileName.path, "utf8");
    const diffIsEmpty = diff.trim().length === 0;
    if (diffIsEmpty) {
      continue;
    }
    const diffLines = diff.split(/\r?\n/);
    for (let diffLine of diffLines) {
      for (let checkRule of Object.values(rules)) {
        let fileName, fileContent;
        try {
          fileName = diffLine.split("migrations/")[1];
          fileContent = await fs.readFile(
            path.join(__dirname, "../", diffLine),
            "utf8"
          );
        } catch (err) {
          MigrationRulesHelper.addOutputMessage(
            Severity.CRITICAL,
            diffFileName.type,
            fileName,
            "Failed: unexisting file."
          );
          break;
        }

        if (diffFileName.type === "add") {
          await checkRule(fileName, fileContent);
        } else {
          MigrationRulesHelper.addOutputMessage(
            Severity.CRITICAL,
            diffFileName.type,
            fileName
          );
        }
      }
    }
  }

  MigrationRulesHelper.log();
};

run();
