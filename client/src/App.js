import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-emmet";
import "ace-builds/src-noconflict/ext-elastic_tabstops_lite";
import "ace-builds/src-noconflict/snippets/python";
import code from './code.png';


// Connect to the Socket.IO server
const socket = io.connect("https://codeliveserver.vercel.app/");

const App = () => {
  // State variables
  const [message, setMessage] = useState(""); // Code editor content
  const [inputData, setInputData] = useState(""); // Input data for the code
  const [roomId, setRoomId] = useState(''); // Room ID
  const [password, setPassword] = useState(''); // Room password
  const [showPopup, setShowPopup] = useState(true); // Show/hide room join popup
  const [output, setOutput] = useState(""); // Output from running the code
  const [randomElement, setRandomElement] = useState(''); // Random coding phrase

  // useEffect hook for handling incoming messages from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessage(data.newMessage);
    });
    return () => {
      // Clean up the event listener
    }
  }, []);

  // Handler for code editor content change
  const handleMessageChange = (event) => {
    const randomIndex = Math.floor(Math.random() * codingPhrases.length);
    setRandomElement(codingPhrases[randomIndex]);
    const newMessage = event;
    setMessage(newMessage);

    // Send message to the server
    console.log("Sendig Message")
    socket.emit("send_message", { newMessage, roomId });
  }

  // Handler for input data change
  const handleInputChange = (event) => {
    setInputData(event.target.value);
  }

  // Handler for running the code
  const runCode = async (e) => {
    e.preventDefault();
    try {
      console.log("Before runcode")
      // Send Python code and input data to the backend
      const response = await axios.post('https://codeliveserver.vercel.app/runcode', { message, inputData });
      console.log("After runcode")
      setInputData('');
      setOutput(response.data.output);
    } catch (error) {
      console.error("Error running code:", error);
    }
  };

  // Handler for logging out
  const logOut = async () => {
    socket.emit("leave_room", roomId);
    setRoomId('');
    setPassword('');
    setMessage('');
    setShowPopup(true);
    setOutput('');
    setInputData('');
  }

  // Handler for submitting room ID and password
  const handleSubmit = async () => {
    if (roomId && password) {
      try {
        const response = await axios.post('https://codeliveserver.vercel.app/join-room', { roomId, password });
        if (response.data.message === 'Invalid password.') {
          alert("Invalid password.");
          setPassword('');
        } else if (response.data.message === "Internal server error.") {
          alert("Unable to join.");
          setPassword('');
          setRoomId('');
        } else {
          socket.emit("join_room", roomId);
          socket.on("code_history", (data) => {
            setMessage(data);
          });
          setShowPopup(false);
          const randomIndex = Math.floor(Math.random() * codingPhrases.length);
          setRandomElement(codingPhrases[randomIndex]);
        }
      } catch (error) {
        console.error("Error joining room:", error);
      }
    } else {
      alert("Enter the RoomID and Password");
    }
  };

  // Handler for terminal
  const textAreaChangeHandeler = ()=>{
  }

  // List of coding phrases
  const codingPhrases = [
    "You need caffine",
    "Code like the wind.",
    "Debugging is my superpower.",
    "Eat, sleep, code, repeat.",
    "Ctrl, Alt, Defeat bugs.",
    "Pixels whisper secrets silently.",
    "Hack the matrix daily.",
    "Infinite loops, endless possibilities.",
    "Syntax errors, endless frustration.",
    "Programmers make the world.",
    "Algorithms dance, data sings.",
    "Coffee: programmer's best friend.",
    "Binary beats, code speaks.",
    "Function calls, mind expands.",
    "Code: where dreams compile.",
    "Software: art in motion.",
    "Code your way forward.",
    "Errors teach, code learns.",
    "Algorithms drive, creativity thrives.",
    "Code fuels innovation's fire.",
    "Pixels paint digital landscapes.",
    "Logic orchestrates digital symphonies.",
    "Programs unlock digital realms.",
    "Bugs squashed, code conquers.",
    "Bytes create worlds anew.",
    "Code: language of creation.",
    "Technology: where magic happens.",
    "Debugging: unraveling mysteries daily.",
    "Variables hold stories untold.",
    "Code: the poetry of logic.",
    "Debugging: the art of deduction.",
    "Coding: where bugs reside.",
    "Syntax errors, we meet again.",
    "Code: the language of logic.",
    "Programming: a digital journey.",
    "Debugging: the hunt begins.",
    "Coding is my cardio.",
    "Keep calm and code on.",
    "Programmers: the modern wizards.",
    "In the code we trust.",
    "To infinity and beyond, code!",
    "Code, coffee, and conquer.",
    "May the code be with you.",
    "Code today, debug tomorrow.",
    "Coding is the new black.",
    "In code we find truth.",
    "Code monkeys unite!",
    "Code like a boss.",
    "Coding: the art of problem-solving.",
    "Life is short, code more.",
    "Function calls, coffee breaks.",
    "Code, rinse, repeat.",
    "Syntax: the language of machines.",
    "Coding: the puzzle of logic.",
    "Life's better with brackets.",
    "Programmers: solving the world's problems, one line at a time.",
    "When in doubt, console.log().",
    "The answer is 42... in code.",
    "Keep coding and carry on.",
    "May your code compile swiftly.",
    "Code is poetry in motion.",
    "To code or not to code, that is the question.",
    "Unleash the code beast.",
    "Code jungle exploration.",
    "Dive into the coding wilderness.",
    "Roar with coding power.",
    "Let your code run wild.",
    "Tame the coding frontier.",
    "Code chaos, organized brilliance.",
    "Blaze trails with code.",
    "Coding adventures await.",
    "Explore the code galaxy.",
    "Code: the untamed frontier.",
    "Code safari, bugs beware.",
    "Hack through the coding underbrush.",
    "Code like a wild storm.",
    "Embrace the coding wilderness.",
    "Ctrl, Alt, Delightful coding.",
    "Laughter is the best debugger.",
    "Code with a wink.",
    "Debugging: finding needles in haystacks.",
    "Code-nami: a wave of coding brilliance.",
    "Code: where the magic(mushroom) happens.",
    "Emojis are comments in disguise.",
    "Life's too short to debug.",
    "Don't feed the code monkeys.",
    "Programming: turning coffee into code.",
    "Code: it's not just for breakfast anymore.",
    "Syntax errors: the struggle is real.",
    "Code therapy: debugging your soul.",
    "Code like nobody's watching.",
    "Error 404: wit not found.",
    "Dream big, code bigger.",
    "Code your way to the stars.",
    "Every bug fixed is a step forward.",
    "Code with passion, create with purpose.",
    "Persistence unlocks coding greatness.",
    "Success is just one line of code away.",
    "Embrace the challenge, conquer the code.",
    "Code: where dreams take shape.",
    "Program your future, one line at a time.",
    "Coding: turning dreams into reality.",
    "Failure is just a bug waiting to be fixed.",
    "Believe in your code, believe in yourself.",
    "Keep coding, keep growing.",
    "Code today for a better tomorrow.",
    "With determination, anything is executable.",
    "Code lovers: we don't byte, we kiss.",
    "Version control: because every line needs a backup.",
    "API: Allowing Programmers In.",
    "HTML: Hugging the Markup Language.",
    "NoSQL: Not Only SQL, but also No Stress, Quality Life.",
    "Git: the tool that keeps on giving.",
    "CSS: Code Style Supreme.",
    "Java Script: turning coffee into code since 1995.",
    "404: Area not found, keep coding.",
    "Kernel: the heart of code.",
    "If at first, you don't succeed, compile, compile again.",
    "Debugging: the art of making bugs bite the dust.",
    "Comments: where code whispers its secrets.",
    "Object-oriented: where code gets personal.",
    "Programmers: turning caffeine into code.",
    "May the code be with you.",
    "You had me at 'Hello, World!'",
    "Programmers: the true wizards of the digital age.",
    "Code or code not, there is no try.",
    "The force is strong in this code.",
    "I speak fluent JavaScript.",
    "Always code in motion.",
    "Life is better with Python.",
    "Code: the language of the future, present, and past.",
    "Nerd by day, coder by night.",
    "Keep calm and code on.",
    "In code we trust.",
    "You don't need luck when you've got code.",
    "Reality is merely an illusion, but code is real.",
    "Coding: the ultimate brain exercise.",
    "Created By - Jay Pokharna"
  ];

  return (
    <>
      {/* Popup for joining/creating room */}
      {showPopup && (
        <div className='popupmain absolute z-[99] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-full h-full flex items-center justify-center bg-opacity-90 bg-black'>
          <div className="popup w-fit bg-white p-8 rounded-xl shadow-lg">
            <div className="popup-inner flex flex-col items-center ">
              <div className='flex mb-2'>
                <img src={code} alt="" width='30px' />
                <h2 className='text-2xl font-mono selection:text-blue-800'>CodeLive</h2>
              </div>
              <input
                type="text"
                placeholder="Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className='my-1 p-2 rounded-md outline-none bg-[rgb(20,20,20)] shadow-xl text-white font-mono'
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='my-1 p-2 rounded-md outline-none bg-[rgb(20,20,20)] shadow-xl text-white font-mono'
              />
              <button onClick={handleSubmit} className='bg-[rgb(20,20,20)] font-mono text-white p-2 rounded-md cursor-pointer'>Join/Create Room</button>
            </div>
          </div>
        </div>
      )}

      {/* Main section */}
      <div className='w-[100vw] h-[100%] bg-zinc-400 p-3' id='main'>
        {/* Navigation */}
        <div className="nav bg-[rgb(20,20,20)] w-full h-[8%] rounded-md flex justify-between px-2 py-1 items-center text-zinc-200/80">
          <div className="logo flex w-fit h-fit">
            <img src={code} alt="" width='30px' className='mr-2' />
            <h2 className='text-2xl font-mono'>CodeLive</h2>
          </div>
          <div className='has-tooltip flex items-center justify-center font-mono'>
            <span className='tooltip rounded shadow-lg p-1 bg-[rgb(20,20,20)] flex gap-3'><h2>ID - {roomId}</h2><h2>Pass - {password}</h2></span>
            Room Details
          </div>
          <div className="right">
            <button className='text-lg font-mono bg-green-500 px-4 py-[2px] m-[6px] rounded-md cursor-pointer shadow-xl text-zinc-800' onClick={runCode}>Run</button>
            <button className='text-lg font-mono bg-red-500 px-4 py-[2px] m-[6px] rounded-md cursor-pointer shadow-xl text-zinc-800' onClick={logOut}>Log Out</button>
          </div>
        </div>

        {/* Code editor */}
        <div className="codearea flex">
          <AceEditor
            mode="python"
            theme="twilight"
            onChange={handleMessageChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            width='100%'
            fontSize={20}
            placeholder={randomElement}
            className='my-2 rounded-md font-mono'
            value={message}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
          />
        </div>

        {/* Bottom section */}
        <div className="bottom flex">
          {/* Input area */}
          <textarea
            value={inputData}
            onChange={handleInputChange}
            placeholder="Input - Command Line Arguments Only"
            className="w-[40%] p-2 mr-2 rounded-md bg-[rgb(20,20,20)] resize-none font-mono outline-none selection:text-blue-600 text-zinc-200/90"
          />

          {/* Terminal output */}
          <div className="terminal relative w-full">
            <h5 className='absolute  top-0 w-full pl-2 py-1 rounded-md bg-[rgba(25,25,25,0.5)] text-zinc-200/90'>Terminal</h5>
            <textarea name="op-win" id="op-win" cols="30" rows="10" value={output} onChange={textAreaChangeHandeler} className='font-mono rounded-md w-full bg-[rgb(20,20,20)] pt-10 px-3 text-white h-full resize-none caret-transparent outline-none'></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
