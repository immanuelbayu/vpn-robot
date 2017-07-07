let exec = require('child_process').exec;
let child;

function timeout() {
    setTimeout(function () {

    	child = exec("./kill_browser.sh", function (error, stdout, stderr) {
		  console.log('stdout: ' + stdout);
		  console.log('stderr: ' + stderr);

		  if (error !== null) {
		    console.log('exec error: ' + error);
		  }
		});

        timeout();
    }, 30 * 60 * 1000);
};

timeout();