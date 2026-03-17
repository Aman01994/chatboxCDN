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
      background: "#007bff",
      color: "white",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "24px",
      zIndex: "9999"
    });

    document.body.appendChild(button);

    // 🔵 Chatbox
    const chatbox = document.createElement("div");

    Object.assign(chatbox.style, {
      position: "fixed",
      bottom: "90px",
      right: "20px",
      width: "300px",
      height: "400px",
      background: "white",
      border: "1px solid #ccc",
      borderRadius: "10px",
      display: "none",
      flexDirection: "column",
      zIndex: "9999",
      fontFamily: "sans-serif"
    });

    chatbox.innerHTML = `
      <div style="background:#007bff;color:white;padding:10px;border-radius:10px 10px 0 0;">
        Chat Support
      </div>
      <div id="chat-messages" style="flex:1;overflow-y:auto;padding:10px;"></div>
      <div style="display:flex;border-top:1px solid #ccc;">
        <input id="chat-input" type="text" placeholder="Type..." style="flex:1;padding:10px;border:none;outline:none;">
        <button id="chat-send" style="padding:10px;border:none;background:#007bff;color:white;">Send</button>
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
      msg.style.margin = "6px 0";
      msg.style.textAlign = sender === "user" ? "right" : "left";
      msg.innerHTML = `<b>${sender === "user" ? "You" : "Bot"}:</b> ${text}`;
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

    sendBtn.onclick = sendMessage;

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }

  // expose globally
  window.initChatWidget = initChatWidget;

})();