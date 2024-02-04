// Import required modules
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const bodyParser = require('body-parser'); // Import body-parser
const { exec } = require('child_process'); // Import child_process module for executing Python code
const fs = require('fs'); // Import the file system module
const roomModel = require('./Model/room');

// Create express app
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
  origin: "https://code-live-plum.vercel.app", // restrict calls to those this address
  methods: ["POST","GET"] // only allow GET requests
}));

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Create HTTP server using express app
const server = http.createServer(app);

app.use(bodyParser.json()); // Parse JSON request bodies

// Create Socket.IO server and configure CORS options
const io = new Server(server, {
  cors: {
    origin: ["https://code-live-plum.vercel.app"],
    methods: ["GET", "POST"]
  },
});

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log(`user connected - ${socket.id}`);

  // Join a room
  socket.on('join_room', async (data) => {
    console.log('User Connected'+{data})
    socket.join(data);
    const room = await roomModel.findOne({ roomId: data });
    socket.emit("code_history ", room.code);
  });

  // Leave a room
  socket.on('leave_room', (data) => {
    socket.leave(data);
  });

  // Send message to all clients except sender
  socket.on("send_message", async (data) => {
    console.log("Message Received "+{data})
    const room = data.roomId;
    const code = await roomModel.findOneAndUpdate({ roomId: room }, { code: data.newMessage });
    socket.to(data.roomId).emit("receive_message", data);
  });
});

// Handle joining a room
app.post('/join-room', async (req, res) => {
  const { roomId, password } = req.body;
  console.log("Inside join room route")
  try {
    // Check if the room exists in the database
    const existingRoom = await roomModel.findOne({ roomId: roomId });
    if (existingRoom) {
      console.log("Existing User Found")
      // Room exists, check password
      if (existingRoom.password === password) {
        // Password is correct, user can join the room
        res.json({ message: 'Successfully joined the room.' });
      } else {
        // Password is incorrect
        res.json({ message: 'Invalid password.' });
      }
    } else {
      // Room does not exist, create a new room
      console.log("No exiting user , new user")
      const newRoom = new roomModel({ roomId, password });
      await newRoom.save();
      res.json({ message: 'New room created.' });
    }
  } catch (error) {
    console.log('Error joining room:', error);
    res.json({ message: 'Internal server error.' });
  }
});

// Handle running Python code
app.post('/runcode', (req, res) => {
  // Extract Python code and input data from the request body
  console.log("inside run code")
  const { message, inputData } = req.body;

  // Write the Python code into a temporary file named 'main.py'
  fs.writeFileSync('main.py', message);

  // Execute the Python code by running the 'main.py' file with input data as arguments
  exec(`python3 main.py ${inputData}`, (error, stdout, stderr) => {
    if (error) {
      if (error.message.includes("/bin/sh: line 1:")) {
        res.json({ output: "Error - Unable to run! Check your code..." });
      } else {
        res.json({ output: error.message });
      }
    } else if (stderr) {
      res.json({ output: stderr });
    } else {
      res.json({ output: stdout });
    }
  });
});

app.get("/", (req, res) => {
  res.json("CodeLive Sever");
})

// Start the HTTP server
server.listen(5000, () => {
  console.log("Server running on port 5000");
});
