import React, { useState } from "react";
import styles from "../App.module.css";

export const Login = ({
  socket,
  username,
  room,
  setShowChat,
  setUsername,
  setRoom,
}) => {
  const [showRoom, setShowRoom] = useState(false);
  const [activeButton, setActiveButton] = useState({
    global: true,
    room: false,
  });

  const joinChat = (roomId) => {
    if (!username || roomId === "1") return;
    const data = {
      room: roomId ? roomId : 1,
      global: roomId ? false : true,
    };
    socket.emit("join", data);
    setShowChat(true);
  };

  const handleGlobal = () => {
    if (activeButton.global) return;
    setActiveButton({ global: true, room: false });
    setShowRoom(false);
  };

  const handleRoom = () => {
    if (!activeButton.global) return;
    setActiveButton({ global: false, room: true });
    setShowRoom(true);
  };

  return (
    <div className={styles.login__container}>
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
          onClick={handleGlobal}
          className={
            activeButton.global ? styles.active : styles.selectRoomButtons
          }
        >
          Global
        </button>
        <button
          onClick={handleRoom}
          className={
            activeButton.room ? styles.active : styles.selectRoomButtons
          }
        >
          Room
        </button>
      </div>
      <button className={styles.joinChat} onClick={() => joinChat(room)}>
        Ingresar a la sala
      </button>
    </div>
  );
};
