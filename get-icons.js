const fileSystem = require('fs');
// important to look at URL and use http or https and require it
const https = require('https');

 // browse to this URL out and see what it looks like
 const logoutIconUrl = 'https://raw.githubusercontent.com/wesbos/Learn-Node/master/stepped-solutions/45%20-%20Finished%20App/public/images/icons/logout.svg';
 const logoutIcon = fileSystem.createWriteStream(__dirname + '/public/images/icons/logout.svg');
 const request = https.get(logoutIconUrl, function(response) {
   response.pipe(logoutIcon);
 });
