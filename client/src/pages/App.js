import { useState } from "react";
import styles from "../App.module.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showRoom, setShowRoom] = useState(false);

  const joinChat = (roomId) => {
    if (!username || roomId === "1") return;
    const data = {
      room: roomId ? roomId : 1,
      global: roomId ? false : true,
    };
    socket.emit("join", data);
    setShowChat(true);
  };

  return (
    <>
      {!showChat ? (
        <div className={styles.login__container}>
          <div>Live chat</div>
          <input
            type="text"
            placeholder="Ingrese su nombre"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              joinChat(room);
            }}
            required
            autoFocus
          />

          {showRoom ? (
            <input
              type="text"
              maxLength={4}
              placeholder="ID de la sala"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              value={room}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                joinChat(room);
              }}
            />
          ) : null}

          <div className={styles.toggleButtons}>
            <button
              onClick={() => setShowRoom(false)}
              className={styles.selectRoomButtons}
            >
              Global
            </button>
            <button
              onClick={() => setShowRoom(true)}
              className={styles.selectRoomButtons}
            >
              Room
            </button>
          </div>
          <button className={styles.joinChat} onClick={() => joinChat(room)}>
            Ingresar a la sala
          </button>
        </div>
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
    </>
  );
}

export default App;
