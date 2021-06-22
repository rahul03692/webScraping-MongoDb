// const axios = require("axios");

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// const getScorecard = require("./scorecard.js");

// module.exports = function getAllMatches(url) {
//   axios(url)
//     .then((response) => {
//       extractAllMatchesHTML(response.data);
//     })
//     .catch((err) => console.log(err.message));
// };

// function extractAllMatchesHTML(html) {
//   const { document } = new JSDOM(html).window;

//   const allMatches = document
//     .querySelectorAll('[data-hover="Scorecard"]');

  
//   for(let i=0;i<allMatches.length;i++){
//     const link=allMatches[i].getAttribute("href");
//     const fullLink = "https://www.espncricinfo.com" + link;

//     getScorecard(fullLink);
//   }
  
// }
