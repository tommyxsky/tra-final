require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
const Store = require('../models/Store');
// const Review = require('../models/Review');
const User = require('../models/User');

// load in our sample user
// dev log in is usr: admin2@tra.com pwd: 123
const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));

// load in all of our stores (each store is owed by our sample user)
const gymboree = JSON.parse(
  fs.readFileSync(__dirname + '/gymboree.json', 'utf-8')
);

const payless = JSON.parse(
  fs.readFileSync(__dirname + '/payless.json', 'utf-8')
);

const joesCrabShack = JSON.parse(
  fs.readFileSync(__dirname + '/joes-crab-shack.json', 'utf-8')
);

const sears = JSON.parse(fs.readFileSync(__dirname + '/sears.json', 'utf-8'));

const jcpenney = JSON.parse(
  fs.readFileSync(__dirname + '/jcpenney.json', 'utf-8')
);

const kmart = JSON.parse(fs.readFileSync(__dirname + '/kmart.json', 'utf-8'));

const familyChristian = JSON.parse(
  fs.readFileSync(__dirname + '/family-christian.json', 'utf-8')
);

const sportsAuthority = JSON.parse(
  fs.readFileSync(__dirname + '/sports-authority.json', 'utf-8')
);

const macys = JSON.parse(fs.readFileSync(__dirname + '/macys.json', 'utf-8'));

const radioshack = JSON.parse(
  fs.readFileSync(__dirname + '/radioshack.json', 'utf-8')
);

// const reviews = JSON.parse(fs.readFileSync(__dirname + '/reviews.json', 'utf-8'));

// blow up all our data to start from scratch again
async function deleteData() {
  console.log('Goodbye Data...');
  await Store.remove();
  // await Review.remove();
  await User.remove();
  console.log(
    'Data Deleted. To load sample data, run\n\n\t npm run sample\n\n'
  );
  process.exit();
}

async function loadData() {
  try {
    // update our db with our sample user
    await User.insertMany(users);

    // update our db with our starter stores
    await Store.insertMany(gymboree);
    await Store.insertMany(payless);
    await Store.insertMany(sears);
    await Store.insertMany(jcpenney);
    await Store.insertMany(kmart);
    await Store.insertMany(macys);
    await Store.insertMany(radioshack);
    await Store.insertMany(familyChristian);
    await Store.insertMany(joesCrabShack);
    await Store.insertMany(sportsAuthority);

    // await Review.insertMany(reviews);
    console.log('Done Inserting Data!');
    process.exit();
  } catch (e) {
    console.log(
      '\n Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n'
    );
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
