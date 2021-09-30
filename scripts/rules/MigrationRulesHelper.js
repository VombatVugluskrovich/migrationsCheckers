const MigrationRulesHelper = {
    outputMessages: [],
    addOutputMessage: (severity, type, path, detailedMessage) => {
        let message = `${severity}: file ${path}, change type ${type}!`;
        if (detailedMessage) {
            message += detailedMessage;
        }
        MigrationRulesHelper.outputMessages.push(message);
    }
}

const Severity = {
    CRITICAL: 'Critical',
    WARNING: 'Warning',
    INFO: 'Info',
}

module.exports = {
    MigrationRulesHelper,
    Severity,
}