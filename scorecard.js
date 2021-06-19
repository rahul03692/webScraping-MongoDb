const axios = require("axios");
const path=require("path");
const fs=require("fs");
const xlsx=require("xlsx");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// const readFromExcel = require("./addingToExcel");
// const writeToExcel = require("./addingToExcel");

module.exports = function getScorecard(url) {
  axios(url)
    .then((response) => {
      extractScoreCardHTML(response.data);
    })
    .catch((err) => console.log(err.message));
};

function extractScoreCardHTML(html) {
  const { document } = new JSDOM(html).window;

  const description = document.querySelector(".description").textContent;
  const venue = description.split(",")[1].trim();
  const date = description.split(",")[2].trim();

  const result = document
    .querySelector(".event .status-text")
    .textContent.split("(")[0]
    .trim();

  const inningsArr = document.querySelectorAll(
    ".card.content-block.match-scorecard-table>.Collapsible"
  );

  for (let i = 0; i < inningsArr.length; i++) {
    //teamName
    const teamName = inningsArr[i]
      .querySelector("h5")
      .textContent.split("INNINGS")[0]
      .trim();

    const batsmansArr = inningsArr[i].querySelectorAll(
      ".table.batsman tbody tr"
    );

    for (let j = 0; j < batsmansArr.length; j++) {
      const columns = batsmansArr[j].querySelectorAll("td");
      const isNotEmpty = columns[0].classList.contains("batsman-cell");
      if (isNotEmpty) {
        const batsmanName = columns[0].textContent.trim();
        const runs = columns[2].textContent.trim();
        const balls = columns[3].textContent.trim();
        const fours = columns[5].textContent.trim();
        const sixes = columns[6].textContent.trim();
        const sr = columns[7].textContent.trim();

        // console.log(
        //   batsmanName +
        //     " " +
        //     runs +
        //     " " +
        //     balls +
        //     " " +
        //     fours +
        //     " " +
        //     sixes +
        //     " " +
        //     sr
        // );

        processPlayer(batsmanName, runs, balls, fours, sixes, sr, teamName,venue,date,result);
      }
    }
  }
}

function processPlayer(batsmanName, runs, balls, fours, sixes, sr, teamName,venue,date,result) {
  
  const teamPath = path.join(__dirname, "ipl", teamName);
  const playerPath = path.join(teamPath, batsmanName + ".xlsx");

  const dataFromExcel = readFromExcel(playerPath,batsmanName);

  const playerData={
    teamName,
    batsmanName,
    runs,
    balls,
    fours,
    sixes,
    sr,
    venue,
    date,
    result,
  };

  dataFromExcel.push(playerData);
  writeToExcel(playerPath,dataFromExcel,batsmanName);
  
}

function createDir(filePath) {
  if (fs.existsSync(filePath) == false) {
    fs.mkdirSync(filePath);
  }
}


function readFromExcel(filePath, sheetName) {
  if (fs.existsSync(filePath) == false) return [];

  const file = xlsx.readFile(filePath);
  const excelData = file.Sheets[sheetName];
  const ans=xlsx.utils.sheet_to_json(excelData);
  return ans;
};

function writeToExcel(filePath, json, sheetName) {
  const newWB = xlsx.utils.book_new();
  const newWS = xlsx.utils.json_to_sheet(json);

  xlsx.utils.book_append_sheet(newWB, newWS, sheetName);

  // Writing to our file
  xlsx.writeFile(newWB, filePath);
};