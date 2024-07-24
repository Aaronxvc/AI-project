document.getElementById('send-btn').addEventListener('click', function() {
    let userInput = document.getElementById('user-input').value;
    if (userInput) {
        appendMessage('User', userInput);
        document.getElementById('user-input').value = '';
        botResponse(userInput);
    }
});

//handles the interaction with the server to get a response from the bot.
function appendMessage(sender, message) {
    let outputDiv = document.getElementById('output');
    let messageDiv = document.createElement('div');
    messageDiv.className = sender;
    messageDiv.textContent = `${sender}: ${message}`;
    outputDiv.appendChild(messageDiv);
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

async function botResponse(input) {
    try {
        const response = await fetch('http://localhost:3000/nlp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input })
        });

        const data = await response.json();
        appendMessage('Bot', data.response);
    } catch (error) {
        console.error('Error:', error);
        appendMessage('Bot', "I'm having trouble processing your request.");
    }
}

