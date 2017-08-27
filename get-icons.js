const fileSystem = require('fs');
// important to look at URL and use http or https and require it
const https = require('https');

// browse to this URL out and see what it looks like
// const pencilIconUrl = 'https://raw.githubusercontent.com/wesbos/Learn-Node/master/stepped-solutions/45%20-%20Finished%20App/public/images/icons/pencil.svg';
// const pencilIcon = fileSystem.createWriteStream(__dirname + '/public/images/icons/pencil.svg');
// const request = https.get(pencilIconUrl, function(response) {
//   response.pipe(pencilIcon);
// });
// const addIconUrl = 'https://raw.githubusercontent.com/wesbos/Learn-Node/master/stepped-solutions/45%20-%20Finished%20App/public/images/icons/add.svg';
// const addIcon = fileSystem.createWriteStream(__dirname + '/public/images/icons/add.svg');
// const request = https.get(addIconUrl, function(response) {
//   response.pipe(addIcon);
// });
// const cogIconUrl = 'https://raw.githubusercontent.com/wesbos/Learn-Node/master/stepped-solutions/45%20-%20Finished%20App/public/images/icons/cog.svg';
// const cogIcon = fileSystem.createWriteStream(__dirname + '/public/images/icons/cog.svg');
// const request = https.get(cogIconUrl, function(response) {
//   response.pipe(cogIcon);
// });
const reviewIconUrl = 'https://raw.githubusercontent.com/wesbos/Learn-Node/master/stepped-solutions/45%20-%20Finished%20App/public/images/icons/review.svg';
const reviewIcon = fileSystem.createWriteStream(__dirname + '/public/images/icons/review.svg');
const request = https.get(reviewIconUrl, function(response) {
  response.pipe(reviewIcon);
});
