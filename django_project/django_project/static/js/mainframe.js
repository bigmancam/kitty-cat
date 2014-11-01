function get_app(name, query) {
    var app_url_name = name;
    var xmlhttp1;
    if(name == 'images') {
        get_images(name, query);
        setup1();
        sleep(1000);
        toggle();
        return;
    }
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
                    div.insertAdjacentHTML('afterbegin',xmlhttp2.responseText);
                    }
            };
            }

        }
}

var meta;
var transition;
var state = {
  opened: false
};

if(document.documentURI == "http://cfisk.me/mainframe/") {
    document.addEventListener('polymer-ready', function () {
        // initial setup
        console.log("firing!!")
        setup1();
        document.getElementById('images').removeAttribute('hidden');
    });
}


function getMeta() {
      if (!meta) {
        meta = document.createElement('core-meta');
        meta.type = 'transition';
      }
      return meta;
}

function setup1() {
      var target = document.getElementById('images');
      if (transition) {
        transition.teardown(target);
      }

      var value = "core-transition-center";
      transition = getMeta().byId(value);
      transition.setup(target);
}

function toggle() {
    var target = document.getElementById('images');
    state.opened = !state.opened;
    transition.go(target, state);
}

function get_images(name, query) {
    var img_array = [];
    $.ajax({
        url: "https://www.googleapis.com/customsearch/v1?key=AIzaSyAbh1vL6DG_IzgSETK7hv0llake78b6PZU&cx=010998309132703936271:1hshv3bj2oy&q=" + query,success:function(result){
        var img = result;
        for(var i = 0; i < img.items.length; i++){
            var item = img.items[i];
            img_array += item.pagemap.cse_image[0].src;
            var list = document.getElementById('images');
            list.innerHTML += "<a class='image_list'>" + "<li><img id='image" + i + "' src='" + item.pagemap.cse_image[0].src + "' class='image_search' /></li></a>";
        }
    }
});
}

function clearImages() {
        $('#images').empty();
}

function destroy_app(name) {
   if(name == 'images') {clearImages();}
   $(name).remove();
}

function clearInput() {
    $('#fisk-input').context.activeElement.value = '';
}

var seconds, countdownTimer;
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
