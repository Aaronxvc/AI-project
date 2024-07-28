async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    if (!userInput) return;

    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('User');
    userMessageDiv.textContent = `User: ${userInput}`;
    chatBox.appendChild(userMessageDiv);

    document.getElementById('user-input').value = '';

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Unknown error');
        }

        const data = await response.json();

        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('Bot');
        botMessageDiv.textContent = `Bot: ${data.reply}`;
        chatBox.appendChild(botMessageDiv);

        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error('Error sending message:', error);
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.classList.add('Error');
        errorMessageDiv.textContent = `Error: ${error.message}`;
        chatBox.appendChild(errorMessageDiv);
    }
}

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

