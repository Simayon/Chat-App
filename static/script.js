const chatLog = document.getElementById('chat-log');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);

// Fetch and display existing messages on page load
fetch('/get_messages')
	.then(response => response.json())
	.then(messages => {
		messages.forEach(message => {
			appendMessageToChatLog(message);
		});
	});

function sendMessage() {
	const message = messageInput.value.trim();
	if (message) {
		fetch('/send_message', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ message }),
		})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					appendMessageToChatLog(message);
					messageInput.value = ''; // Clear input field
				}
			});
	}
}

function appendMessageToChatLog(message) {
	const messageElement = document.createElement('div');
	messageElement.textContent = message;
	chatLog.appendChild(messageElement);
}

// Fetch messages every 2 seconds
setInterval(() => {
fetch('/get_messages')
	.then(response => response.json())
	.then(data => {
		const chatLog = document.getElementById('chat-log');
		chatLog.innerHTML = ''; // Clear existing messages

			data.forEach(message => {
				const messageElement = document.createElement('div');
				messageElement.textContent = message;
				chatLog.appendChild(messageElement);
			});
		});
}, 2000); // 2000 milliseconds = 2 seconds

