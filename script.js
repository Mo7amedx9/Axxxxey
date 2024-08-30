var form = document.getElementById('myForm');
var submitButton = document.getElementById('submitButton');
var code = document.getElementById('activationCode');

function showPopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'block';
    setTimeout(() => { zera(); }, 1000);
    form.style.display = 'block';
}

function closePopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
}

submitButton.onclick = function(event) {
    event.preventDefault();

    const today = new Date();
    let dd = today.getDate();

    if (code.value === "A5XQR" + dd) {
        setTimeout(() => { showPopup(); }, 1000);
        form.style.display = 'block';
    } else {
        setTimeout(() => { checkCode(); }, 1000);
        form.style.display = 'block';
    }
};

function zera() {
    document.location = 'zera.html';
}

function closeForm() {
    form.style.display = 'none';
}

function checkCode() {
    showErrorPopup();
}

function showErrorPopup() {
    var popup = document.getElementById('errorPopup');
    popup.style.display = 'block';
}

function closeErrorPopup() {
    var popup = document.getElementById('errorPopup');
    popup.style.display = 'none';
}

var openButton = document.getElementById('ball1');

openButton.onclick = function() {
    form.style.display = 'block';
};

function closeForm() {
    form.style.display = 'none';
}

new function() {
    var ws = null;

    var open = function() {
        var url = 'wss://coincharger.icu/games-frame/sockets/crash?whence=114&fcountry=66&ref=233&gr=790&appGuid=00000000-0000-0000-0000-000000000000&lng=ar';
        ws = new WebSocket(url);
        ws.onopen = onOpen;
        ws.onclose = onClose;
        ws.onmessage = onMessage;
        ws.onerror = onError;
    }

    var close = function() {
        if (ws) {
            console.log('CLOSING ...');
            ws.close();
        }
    }

    var onOpen = function() {
        console.log('OPENED: ');
        ws.send('{"protocol":"json","version":1}\x1e');
        ws.send('{"arguments":[{"activity":30,"currency":119}],"invocationId":"0","target":"Guest","type":1}\x1e');
    };

    var onClose = function() {
        console.log('CLOSED: ');
        ws = null;
    };

    var onMessage = function(event) {
        const data = JSON.parse(event.data.slice(0, -1));
        if (data.target === 'OnCrash') {
            send(data.arguments[0].f);
        }
    };

    var onError = function(event) {
        alert(event.data);
    }

    open();
}

function send(id) {
    document.getElementById('ball2').innerText = id;
}
