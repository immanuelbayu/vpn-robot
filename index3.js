var time = 1000;

function timeout() {
    setTimeout(function () {
        time += 5000;
        console.log(time);
        timeout();
    }, time);
};

timeout();