const fs = require("fs");
const path = require("path");
const mailer = require("./mailer/mailSender");

const MIGRATIONS_DIFF_FILE_PATH = path.join(__dirname, "output/migrations-diff.txt");
const rules = [() => console.log("prva"), () => console.log("druga")];

const run = async () => {
  //   const messages = [
  //     {
  //       dateTime: "01-01-2021",
  //       severity: "error",
  //       message: "DNA error. Please replace user and press any key",
  //     },
  //     {
  //       dateTime: "01-01-2021",
  //       severity: "warning",
  //       message: "User might cause damage due to low IQ index",
  //     },
  //     {
  //       dateTime: "01-01-2021",
  //       severity: "info",
  //       message: "Next time please be carefull chossing miogration user",
  //     },
  //   ];
  //   mailer.sendEmails(messages);
  const diff = fs.readFileSync(MIGRATIONS_DIFF_FILE_PATH, "utf8");
  const diffLines = diff.split(/\r?\n/);

  for (let diffLine of diffLines) {
    console.log(diffLine);
    for (let checkRule of rules) {
      await checkRule(diffLine);
    }
  }
};

run();
