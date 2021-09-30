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
    if (diffFileName.type === "add") {
      const diff = await fs.readFile(diffFileName.path, "utf8");
      const diffLines = diff.split(/\r?\n/);
      for (let diffLine of diffLines) {
        for (let checkRule of Object.values(rules)) {
          const fileName = diffLine.split("migrations/")[1];
          await checkRule(fileName);
        }
      }
    } else {
      MigrationRulesHelper.addOutputMessage(
        Severity.CRITICAL,
        diffFileName.type,
        diffFileName.path
      );
    }
  }

  MigrationRulesHelper.log();
};

run();
