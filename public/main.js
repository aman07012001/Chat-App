const socket = io()

dayjs.extend(dayjs_plugin_relativeTime);
const clientsTotal = document.getElementById("client-total")
const messageContainer=document.getElementById("message-container")
const nameInput=document.getElementById("name-input")
const messageInput=document.getElementById("message-input")
const messageForm=document.getElementById("message-form")


function sendMessage(){
    const data={
        name:nameInput.value,
        date:new Date(),
        message:messageInput.value
    }
    socket.emit("message",data)
    addMessageToUi(true,data)
    messageInput.value=''
}

function addMessageToUi(isSend,data){
    console.log("add message to ui",data);
    
    const element=`
    <li class="${isSend?'message-right':'message-left'}">
            <p class="message">
              ${data.message}
              <span>${data.name}● ${dayjs(data.date).fromNow()}</span>
            </p>
          </li> `
          
messageContainer.innerHTML+=element    
messageContainer.body.style.backgroundColor="green"      
      
}

socket.on("clients-total", (data) => {
    clientsTotal.innerText = `Total Clients ${data}`
        

})

socket.on("chat-message",(data)=>{
   addMessageToUi(false,data)
})


messageForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    sendMessage()

})





 