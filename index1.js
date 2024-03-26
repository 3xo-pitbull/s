// app.js

var firebaseConfig = {
  apiKey: "AIzaSyAk10om5JSh_XuoDarFVvLUVe3fsYGTob4",
  authDomain: "comi-9f1ca.firebaseapp.com",
  databaseURL: "https://comi-9f1ca-default-rtdb.firebaseio.com",
  projectId: "comi-9f1ca",
  storageBucket: "comi-9f1ca.appspot.com",
  messagingSenderId: "994791550932",
  appId: "1:994791550932:web:c6281127672a6542187041",
  measurementId: "G-0JW69KG9KN"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
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
