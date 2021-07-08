const express = require('express');
const app= express();
const path = require('path');
const PORT=process.env.PORT||3000;;
const http= require("http").createServer(app);


app.use( express.static( __dirname + '/src') );

app.get('/', (req,res,next) => {
    return res.status(200).sendFile(path.join(__dirname,"index.html"));
})



const io= require("socket.io")(http);

io.on("connection",(socket) => {

    console.log('socket connected................')
    socket.on("my-msg",(msg) =>{
         socket.broadcast.emit('my-msg',msg);
         
    })
})



http.listen(PORT,()=>console.log(`servver listen: ${PORT}`));