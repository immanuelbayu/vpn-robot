const fs = require('fs');
const opn = require('opn');

let urlData = '';
let max = 2, min = 1;
let randomMinute = (Math.floor(Math.random() * (max - min + 1)) + min) * 60 * 1000;

let execKillBrowser = require('child_process').exec;
let execChangeVpn = require('child_process').exec;
let childKillBrowser;
let childChangeVpn;
let timeOutKillBrowser = 10 * 60 * 1000;
let timeOutChangeVpn = 5 * 60 * 1000;

fs.readFile('blog.txt', 'utf8', function (err,data) {
	urlData = data.split(";");
});

function timeout() {
    setTimeout(function () {
    	console.log("First interval Func : " + randomMinute);

        let totalCount = urlData.length - 2;
		let random = Math.floor((Math.random() * totalCount) + 1);
		
		console.log("Index url : " + random);
		console.log("URL Link : " + urlData[random].trim());

		randomMinute = (Math.floor(Math.random() * (max - min + 1)) + min) * 60 * 1000;
		console.log("Second interval Func : " + randomMinute);

		let browserType = [];

		if(random % 2 == 1){
			console.log('Browser : Firefox');
			browserType = ['firefox'];
		} else if(random % 3 == 1) {
			console.log('Browser : Opera');
			browserType = ['opera'];
		} else {
			console.log('Browser : Chrome');
			browserType = ['google-chrome', '--incognito'];
		}

	  	opn(urlData[random].trim(), {app: browserType});

        timeout();
    }, randomMinute);

    setTimeout(function () {
    	childKillBrowser = execKillBrowser("./kill_browser.sh", function (error, stdout, stderr) {
		  console.log('stdout: ' + stdout);
		  console.log('stderr: ' + stderr);

		  if (error !== null) {
		    console.log('exec error: ' + error);
		  }
		});

        timeout();
    }, timeOutKillBrowser);

    setTimeout(function () {
    	childChangeVpn = execChangeVpn("./express.sh", function (error, stdout, stderr) {
		  console.log('stdout: ' + stdout);
		  console.log('stderr: ' + stderr);
		  
		  if (error !== null) {
		    console.log('exec error: ' + error);
		  }

		});

        timeout();
    }, timeOutChangeVpn);
};

timeout();