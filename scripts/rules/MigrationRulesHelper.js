const MigrationRulesHelper = {
  outputMessages: [],
  emailMessages: [],
  addOutputMessage: (severity, type, path, detailedMessage) => {
    let message = `${severity}: file ${path}, change type ${type}!`;
    let emailMessage = {
      dateTime: new Date().toISOString().slice(0, 20),
      severity: severity,
      message: `file: ${path}<br> change type: ${type}`,
    };

    if (detailedMessage) {
      message += ` ${detailedMessage}`;
      emailMessage.message += detailedMessage;
    }

    MigrationRulesHelper.outputMessages.push(message);
    MigrationRulesHelper.emailMessages.push(emailMessage);
  },
  log: () => {
    if (MigrationRulesHelper.outputMessages.length) {
      console.log(MigrationRulesHelper.outputMessages);
      const emailSender = require("./../mailer/mailSender");
      // await emailSender.sendEmails(MigrationRulesHelper.emailMessages);
      throw new Error(
        "Migration changes need to be manually checked. The PR reviewers are notified by email already."
      );
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
