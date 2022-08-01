const socket = io()     // io comes from client lib
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {           //The keyup event is triggered last                                                      when user releases a key.
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''                //after msgng textarea will blank
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>                        
        <p>${msg.message}</p>
    `                                        //uername
                                               //message
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages from server 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})
                                     //automatically scrolls to bottom when msg are delivered
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



