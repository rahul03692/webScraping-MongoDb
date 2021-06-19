const xlsx = require("xlsx");
const fs = require("fs");


module.exports = function readFromExcel(filePath, sheetName) {
  if (fs.existsSync(filePath) == false) return [];

  const file = xlsx.readFile(filePath);
  const excelData = file.Sheets[sheetName];
  const ans=xlsx.utils.sheet_to_json(excelData);
  return ans;
};

module.exports = function writeToExcel(filePath, json, sheetName) {
  const newWB = xlsx.utils.book_new();
  const newWS = xlsx.utils.json_to_sheet(json);

  xlsx.utils.book_append_sheet(newWB, newWS, sheetName);

  // Writing to our file
  reader.writeFile(newWB, filePath);
};
