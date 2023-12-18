import React,{useState} from "react";


// Examples for chat initiation
  const examples = [
    "How to use tailwind CSS",
    "How to use tailwind CSS with React",
    "How to use tailwind CSS with Next",
    "How to use tailwind CSS with Gatsby",
    "How to use tailwind CSS with Vue",
    "How to use tailwind CSS with Angular"
  ];

const Chat = () => {
  const [chat , setChat] = useState([]);
  const [input, setInput] = useState('');

const handleSend = async () => {
  if(input.trim()){

    setChat([...chat], {role:'user', content: input})
    setInput("");

    const response = await fetch('http://localhost:8000/api/chat',{

    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: [
        ...chat,
        {role:"user", content: input}
      ]
    })
    });
    const resdata = await response.json();
    console.log(resdata);
    setChat([...chat, {role:"assistant", content:resdata.choices[0].message}]);

  }
};
  
  return (
    <div className="h-screen w-screen bg-[#050509] text-white flex ">
      {/* Left panel with chat history list */}
      <div className="w-[20%] h-screen bg-[#0c0c15] p-4 ">
        <div>
          {/* Button to initiate a new chat */}
          <button className="w-full h-[50px]  text-white border rounded hover:bg-slate-600">
            + New Chat
          </button>
        </div>
        <div className="h-[75%]  overflow-scroll  hide-scrollbar shadow-lg ">
          {/* List of chat history items */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
            <div key={index} className="py-3  text-center rounded   mt-4 text-lg font-light flex  item-center px-8 hover:bg-slate-600 cursor-pointer">
              <span className="mr-4">
                {/* Icon indicating chat history */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-message-dots"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                  <path d="M12 11l0 .01" />
                  <path d="M8 11l0 .01" />
                  <path d="M16 11l0 .01" />
                </svg>
              </span>
              My chat history
            </div>
          ))}
        </div>
        <div></div>
      </div>

      {/* Right panel with the main chat area */}
      <div className="w-[80%] h-screen bg-[#050509] ">
        {/* Conditional rendering based on chat availability */}
        {chat.length > 0 ? (
          // Render existing chat history
          <div className="h-[80%] overflow-scroll hide-scrollbar pt-8 ">
            {chat.map((item, index) => (
              <div key={index} className={`w-[60%]  mx-auto p-6 flex  ${item.role === "assistant" && 'bg-slate-900 rounded'}`}>
                <span className="mr-8 p-2 bg-slate-800 rounded-full h-full">
                  {/* User or Assistant icon based on the role */}
                  {item.role === "user" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-robot" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M6 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                      <path d="M12 2v2" />
                      <path d="M9 12v9" />
                      <path d="M15 12v9" />
                      <path d="M5 16l4 -2" />
                      <path d="M15 14l4 2" />
                      <path d="M9 18h6" />
                      <path d="M10 8v.01" />
                      <path d="M14 8v.01" />
                    </svg>
                  )}
                </span>
                {/* Displaying the chat message */}
                <div className="leading-loose">{item.message}</div>
              </div>
            ))}
          </div>
        ) : (
          // Render initial message if no chat history
          <div className="h-[80%]  flex  justify-center  items-center flex-col">
            <div className="text-4xl font-bold mb-8">Chat-GPT-3.5</div>
            <div className="flex flex-wrap justify-around max-w-[900px]">
              {/* Displaying example messages for user interaction */}
              {examples.map((item, index) => (
                <div key={index} className="text-lg font-light mt-4 p-3 border rounded cursor-pointer min-w-[400px] hover:bg-slate-800 " onClick={() => setInput(item)}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input area for typing messages */}
        <div className="h-[20%] ">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-[60%] mt-[5%] flex justify-center relative">
              <input type="text" onChange={(e)=> setInput(e.target.value)} value={input} className="w-full h-[50px] bg-slate-900  border rounded-lg p-4 pr-16 " placeholder="Type your Message here...  " />
              <span className="absolute right-4 top-4 cursor-pointer " onClick={()=> input.trim()? handleSend(): undefined}>
                {/* Send button icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-send"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 14l11 -11" />
                  <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                </svg>
              </span>
            </div>

            {/* Informational message below the input area */}
            <small className="mt-2 text-slate-500">ChatGPT can make mistakes. Consider checking important information.</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
