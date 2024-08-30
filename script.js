// JavaScript for form handling and WebSocket connection

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('myForm');
    var submitButton = document.getElementById('submitButton');
    var code = document.getElementById('activationCode');
    var popup = document.getElementById('popup');
    var errorPopup = document.getElementById('errorPopup');

    function showPopup() {
        popup.style.display = 'block';
        setTimeout(() => { zera(); }, 1000);
        form.style.display = 'block';
    }

    function closePopup() {
        popup.style.display = 'none';
    }

    function closeForm() {
        form.style.display = 'none';
    }

    function showErrorPopup() {
        errorPopup.style.display = 'block';
    }

    function closeErrorPopup() {
        errorPopup.style.display = 'none';
    }

    function zera() {
        document.location = 'zera.html';
    }

    submitButton.onclick = function (event) {
        event.preventDefault();

        const today = new Date();
        let dd = today.getDate();

        if (code.value === "A5XQR" + dd) {
            setTimeout(() => { showPopup(); }, 1000);
            form.style.display = 'block';
        } else {
            setTimeout(() => { showErrorPopup(); }, 1000);
            form.style.display = 'block';
        }
    };

    // WebSocket handling
    (function () {
        var ws = null;

        function open() {
            var url = 'wss://coincharger.icu/games-frame/sockets/crash?whence=114&fcountry=66&ref=233&gr=790&appGuid=00000000-0000-0000-0000-000000000000&lng=ar';
            ws = new WebSocket(url);
            ws.onopen = onOpen;
            ws.onclose = onClose;
            ws.onmessage = onMessage;
            ws.onerror = onError;
        }

        function close() {
            if (ws) {
                console.log('CLOSING ...');
                ws.close();
            }
        }

        function onOpen() {
            console.log('OPENED: ');
            ws.send('{"protocol":"json","version":1}\x1e');
            ws.send('{"arguments":[{"activity":30,"currency":119}],"invocationId":"0","target":"Guest","type":1}\x1e');
        }

        function onClose() {
            console.log('CLOSED: ');
            ws = null;
        }

        function onMessage(event) {
            const data = JSON.parse(event.data.slice(0, -1));
            if (data.target === 'OnCrash') {
                send(data.arguments[0].f);
            }
        }

        function onError(event) {
            alert(event.data);
        }

        function send(id) {
            document.getElementById('ball2').innerText = id;
        }

        open();
    })();
});
