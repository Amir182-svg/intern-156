document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const clearChat = document.getElementById('clearChat');
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const chatBody = document.getElementById('chatBody');

    // 1. Toggle Chat Open/Close
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.remove('hidden');
        chatToggle.style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        chatToggle.style.display = 'flex';
    });

    // 2. Clear Chat Function (Keeps the buttons)
    clearChat.addEventListener('click', () => {
        chatBody.innerHTML = '';
        const initialMsg = document.createElement('div');
        initialMsg.className = 'message bot-msg';
        initialMsg.innerHTML = `👋 Hello! I'm the Inquisitors Society Assistant.<br>
            I can help you with:<br><br>
            <button class="quick-btn" onclick="sendQuickMessage('Courses & Certificates')">📚 Courses & Certificates</button><br>
            <button class="quick-btn" onclick="sendQuickMessage('Internships')">🎯 Internships</button><br>
            <button class="quick-btn" onclick="sendQuickMessage('Events & Workshops')">🏛️ Events & Workshops</button><br>
            <button class="quick-btn" onclick="sendQuickMessage('Career Development')">💼 Career Development</button><br>
            <button class="quick-btn" onclick="sendQuickMessage('Community Forums')">👥 Community Forums</button><br>
            <button class="quick-btn" onclick="sendQuickMessage('Account & Registration')">🔒 Account & Registration</button><br><br>
            What would you like to know?`;
        chatBody.appendChild(initialMsg);
    });

    // 3. Handle Sending Messages (Typing or Clicking Button)
    sendBtn.addEventListener('click', () => {
        const text = userInput.value.trim();
        if (text) sendMessage(text);
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = userInput.value.trim();
            if (text) sendMessage(text);
        }
    });

    // EXPOSE THIS FUNCTION GLOBALLY SO THE HTML BUTTONS CAN CALL IT
    window.sendQuickMessage = function(text) {
        sendMessage(text);
    };

    async function sendMessage(text) {
        // Add user message
        appendMessage(text, 'user-msg');
        userInput.value = '';

        // Disable input while waiting
        userInput.disabled = true;
        sendBtn.disabled = true;
        sendBtn.textContent = '...';

        try {
            // CONNECT TO YOUR BACKEND
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: text })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            
            // Display bot reply
            const botReply = data.response || data.reply || data.message || "I received your message!";
            appendMessage(botReply, 'bot-msg');

        } catch (error) {
            console.error('Error:', error);
            appendMessage("⚠️ Sorry, couldn't connect to the server. Is your backend running on port 5000?", 'bot-msg');
        } finally {
            // Re-enable input
            userInput.disabled = false;
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send';
            userInput.focus();
        }
    }

    function appendMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.innerHTML = text.replace(/\n/g, '<br>');
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
});