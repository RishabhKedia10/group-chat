const socket = io();

let name = localStorage.getItem("userName");
if (!name) {
  name = prompt("Please enter your name:");
  localStorage.setItem("userName", name);
}

let textarea = document.querySelector("#text_area");
let chatarea = document.querySelector(".chat-messages");

function appendMessage(message, type) {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("chat-message", type);

  let markup = `
    <h5>${message.user}</h5>
    <p>${message.message}</p>
  `;

  mainDiv.innerHTML = markup;
  chatarea.appendChild(mainDiv);
  chatarea.scrollTop = chatarea.scrollHeight;
}

function sendMessage() {
  let msg = textarea.value.trim();
  if (msg) {
    let message = {
      user: name,
      message: msg,
    };

    appendMessage(message, "outgoing");
    socket.emit("message", message);
    textarea.value = "";
  }
}

socket.on("message", (message) => {
  appendMessage(message, "incoming");
});

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
