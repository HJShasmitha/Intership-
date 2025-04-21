const messageList = document.querySelector(".chat-box");
const input = document.querySelector(".chat-input input");
const sendButton = document.querySelector(".chat-input button");

// Focus the input field when page loads
window.onload = () => input.focus();

// Add a message to the chat window
function addMessage(text, className) {
    const message = document.createElement("div");
    message.classList.add("chat-message", className);
    message.innerHTML = `<div class="chat-message-text">${text}</div>`;
    messageList.appendChild(message);
    messageList.scrollTop = messageList.scrollHeight;
}

// Send user input to AI backend and display response
async function sendMessage() {
    const userText = input.value.trim();
    if (userText === "") return;

    addMessage(userText, "user-message");
    input.value = "";

    // Typing indicator
    const typing = document.createElement("div");
    typing.classList.add("chat-message", "bot-message");
    typing.innerHTML = `<div class="chat-message-text">Typing...</div>`;
    messageList.appendChild(typing);
    messageList.scrollTop = messageList.scrollHeight;

    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userText }),
        });

        const data = await response.json();
        typing.remove();
        addMessage(data.reply, "bot-message");
    } catch (error) {
        typing.remove();
        addMessage("Oops! Something went wrong.", "bot-message");
        console.error("Error communicating with AI:", error);
    }
}

// Button click handler
sendButton.addEventListener("click", sendMessage);

// Enter key handler
input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});
