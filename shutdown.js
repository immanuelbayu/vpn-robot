let execKillBrowser = require('child_process').exec;
let timeOutKillBrowser = 10 * 60 * 1000;
let childKillBrowser;

function timeout() {
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
};

timeout();