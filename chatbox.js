// (function () {
//   function initChatWidget(config) {
//     const { containerId } = config;

//     const container = document.getElementById(containerId);
//     if (!container) {
//       console.error("Container not found");
//       return;
//     }

//     // UI
//     container.innerHTML = `
//       <div style="width:300px;border:1px solid #ccc;border-radius:10px;font-family:sans-serif;">
//         <div style="background:#007bff;color:white;padding:10px;border-radius:10px 10px 0 0;">
//           Demo Chatbot
//         </div>
//         <div id="chat-messages" style="height:250px;overflow-y:auto;padding:10px;"></div>
//         <div style="display:flex;border-top:1px solid #ccc;">
//           <input id="chat-input" type="text" placeholder="Ask something..." style="flex:1;padding:10px;border:none;outline:none;">
//           <button id="chat-send" style="padding:10px;border:none;background:#007bff;color:white;">Send</button>
//         </div>
//       </div>
//     `;

//     const messagesDiv = container.querySelector("#chat-messages");
//     const input = container.querySelector("#chat-input");
//     const button = container.querySelector("#chat-send");

//     function addMessage(text, sender) {
//       const msg = document.createElement("div");
//       msg.style.margin = "6px 0";
//       msg.style.textAlign = sender === "user" ? "right" : "left";
//       msg.innerHTML = `<b>${sender === "user" ? "You" : "Bot"}:</b> ${text}`;
//       messagesDiv.appendChild(msg);
//       messagesDiv.scrollTop = messagesDiv.scrollHeight;
//     }

//     // 🔥 DEMO AI LOGIC (no backend)
//     function fakeAIResponse(userText) {
//       const text = userText.toLowerCase();

//       if (text.includes("price") || text.includes("cost")) {
//         return "Our pricing starts from $10/month.";
//       }
//       if (text.includes("contact")) {
//         return "You can contact us at support@example.com";
//       }
//       if (text.includes("hello") || text.includes("hi")) {
//         return "Hello 👋 How can I help you?";
//       }

//       return "Sorry, I am a demo bot 🤖. Backend AI coming soon!";
//     }

//     function sendMessage() {
//       const text = input.value.trim();
//       if (!text) return;

//       addMessage(text, "user");
//       input.value = "";

//       // simulate delay
//       setTimeout(() => {
//         const reply = fakeAIResponse(text);
//         addMessage(reply, "bot");
//       }, 500);
//     }

//     button.addEventListener("click", sendMessage);
//     input.addEventListener("keypress", function (e) {
//       if (e.key === "Enter") sendMessage();
//     });
//   }

//   window.initChatWidget = initChatWidget;
// })();

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