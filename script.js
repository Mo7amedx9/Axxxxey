document.getElementById('generateBtn').addEventListener('click', function() {
    const randomValue = (Math.random() + 1).toFixed(1);
    document.getElementById('result').textContent = `التوقع العشوائي هو: ${randomValue}`;
});
