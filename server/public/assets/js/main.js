const joinBtnRoom1Elem = document.getElementById("joinBtnRoom1");
const joinBtnRoom2Elem = document.getElementById("joinBtnRoom2");
const room1InputWrapperElem = document.getElementById("inputWrapperRoom1");
const room2InputWrapperElem = document.getElementById("inputWrapperRoom2");
const inputMessageRoom1Elem = document.getElementById("messageRoom1");
const inputMessageRoom2Elem = document.getElementById("messageRoom2");
const messagesWrapperRoom1Elem = document.getElementById("messagesWrapperRoom1");
const messagesWrapperRoom2Elem = document.getElementById("messagesWrapperRoom2");
const sendBtnRoom1 = document.getElementById("sendBtnRoom1");
const sendBtnRoom2 = document.getElementById("sendBtnRoom2");

// const socket = io('ws://192.168.65.156:80')
const socket = io()

joinBtnRoom1Elem.addEventListener("click", function () {
    socket.emit("joinRoom", "room1")
    room1InputWrapperElem.removeAttribute("hidden")
    messagesWrapperRoom1Elem.removeAttribute("hidden")
    this.remove()
})

joinBtnRoom2Elem.addEventListener("click", function () {
    socket.emit("joinRoom", "room2")
    room2InputWrapperElem.removeAttribute("hidden")
    messagesWrapperRoom2Elem.removeAttribute("hidden")
    this.remove()
})

sendBtnRoom1.addEventListener("click", () => {
    let message = inputMessageRoom1Elem.value;
    socket.emit("sendMessage", "room1", message)
    inputMessageRoom1Elem.value = ""
})

sendBtnRoom2.addEventListener("click", function () {
    let message = inputMessageRoom2Elem.value;
    socket.emit("sendMessage", "room2", message)
    inputMessageRoom2Elem.value = ""
})



socket.on("receiveMessage", (data) => {
    // console.log(data)
    playSound();

    if (data.room == "room1") {
        messagesWrapperRoom1Elem.appendChild(createMessageElem(data.message))
        messagesWrapperRoom1Elem.scrollTop = messagesWrapperRoom1Elem.scrollHeight;
    } else {
        messagesWrapperRoom2Elem.appendChild(createMessageElem(data.message))
        messagesWrapperRoom2Elem.scrollTop = messagesWrapperRoom2Elem.scrollHeight;
    }

});



function createMessageElem(message) {
    const div = document.createElement("div")
    div.classList.add("my-3", "px-6", "py-2", "rounded-md", "w-fit", "bg-white", "shadow-lg")

    const p = document.createElement("p")

    p.innerText = message;

    div.appendChild(p)

    return div;
}

function playSound() {
    const sound = new Audio('assets/sound/alert.wav');
    sound.play();
}