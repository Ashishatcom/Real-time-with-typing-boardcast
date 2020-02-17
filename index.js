 var users = [];
 var onlineuser = [];
const express = require('express')
const socket = require('socket.io');
var siofu = require("socketio-file-upload");
const app = express();
const server = app.listen(4000,()=>{
    console.log("Server is Running on 4000");
});
app.use(express.static('public'))
//Socket setup
var io = socket(server)
io.on("connection",(socket)=>{
        users.push(socket)
        console.log("New User Is connected" + ' ' + users.length);
        socket.on('disconnect',()=>{
            users.splice(users.indexOf(socket),1)
            console.log("User Disconnected"+' ' +"Left User"+' '+ users.length)
        });
        socket.on('chat',(data)=>{
            io.sockets.emit('chat',data);
        });

        socket.on('typing',(data)=>{
            socket.broadcast.emit('typing',data);
        });

        //when soemone stops typing
     socket.on("stopTyping", () => {
    socket.broadcast.emit("notifyStopTyping");
             });
             

    });