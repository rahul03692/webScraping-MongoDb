
const axios = require("axios");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const getAllMatches = require('./allMatches');

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

axios(url)
  .then((response) =>{
      extractHTML(response.data);
  })
  .catch((err) => console.log(err.message));


function extractHTML(html){
    const {document} = new JSDOM(html).window;

    const link=document.querySelector('[data-hover="View All Results"]').getAttribute('href');
    const fullLink="https://www.espncricinfo.com"+link;

    getAllMatches(fullLink);
}