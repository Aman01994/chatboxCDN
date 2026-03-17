(function () {

  function initChatWidget(config = {}) {
    console.log("Chatbox initialized ✅");

    // Prevent multiple instances
    if (document.getElementById("chat-widget-button")) return;

    // 🔵 Floating button
    const button = document.createElement("div");
    button.id = "chat-widget-button";
    button.innerHTML = "💬";

    Object.assign(button.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "60px",
      height: "60px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "24px",
      zIndex: "9999",
      boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
      transition: "all 0.3s ease",
      border: "none"
    });

    button.addEventListener("mouseenter", () => {
      button.style.transform = "scale(1.1)";
      button.style.boxShadow = "0 15px 40px rgba(102, 126, 234, 0.6)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "scale(1)";
      button.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.4)";
    });

    document.body.appendChild(button);

    // 🔵 Chatbox
    const chatbox = document.createElement("div");

    Object.assign(chatbox.style, {
      position: "fixed",
      bottom: "90px",
      right: "20px",
      width: "380px",
      height: "480px",
      background: "white",
      border: "none",
      borderRadius: "16px",
      display: "none",
      flexDirection: "column",
      zIndex: "9999",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
      overflow: "hidden",
      animation: "slideUp 0.3s ease"
    });

    chatbox.innerHTML = `
      <style>
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chat-message { 
          margin: 10px 0;
          display: flex;
          animation: slideUp 0.3s ease;
        }
        .chat-message.user {
          justify-content: flex-end;
        }
        .chat-bubble {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 12px;
          word-wrap: break-word;
          font-size: 14px;
        }
        .chat-bubble.user {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px 4px 12px 12px;
        }
        .chat-bubble.bot {
          background: #f0f0f0;
          color: #333;
          border-radius: 4px 12px 12px 12px;
        }
      </style>
      <div style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;padding:16px;border-radius:16px 16px 0 0;font-weight:600;font-size:16px;box-shadow:0 2px 10px rgba(102,126,234,0.2);">
        💬 Chat Support
      </div>
      <div id="chat-messages" style="flex:1;overflow-y:auto;padding:16px;background:#f9f9f9;"></div>
      <div style="display:flex;gap:8px;padding:12px;background:white;border-top:1px solid #e0e0e0;">
        <input id="chat-input" type="text" placeholder="Type your message..." style="flex:1;padding:12px;border:1px solid #e0e0e0;border-radius:8px;outline:none;font-size:14px;transition:border 0.2s;">
        <button id="chat-send" style="padding:12px 20px;border:none;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;border-radius:8px;cursor:pointer;font-weight:600;transition:all 0.3s;">Send</button>
      </div>
    `;

    document.body.appendChild(chatbox);

    let isOpen = false;

    // 🔁 Toggle chatbox
    button.onclick = () => {
      isOpen = !isOpen;
      chatbox.style.display = isOpen ? "flex" : "none";
    };

    const messagesDiv = chatbox.querySelector("#chat-messages");
    const input = chatbox.querySelector("#chat-input");
    const sendBtn = chatbox.querySelector("#chat-send");

    function addMessage(text, sender) {
      const msg = document.createElement("div");
      msg.className = `chat-message ${sender}`;
      const bubble = document.createElement("div");
      bubble.className = `chat-bubble ${sender}`;
      bubble.textContent = text;
      msg.appendChild(bubble);
      messagesDiv.appendChild(msg);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // 🤖 Demo AI
    function fakeAI(text) {
      const t = text.toLowerCase();

      if (t.includes("price")) return "Pricing starts from $10/month 💰";
      if (t.includes("hello") || t.includes("hi")) return "Hey 👋 How can I help?";
      if (t.includes("contact")) return "Email: support@example.com";

      return "I am a demo bot 🤖";
    }

    function sendMessage() {
      const text = input.value.trim();
      if (!text) return;

      addMessage(text, "user");
      input.value = "";

      setTimeout(() => {
        addMessage(fakeAI(text), "bot");
      }, 500);
    }

    sendBtn.addEventListener("mouseenter", () => {
      sendBtn.style.transform = "scale(1.05)";
      sendBtn.style.boxShadow = "0 5px 15px rgba(102, 126, 234, 0.3)";
    });

    sendBtn.addEventListener("mouseleave", () => {
      sendBtn.style.transform = "scale(1)";
      sendBtn.style.boxShadow = "none";
    });

    input.addEventListener("focus", () => {
      input.style.borderColor = "#667eea";
      input.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
    });

    input.addEventListener("blur", () => {
      input.style.borderColor = "#e0e0e0";
      input.style.boxShadow = "none";
    });

    sendBtn.onclick = sendMessage;

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }

  // expose globally
  window.initChatWidget = initChatWidget;

})();