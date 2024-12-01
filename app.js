const { log } = require("console")
const express = require("express")
const app = express()
const path = require("path")


const port = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, "public")))
const server = app.listen(port, () => console.log(`server running on ${port}`)
)
const io = require("socket.io")(server)
let socketConnected = new Set()

io.on("connection", onConnected)

function onConnected(socket) {
    console.log("connected socket", socket.id);

    socketConnected.add(socket.id)
    io.emit("clients-total", socketConnected.size)

    socket.on("disconnect", () => {
        console.log("socket disconnected", socket.id);
        socketConnected.delete(socket.id)
        io.emit("clients-total", socketConnected.size)

    })
    socket.on("message",(data)=>{
        console.log(data);
        
        socket.broadcast.emit("chat-message",data)
    })
    

}

