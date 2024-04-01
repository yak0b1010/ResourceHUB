import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyAXDAfPcqQWPq5qPR3hmZ5Juj_3kEp7I3o");
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}
async function run() {
    var id = Date.now()
    BotMessage("Coding >>> ", true, id)
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = " you are only a code helper try to help me to write codes correct if ask with random words or chars answer -try to give me right prompt - , answer only about asks of programming and wsk for the programming language ";
    let text = '';
    document.getElementById(`${id}`).textContent = " "
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        for (let i = 0; i < chunkText.length; i++) {
            console.log(chunkText[i]);
            text += chunkText[i];
            document.getElementById(`${id}`).innerHTML += chunkText[i]
            await new Promise(resolve => setTimeout(resolve, 1));
            document.querySelector(".convo").scrollTo(0, document.querySelector(".convo").scrollHeight);
        }
    }
    document.querySelector("#prompt").classList.remove('disabled')
}
function BotMessage(text, condition, id){
    if (condition == true){
        var message = `<div class="BotMessage">
            
            <p id="${id}">${text}</p>
        </div>`;
    } else {
        var message = `<div class="BotMessage">
            <p>${text}</p>
        </div>`;
    } 
    document.querySelector(".convo").innerHTML += message;
    document.querySelector(".convo").scrollTo(0, document.querySelector(".convo").scrollHeight);
    document.querySelector("#prompt").classList.remove('disabled')
}
function UserMessage(text){
    var message = `<div class="UserMessage">
                    
                    <p>${text}</p>
                </div>`;
    document.querySelector(".convo").innerHTML += message;
    document.querySelector(".convo").scrollTo(0, document.querySelector(".convo").scrollHeight);
}
function UserImage(src){
    var message = `<div class="UserImage">

                    <p><img src="${src}"></p>
                </div>`;
    document.querySelector(".convo").innerHTML += message;
    document.querySelector(".convo").scrollTo(0, document.querySelector(".convo").scrollHeight);
}
function reply(){
    UserMessage(document.querySelector("#prompt").value)
    Gemini(document.querySelector("#prompt").value)
    document.querySelector("#prompt").value = ""
    document.querySelector("#prompt").classList.add('disabled')
    document.querySelector("#prompt").disabled = true
    if(!document.querySelector(".mainChat")){}else{
        document.querySelector(".mainChat").remove()}
    }
async function Gemini(prompt) {
    var id = Date.now()
    BotMessage("Source HUB Writing ...", true, id)
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const chat = model.startChat({
    generationConfig: {
      maxOutputTokens: 50,
    },
  });
    const msg = prompt + " you are only a code helper try to help me to write codes correct if ask with random words or chars answer with -try to give me right prompt -, answer only about asks of programming and wsk for the programming language ";
    const result = await model.generateContentStream([msg], {
        wordPerWord: true,
    });
    let text = '';
    document.getElementById(`${id}`).textContent = " "
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        for (let i = 0; i < chunkText.length; i++) {
            text += chunkText[i];
            document.getElementById(`${id}`).innerHTML += chunkText[i]
            await new Promise(resolve => setTimeout(resolve, 20));
            document.querySelector(".convo").scrollTo(0, document.querySelector(".convo").scrollHeight);
        }
    }
    document.querySelector("#prompt").classList.remove('disabled')
    document.querySelector("#prompt").disabled = false
}
document.querySelector("#sendPrompt").onclick = function(){
    reply()
}
document.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' || event.keyCode === 13) {
    reply();
  }
});