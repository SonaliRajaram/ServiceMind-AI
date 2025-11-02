function toggleChatbox() {
    const chatbox = document.getElementById('chatbot');
    chatbox.classList.toggle('hidden');
}

let sessionId = Date.now();
let recognition;

// Initialize speech recognition
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById("userInput").value = transcript;
        sendMessage(); // auto-send voice message
    };

    recognition.onerror = function (event) {
        console.error("Speech recognition error:", event.error);
        alert("Voice input failed. Please try again.");
    };
} else {
    console.warn("Speech Recognition not supported in this browser.");
}

// Text-to-Speech (Bot speaks its response)
function speakResponse(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.pitch = 1;
        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);
    } else {
        console.warn("Speech synthesis not supported in this browser.");
    }
}

// Start listening for user's voice
function startVoiceInput() {
    if (recognition) recognition.start();
    else alert("Your browser does not support voice recognition.");
}

// Send message to backend and display + speak response
function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;

    document.getElementById("chatbox").innerHTML += `<p class='user'>You: ${userInput}</p>`;
    document.getElementById("userInput").value = "";

    fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        const botReply = data.response;
        document.getElementById("chatbox").innerHTML += `<p class='bot'>Bot: ${botReply}</p>`;
        speakResponse(botReply); // Bot speaks its reply
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Something went wrong. Please try again.");
    });
}

// Press Enter to send
document.getElementById("userInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});
