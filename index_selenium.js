const webdriverio = require('webdriverio');
const fs = require('fs');
const options = {
	desiredCapabilites: {
		browserName: 'chrome'
	}
};

const client = webdriverio.remote(options);

let urlData = '';
let max = 1, min = 0.5;
let randomMinute = (Math.floor(Math.random() * (max - min + 1)) + min) * 60 * 1000;

fs.readFile('blog.txt', 'utf8', function (err,data) {
	urlData = data.split(";");
});

let totalCount = urlData.length - 2;
let random = Math.floor((Math.random() * totalCount) + 1);

function open() {
	return client
	.init()
	.url(urlData[random].trim())
}

const scrollDelay = 500;

function scroll() {
	return client.execute(() => {
		let keepScroll = true;
		let $scrollTop = $(window).scrollTop();
		let $windowHeight = $(window).height();
		let $pageHeight = $('body').height() - $(window).innerHeight();
		
		try {
			let $scroller = $(window);
			keepScroll = $scrollTop < $pageHeight;
			$('body,html').stop().animate({
				scrollTop: $scrollTop + 300
			},800,'easeInOutCubic');
		} catch (e) {
			keepScroll = false;
			console.error(e);
		}

		return keepScroll;
     }).then((result) => {
		keepScroll = result.value;
		if (result.value) {
			return client.pause(scrollDelay).then(scroll);
		}

		return client;
     });
 }

setInterval(() => {
	open()
	.then(scroll)
	.url(urlData[random].trim())
	.then(scroll).end();
}, randomMinute);