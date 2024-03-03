import { useState } from "react";
import styles from "../App.module.css";
import io from "socket.io-client";
import { Login, Chat } from "../components";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  return (
    <div>
      <div className={styles.title}>
        <span>ꞏ Neon chat ꞏ</span>
        <hr />
        {!showChat ? (
          <Login
            socket={socket}
            username={username}
            room={room}
            setShowChat={setShowChat}
            setRoom={setRoom}
            setUsername={setUsername}
          />
        ) : (
          <Chat
            socket={socket}
            username={username}
            room={room}
            setShowChat={setShowChat}
            setRoom={setRoom}
            setUsername={setUsername}
          />
        )}
      </div>
    </div>
  );
}

export default App;
