const webdriverio = require('webdriverio');
const options = {
	desiredCapabilites: {
		browserName: 'chrome'
	}
};

const client = webdriverio.remote(options);

function open() {
	return client
	.init()
	.url('http://immanuelbayu.biz.id')
}

const scrollDelay = 200;
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
	.url('http://immanuelbayu.biz.id/blog/')
	.then(scroll).end();
}, 5000);