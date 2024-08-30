      window.onload = function() {
            var modal = document.getElementById('modal');
            modal.style.display = 'flex';

            document.getElementById('confirmButton').onclick = function() {
                modal.style.display = 'none';
                openWebSocket(); // بدء الاتصال بالـ WebSocket بعد التأكيد
            };

            document.getElementById('cancelButton').onclick = function() {
                modal.style.display = 'none';
                window.location.href = 'https://your-cancellation-link.com'; // إعادة التوجيه عند إلغاء الاتصال
            };
        };

        var ws = null;
        var previousValues = [];
        var currentIndex = 0;

        function openWebSocket() {
            var url = 'wss://consdesk.com/games-frame/sockets/crash?whence=114&fcountry=66&ref=233&gr=790&appGuid=games-web-master&lng=ar';
            ws = new WebSocket(url);

            ws.onopen = function() {
                console.log('WebSocket opened');
                ws.send('{"protocol":"json","version":1}\x1e');
                ws.send('{"arguments":[{"activity":30,"currency":119}],"invocationId":"0","target":"Guest","type":1}\x1e');
            };

            ws.onclose = function() {
                console.log('WebSocket closed');
                ws = null;
            };

            ws.onmessage = function(event) {
                var data = JSON.parse(event.data.slice(0, -1));
                if (data.target === 'OnCrash') {
                    previousValues.push(data.arguments[0].f);
                    displayNextValue();
                }
            };

            ws.onerror = function(event) {
                console.error('WebSocket error:', event);
            };
        }

        function displayNextValue() {
            if (currentIndex < previousValues.length) {
                var crashValueElement = document.getElementById('crashValue');
                crashValueElement.innerText = previousValues[currentIndex].toFixed(2); // Ensure the number is formatted to 2 decimal places
                currentIndex++;
            }
        }
