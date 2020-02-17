let socket = io.connect('http://localhost:4000');
// Dom Query
let message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback'),
      activeuser= document.getElementById('activeuser');
      

// Emit events
btn.addEventListener('click', ()=>{
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});

message.addEventListener('keypress',()=>{
    socket.emit('typing',handle.value)
})

//stop typing
message.addEventListener("keyup", () => {
    socket.emit("stopTyping", "");
  });
  socket.on("notifyStopTyping", () => {
    feedback.innerText = "";
  });

// Listen for events
socket.on('chat', (data)=>{
    feedback.innerHTML = " "
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data)=>{
    feedback.innerHTML = '<p><em>' + data +' '+'is typing a message......</em></p>';
});


