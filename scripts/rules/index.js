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

const splitMigration = (parsedString) => {
	const returningObject = {};
	const afterUp = parsedString.split("public async up(")[1];
	const splitAfterUp = afterUp.split("public async down(");
	returningObject.up = splitAfterUp[0];
	returningObject.down = splitAfterUp[1];
	return returningObject;	
};

const checkMigration = (filePath, migration) => {
	try {
		const readFile = fs.readFileSync(filePath, "utf8");

		return Promise.all([
			checkMigrationName(migration, filePath),
			checkTimestamp(migration), 
			checkIfTimestampLast(readFile), 
			checkKeywords(readFile), 
			checkConstraints(readFile, filePath)
		]);
	
	} catch(err) {
		console.error(err)
	}
};
const checkMigrationName = async (migrationNme, filePath) => {
	const regex = new RegExp(/\d{13}-\W*\D*.ts/);
	if(!regex.test(migrationNme)) {
		mrh.MigrationRulesHelper.addOutputMessage(mrh.Severity.CRITICAL, 'add', filePath, 'Invalid migration name');
	}
};
const checkTimestamp = async (migrationName) => console.log("timestamp");
const checkIfTimestampLast = async (file) => console.log("lastTimestamp");
const checkKeywords = async (file, keywords) => console.log("keywords");

const checkConstraints = async (file, filePath) => {
	const dividedMigration = splitMigration(file);
	const constraints = ["dropUniqueConstraint", "dropUniqueConstraint", "createUniqueConstraint", "ADD CONSTRAINT", "Add constraint", "add constraint"];
	constraints.forEach((constraint) => {
		if(dividedMigration.up.includes(constraint)){
			mrh.MigrationRulesHelper.addOutputMessage(mrh.Severity.WARNING, 'add', filePath, `Constraint changed: ${constraint}`);
		}
	});
};

module.exports = {
  checkMigration
};

runCheck();
