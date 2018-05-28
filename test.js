var webdriverio = require('webdriverio');
var options = {
	desiredCapabilites: {
		browserName: 'chrome'
	}
};
var client = webdriverio.remote(options);

function open() {
	return client
	.init()
	.url('http://immanuelbayu.biz.id')
}


var scrollDelay = 200;
function scroll() {
	console.log('scrolling..');
	return client.execute(() => {
		console.log('scrolling..');
	     var keepScroll = true;
	     var $scrollTop = $(window).scrollTop();
		 var $windowHeight = $(window).height();
		 var $pageHeight = $('body').height() - $(window).innerHeight();
	     try {
	         var $scroller = $(window);
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

         console.log('scrolling done..');

         return client;
     });
 }

setInterval(() => {
	open()
	.then(scroll)
	.url('http://immanuelbayu.biz.id/blog/')
	.then(scroll).end();
}, 5000);