let username = localStorage.getItem("username");
if (!username) {
  username = prompt("Please Tell Us Your Name");
  localStorage.setItem("username", username);
}

const fetchChat = db.ref("messages/");
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${username === messages.username ? "sent" : "receive"}><span class="username">${messages.username}</span><p>${messages.message}</p></li>`;
  document.getElementById("messages").innerHTML += message;
  scrollToBottom();
});

document.getElementById("message-btn").addEventListener("click", sendMessage);

function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  if (message !== "") {
    const timestamp = Date.now();
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });

    messageInput.value = "";
    messageInput.focus();
  }
}

function scrollToBottom() {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
