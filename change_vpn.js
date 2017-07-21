let execChangeVpn = require('child_process').exec;
let childChangeVpn;
let timeOutChangeVpn = 5 * 60 * 1000;

function timeout() {
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