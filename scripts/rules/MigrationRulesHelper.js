const MigrationRulesHelper = {
  outputMessages: [],
  emailMessages: [],
  addOutputMessage: (severity, type, path, detailedMessage) => {
    let message = `${severity}: file ${path}, change type ${type}!`;
    let emailMessage = {
      dateTime: new Date.toString(),
      severity: severity,
      message: `file: ${path}<br> change type: ${type}` + detailedMessage ? ` ${detailedMessage}<br>` : "",
    };
    if (detailedMessage) {
      message += detailedMessage;
    }

    MigrationRulesHelper.outputMessages.push(message);
    emailMessages.push(emailMessage);
    const emailSender = require("./../mailer/mailSender");
    emailSender.sendEmails(emailMessages);
  },
  log: () => {
    if (MigrationRulesHelper.outputMessages.length) {
      console.log(MigrationRulesHelper.outputMessages);
    } else {
      console.log("All matched files use proper migration rules ");
    }
  },
};

const Severity = {
  CRITICAL: "Critical",
  WARNING: "Warning",
  INFO: "Info",
};

module.exports = {
  MigrationRulesHelper,
  Severity,
};
