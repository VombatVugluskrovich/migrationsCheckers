const fs = require("fs");
const path = require("path");
const keywords = ["DROP", "DELETE"];
const mrh = require('./MigrationRulesHelper');

const runCheck = async () => {
	const filePath = "./scripts/output/migrations-diff-add.txt";
	const addedMigrationsFile = fs.readFileSync(filePath, "utf8");
	const migrationsArray = addedMigrationsFile.split(/\n/);
	
	migrationsArray.forEach((migration) => {
		const filePath = path.join(
			"./migrations",
			migration
		);
		try {
			if(!fs.existsSync(filePath)) {
				throw `Error: Migration file not found ${filePath}`;
			}
			checkMigration(filePath, migration);
		} catch(err){
			console.log(err);
		}
	});
	
};

const checkMigration = (filePath, migration) => {
	try {
		const readFile = fs.readFileSync(filePath, "utf8");

		return Promise.all([
			checkMigrationName(migration, filePath),
			checkTimestamp(migration), 
			checkIfTimestampLast(readFile), 
			checkKeywords(readFile), 
			checkConstraints(readFile)
		]);
	
	} catch(err) {
		console.error(err)
	}
};

const checkMigrationName = async (migrationNme, filePath) => {
	const regex = new RegExp('/\d{13}-\W*\D*.ts/');
	if(!regex.test(migrationNme)) {
		mrh.MigrationRulesHelper.addOutputMessage(mrh.Severity.CRITICAL, 'add', filePath, 'Invalid migration name');
	}
}
const checkTimestamp = async (migrationName) => console.log("timestamp");
const checkIfTimestampLast = async (file) => console.log("lastTimestamp");
const checkKeywords = async (file, keywords) => console.log("keywords");
const checkConstraints = async (file) => console.log("constraint");

module.exports = {
  checkMigration
};

runCheck();
