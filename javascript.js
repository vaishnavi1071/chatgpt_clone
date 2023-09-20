const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container")
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");


let userText = null;

const API_KEY="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";

const loadFromLocalstorage=()=>{
    const themeColor= localStorage.getItem("theme-color");

    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerHTML = document.body.classList.contains("light-mode")
    ? "dark_mode" : "light_mode"

    const defaultText = `<div class = "default-text>
                        <h1>ChatGPT Clone<>h1
                        <p>Start a conversation and explore the power of AI.<br>
                        Your chat will be displayed here.
                        </div>`
                        defaultText;

    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}


loadFromLocalstorage();


const createElement = (html, className)=>{
     //creating new div 
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML=html;
    return chatDiv; // return created div
}




const getChatResponse= async ()=>{
    const API_URL =  "https://api.openai.com/v1/chat/completions";
    
// Define the properties and data for the API key
    const requestOptions = {
        method: "POST",
        headers:{
        "Content-Type": "application/josn",
        Authorization : 'Bearer' + API_KEY
       
        },

        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userText }],


  
   
    })
       }

       try{
        const response = await(await fetch(API_URL, requestOptions)).json();
        console.log(response);

       }catch(error){
        console.log(error);
       }
       incomingChatDiv.querySelector(".typing-animation").remove();
       incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
       localStorage.setItem("all-chats", chatContainer.innerHTML);
       chatContainer.scrollTo(0,chatContainer.scrollHeight);
}


const showTypingAnimation = () => {

 const html = ` <div class="chat-content">
<div class="chat-details">
    <img src="C:\chatgpt clone\images\chatgpt-icon.png" alt="user">
    <div class="typing-animation">
        <div class="typing-dot" style="--delay:0.2s"></div>
        <div class="typing-dot" style="--delay:0.3s"></div>
        <div class="typing-dot" style="--delay:0.4s"></div>
    </div>
</div>
<span class="fa-regular fa-copy"></span>
</div>`;
const incomingChatDiv = createElement(html, "incoming");
chatContainer.appendChild(incomingChatDiv);
chatContainer.scrollTo(0,chatContainer.scrollHeight);
getChatResponse(incomingChatDiv);


}


// console.log(sendButton)
const handleOutgoingChat =()=>{
   
    userText=chatInput.value.trim();
    const html =`<div class="chat-content">
    <div class="chat-details">
        <img src="C:\chatgpt clone\images\ser.jpg" alt="user">
    <p>${userText}</p>
    </div>
    </div>`;
    
    //create an outgoing chat div with user's message and append it to chat 
    // container
    const outgoingChatDiv = createElement(html, "outgoing");

    chatContainer.appendChild(outgoingChatDiv)
    chatContainer.scrollTo(0,chatContainer.scrollHeight);
    setTimeout(showTypingAnimation, 500);
    }

    themeButton.addEventListener("click", ()=>{
        document.body.classList.toggle("light-mode");
        localStorage.setItem("theme-color", themeButton.innerText);
        themeButton.innerHTML = document.body.classList.contains("light-mode")
        // ? "dark_mode" : "light_mode"
    })
    // working on delete chats
    deleteButton.addEventListener("click",  ()=>{
        // remove chat from localstorage call laodDataLocalstorage function
        if(confirm("Are you sure you want to delete all the chats?")){
            loadFromLocalstorage();
        }
    })


sendButton.addEventListener("click" ,handleOutgoingChat);