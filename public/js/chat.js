const socket = io();

const $messageForm = document.querySelector("#message-form")
const $messageInput = $messageForm.querySelector('input')
const $messageInputBtn = $messageForm.querySelector('button')
const $locationBtn = document.querySelector('#send-location')

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
    $messageInputBtn.setAttribute('disabled', 'disabled')

  const message = e.target.elements.message.value; //Using the input tag name from the form  // Code less likely to break during change in html elements

  $messageInputBtn.removeAttribute('disabled')
  $messageInput.value = ''
  $messageInput.focus()

  socket.emit("sendMessage", message, (error) => {
    if (error) {
      return console.log(error);
    }

    console.log("Delivered");
  });
});

document.querySelector("#send-location").addEventListener("click", (e) => {
    e.preventDefault()

    $locationBtn.setAttribute('disabled','disabled')

  if (!navigator.geolocation) {
    return alert("Browser does not support geolocation ");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);

    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        console.log("Location delivered");
        $locationBtn.removeAttribute('disabled')
      }
    );
  });
});

socket.on("message", (msg) => {
  console.log(msg);
});
