function get_app(name, query) {
    if(name == 'images') {
        get_images(name, query);
    }
    var app_url_name = name;
    var xmlhttp1;
    if (window.XMLHttpRequest) {
        xmlhttp1 = new XMLHttpRequest()
    }
    else {
        xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
    }
    var url = "/static/html/" + app_url_name + ".html";
    xmlhttp1.open("GET", url, true);
    xmlhttp1.send();
    xmlhttp1.onreadystatechange = function () {
        if (xmlhttp1.readyState == 4 && xmlhttp1.responseText) {
            var div = document.getElementById('console');
            var app_url_name = name;
            var xmlhttp2;
            if (window.XMLHttpRequest) {
                xmlhttp2 = new XMLHttpRequest();
            }
            else {
                xmlhttp2 = new ActiveXObject("Microsoft.XMLHTTP")
            }
            var url = "/static/html/" + app_url_name + ".html";
            xmlhttp2.open("GET", url);
            xmlhttp2.send();
            xmlhttp2.onreadystatechange = function () {
                if (xmlhttp2.readyState == 4 && xmlhttp2.responseText) {
                    div.innerHTML += xmlhttp2.responseText;
                    }
                }
            }

        }
}

function get_images(name, query) {
    var img_array = [];
    $.ajax({
        url: "https://www.googleapis.com/customsearch/v1?key=AIzaSyAbh1vL6DG_IzgSETK7hv0llake78b6PZU&amp;cx=010998309132703936271:1hshv3bj2oy&amp;q=" + query,success:function(result){
            console.log(result);
        }
    });

    for(var i = 0; i < img.items.length; i++){
        var item = img.items[i];
        img_array += item.htmlTitle;
        console.log(img_array);
    }

};


function destroy_app(name) {
   $(name).remove();
}

function submit(e) {
    var input = $('#fisk-input').context.activeElement.value.split(' ');
    var arg1 = input[1];
    var arg2 = input[2];
    if (e.keyCode == 13) {
        clearInput();
        if (input[0] == 'images') {
            get_app('images', arg1);
        }
        if (input[0] == 'calc') {
            get_app('calc');
        }
        if (input[0] == 'timer') {
            if (!arg2) {
                arg2 = input[1].replace(/[^aA-zZ]/g, '');
                arg1 = arg1.replace(/[^0-9]/g, '');
            }
            if (arg2 == 'm' || arg2 == 'minute' || arg2 == 'minutes') {
                seconds = arg1 * 60;
                get_app('timer');
                //sleep(1000);
                countdownTimer = setInterval('secondPassed()', 1000);
            }
            if (arg2 == 's' || arg2 == 'second' || arg2 == 'seconds') {
                seconds = arg1;
                get_app('timer');
                //sleep(1000);
                countdownTimer = setInterval('secondPassed()', 1000);
            }
        }
        else if (input[0] == 'exit') {
            if (arg1 == 'timer') {
                destroy_app('#timer');
                clearInterval(countdownTimer);
            }
            if (arg1 == 'calc') {
                destroy_app('#calc');
                clearInterval(countdownTimer);
            }
        }
        else {
        }
    }
}

function clearInput() {
    $('#fisk-input').context.activeElement.value = '';
}

function playAudio() {
    var count = 10;
    var play = setInterval(function repeat() {
        count--;
        if (count === 0) {
            clearInterval(play);
        }
        var audio = new Audio("/static/beep-06.mp3");
        audio.play();
    }, 550);
    repeat();
}


function secondPassed() {
    var minutes = Math.round((seconds - 30) / 60);
    var remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    document.getElementById('clock').innerHTML = minutes + ":" + remainingSeconds;
    if (seconds == 0) {
        clearInterval(countdownTimer);
        playAudio();
        document.getElementById('clock').innerHTML = "Buzz Buzz";
    } else {
        seconds--;
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
