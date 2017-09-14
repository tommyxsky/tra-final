// article for more info
// https://scotch.io/tutorials/scraping-the-web-with-node-js

const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

exports.scrapeStores = (req, res) => {
  // res.send('it works');
  // console.log(req.name);
  // res.render('index');

  // url we want to scrape
  const url =
    'https://www.yellowpages.com/search?search_terms=American+Apparel&geo_location_terms=wy';

  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code
  // and the html

  request(url, function(error, response, html) {
    // First we'll check to make sure no errors occurred when making the request

    if (!error) {
      // cheerio library give us jQuery functionality

      const $ = cheerio.load(html);

      let storeName;
      let storeStreet;
      let city;
      let state;
      let zip;
      let storeArray = [];
      let json = {};
      let address = [];

      $('.adr').each(function(i, e) {
        json[i] = {};
        const data = $(this);
        storeName = data
          .closest('.info')
          .find('h2')
          .children()
          .text();
        // console.log(street);
        // if (storeName === 'Teavana') {
        //   json[i].storeName = storeName;
        // }

        storeStreet = data
          .children()
          .first()
          .text();
        // console.log(street);
        // if (storeStreet) {
        //   json[i].storeStreet = storeStreet;
        // }

        city = data
          .children()
          .eq(1)
          .text();
        // console.log(city);
        // if (city) {
        //   json[i].city = city;
        // }

        state = data
          .children()
          .eq(2)
          .text();
        // console.log(state);
        // if (state) {
        //   json[i].state = state;
        // }

        zip = data
          .children()
          .last()
          .text();
        // console.log(zip);

        // if (zip) {
        //   json[i].zip = zip;
        // }
        if (storeName.includes('American Apparel')) {
          json[
            i
          ].address = `${storeName} ${storeStreet} ${city}${state} ${zip}`;
          address.push(`${storeName} ${storeStreet} ${city}${state} ${zip}\n`);
        }
        storeArray.push(json[i]);
      });
      // console.log(storeArray);
      // To write to the system we will use the built in 'fs' library.
      // In this example we will pass 3 parameters to the writeFile function
      // Parameter 1 :  output.json - this is what the created filename will be called
      // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
      // Parameter 3 :  callback function - a callback function to let us know the status of our function

      // fs.writeFile('output.json', JSON.stringify(storeArray, null, 4), function(
      //   err
      // ) {
      //   console.log('File written - check your project directory for file');
      // });

      fs.appendFile('address.txt', address, function(err) {
        console.log('File written - check your project directory for file');
      });
    }

    // send message to the browser reminding dev team that this app does not have a UI
    res.send('Check your console - no UI for this route. File created instead');
  });
};
