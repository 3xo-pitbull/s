// Check if username is already saved in local storage
let savedUsername = localStorage.getItem("username");

// If username is not saved, prompt the user to enter it
if (!savedUsername) {
  savedUsername = prompt("Please Tell Us Your Name");
  // Save the username to local storage for future visits
  localStorage.setItem("username", savedUsername);
}

// Use the saved username
const username = savedUsername;

// Your web app's Firebase configuration
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault(); // <-- منع السلوك الافتراضي للنموذج

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
