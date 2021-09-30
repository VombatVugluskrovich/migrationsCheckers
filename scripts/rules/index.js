const fs = require("fs");
const path = require("path");

const runCheck = async () => {
	const filePath = "./scripts/output/migrations-diff-add.txt";
	const addedMigrationsFile = fs.readFileSync(filePath, "utf8");
	const migrationsArray = addedMigrationsFile.split(/\n/);
	
	migrationsArray.forEach((migration) => {
		const filePath = path.join(
			"../migrations",
			migration
		);
		try {
			if(fs.existsSync(filePath)) {
				checkMigration(migration);
			}
		} catch(err){
			console.log(err);
		}
	});
	
};

const checkMigration = (fileName) => {
	const filePath = path.join(
		"../migrations",
		fileName
	);
	try {
		if(fs.existsSync(filePath)) {
			const readFile = fs.readFileSync(filePath, "utf8");
			const keywords = ["DROP", "DELETE"];
			return Promise.all([
				checkTimestamp(readFile), 
				checkIfTimestampLast(readFile), 
				checkKeywords(readFile, keywords), 
				checkConstraints(readFile)
			]);
		}
	} catch(err) {
		console.error(err)
	}
};

const checkTimestamp = async (file) => console.log("timestamp");
const checkIfTimestampLast = async (file) => console.log("lastTimestamp");
const checkKeywords = async (file, keywords) => console.log("keywords");
const checkConstraints = async (file) => console.log("constraint");

module.exports = {
  checkMigration
};

runCheck();
