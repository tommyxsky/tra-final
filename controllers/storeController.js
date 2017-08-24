const mongoose = require('mongoose');

exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};
