const fs = require('fs');
const opn = require('opn');

let urlData = '';
let max = 1, min = 0.5;
let randomMinute = (Math.floor(Math.random() * (max - min + 1)) + min) * 60 * 1000;

let execKillBrowser = require('child_process').exec;
let timeOutKillBrowser = 30 * 60 * 1000;
let childKillBrowser;

let execChangeVpn = require('child_process').exec;
let childChangeVpn;
let timeOutChangeVpn = 15 * 60 * 1000;

fs.readFile('blog.txt', 'utf8', function (err,data) {
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

function killBrowserTimeout() {
    setTimeout(function () {
    	childKillBrowser = execKillBrowser("./kill_browser.sh", function (error, stdout, stderr) {
		  console.log('stdout: ' + stdout);
		  console.log('stderr: ' + stderr);

		  if (error !== null) {
		    console.log('exec error: ' + error);
		  }
		});

        killBrowserTimeout();
    }, timeOutKillBrowser);
};

function changeVpnTimeout() {
    setTimeout(function () {
    	childChangeVpn = execChangeVpn("./express.sh", function (error, stdout, stderr) {
		  console.log('stdout: ' + stdout);
		  console.log('stderr: ' + stderr);
		  
		  if (error !== null) {
		    console.log('exec error: ' + error);
		  }

		});

        changeVpnTimeout();
    }, timeOutChangeVpn);
};


browserTimeout();
changeVpnTimeout();
killBrowserTimeout();