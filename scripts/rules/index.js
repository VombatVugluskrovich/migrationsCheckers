const fs = require("fs");
const path = require("path");

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
  checkMigration,
  //not sure if we ll need to export rest, we need only the main func (checkMigration())
  checkTimestamp,
  checkIfTimestampLast,
  checkKeywords,
  checkConstraints
};
