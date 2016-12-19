(function () {
    'use strict';

    var domReady = function (cb) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', cb);
        } else {
            cb();
        }
    };

    var main = function () {
        var countElement = document.getElementById('count');
        var timeElement = document.getElementById('time');
        var messageElement = document.getElementById('message');
        var errorElement = document.getElementById('error');

        var source = new EventSource('/simple/test');
        var count = 0;
        var startTime = performance.now();
        var lastTimeDifference = 0;
        var lastMessage = '';
        var hasError = false;

        source.addEventListener('message', function (evt) {
            var currentTime = performance.now();
            lastTimeDifference = currentTime - startTime;
            startTime = currentTime;

            count += 1;

            lastMessage = evt.data;

            hasError = false;
        });

        source.addEventListener('error', function () {
            hasError = true;
        });

        (function updateLatest () {
            countElement.textContent = count;
            timeElement.textContent = lastTimeDifference;
            messageElement.textContent = lastMessage;
            errorElement.textContent = hasError;
            requestAnimationFrame(updateLatest);
        }());
    };

    domReady(main);
}());
