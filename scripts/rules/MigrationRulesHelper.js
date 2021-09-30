const MigrationRulesHelper = {
  outputMessages: [],
  addOutputMessage: (severity, type, path, detailedMessage) => {
    let message = `${severity}: file ${path}, change type ${type}!`;
    
    if (detailedMessage) {
      message += detailedMessage;
    }

    MigrationRulesHelper.outputMessages.push(message);
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
