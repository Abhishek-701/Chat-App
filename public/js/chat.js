const socket = io();

const $messageForm = document.querySelector("#message-form")
const $messageInput = $messageForm.querySelector('input')
const $messageInputBtn = $messageForm.querySelector('button')
const $locationBtn = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

//Option
const {username , room} = Qs.parse(location.search , { ignoreQueryPrefix : true  })

socket.on("message", (msg) => {
    console.log(msg);
    const html = Mustache.render(messageTemplate, {
        message: msg.text,
        createdAt : moment(msg.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML("beforeend",html)
  });

  socket.on('locationMessage',(url) => {
    console.log(url);
    const html = Mustache.render(locationTemplate, {
      url : url.location,
      urlCreatedAt : moment(url.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
  })
  


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

    console.log("Message Delivered");
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

socket.emit('join', { username , room }, (error) => {
  if(error) {
    alert(error)
    location.href = '/'
  }
})
