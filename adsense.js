const fs = require('fs');
const opn = require('opn');

let urlData = '';
let max = 5, min = 1;
let randomMinute = (Math.floor(Math.random() * (max - min + 1)) + min) * 60 * 1000;

fs.readFile('adsense.txt', 'utf8', function (err,data) {
	urlData = data.split(";");
});

function browserTimeout() {
    setTimeout(function () {
    	console.log("First interval Func : " + randomMinute);

        let totalCount = urlData.length - 2;
		let random = Math.floor((Math.random() * totalCount) + 1);
		
		console.log("Index url : " + random);
		console.log("URL Link : " + urlData[random].trim());

		randomMinute = (Math.floor(Math.random() * (max - min + 1)) + min) * 60 * 1000;
		console.log("Second interval Func : " + randomMinute);

		let browserType = [['opera'], ['google-chrome', '--incognito'], ['firefox', '-private-window']];
		let randomBrowser = Math.floor((Math.random() * (2 - 0 + 1)));	

		console.log("Use Browser : " + browserType[randomBrowser]);

	  	opn(urlData[random].trim(), {app: browserType[randomBrowser]});

        browserTimeout();
    }, randomMinute);
};

browserTimeout();