document.getElementById('send-btn').addEventListener('click', function() {
    let userInput = document.getElementById('user-input').value;
    if (userInput) {
        appendMessage('User', userInput);
        document.getElementById('user-input').value = '';
        botResponse(userInput);
    }
});

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
        console.log("Sending input to server:", input); // Debugging line
        const response = await fetch('/nlp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Bot response:", data); // Debugging line
        appendMessage('Bot', data.response);
    } catch (error) {
        console.error('Error:', error);
        appendMessage('Bot', "I'm having trouble processing your request.");
    }
}
