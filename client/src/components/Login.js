import React, { useContext } from "react";
import styles from "./login.module.css";
import { ChatContext } from "../context/ChatContext";

export const Login = () => {
  const {
    activeButton,
    room,
    showRoom,
    username,

    handleGlobal,
    handleRoom,
    joinChat,
    setRoom,
    setUsername,
  } = useContext(ChatContext);

  return (
    <div className={styles.login_container}>
      <input
        type="text"
        placeholder="Enter your name"
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
          placeholder="room ID"
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
        Enter room
      </button>
    </div>
  );
};
