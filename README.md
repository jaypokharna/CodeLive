![CodeLive](https://socialify.git.ci/jaypokharna/CodeLive/image?description=1&descriptionEditable=Real-tine%20colaborative%20coding%20platform.&language=1&name=1&owner=1&pattern=Circuit%20Board&theme=Dark)

<p align="center"> · <a href="https://code-live-lime.vercel.app/">View Demo</a> · </p>

## Description 📊
**CodeLive** - A Realtime Collaborative Coding Platform is a web application that allows users to collaboratively write and execute Python code in real-time. Users can create personal rooms with unique room IDs and passwords, join existing rooms, and collaborate with others on coding projects.


## Technologies Used 🛠️
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** React.js, Axios
- **Realtime Communication:** Socket.IO
- **Code Editor:** Ace Editor, React-Ace, Ace-Build

## Usage 🚀
1. Clone the repository: 
```bash
git clone https://github.com/jaypokharna/CodeLive.git
cd CodeLive
```

2. Install dependencies for the server 
```bash
cd server
npm insatll
```

3. Install dependencies for the server 
```bash
cd server
npm insatll
```

4. Set up environment variables in ```.env``` file

4. Start the server
```bash
 nodemon index.js
``` 
5. Start the client
```bash
 npm start
``` 
6. Access the application at http://localhost:3000 in your web browser.

## Features 🌟
- **Realtime Collaboration:** Multiple users can edit code in the same room simultaneously, with changes being reflected in real-time for all users.
- **Room Creation and Joining:** Users can create personal rooms with unique room IDs and passwords, as well as join existing rooms by providing the correct credentials.
- **Persistent Code Storage:** Code changes are stored in MongoDB in real-time, ensuring that no changes are lost even if the application is closed accidentally.
- **Dynamic Coding Phrases:** A fun coding-related phrase is displayed in the code editor each time the application is loaded, with a 1 in 1000 chance of getting the same phrase again.
- **Hidden Room Details:** Room details such as the room ID and password are hidden by default and can be revealed by hovering over a tooltip.
- **Input Data Provision:** Users can provide command-line arguments as input data to their Python code. Realtime/runtime input provision will be added soon.
- **Theme Switching:** Users will soon be able to switch between light mode and dark mode themes.
- **Language Support:** Support for Java, C, and C++ will be added in future updates.


## Contribution 🤝
Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or create a pull request.