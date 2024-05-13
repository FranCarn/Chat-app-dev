import React, { useContext } from "react";
import styles from "../App.module.css";
import { Dropdown } from "./Dropdown";
import { ChatContent } from "./ChatContent";
import { ChatForm } from "./ChatForm";
import { ChatNavbar } from "./ChatNavbar";
import { ChatContext } from "../context/ChatContext";

export const Chat = () => {
  const { room } = useContext(ChatContext);

  return (
    <>
      <ChatNavbar />
      <div className={styles.chat_container}>
        <div className={styles.header_container}>
          <div>{room === "" ? "Global room" : `Room: ${room}`}</div>
          <Dropdown />
        </div>
        <hr />
        <div style={{ marginBottom: "10px" }}>
          {`${
            !room
              ? "You successfully entered the global room"
              : `You entered to the room: ${room}`
          }`}
        </div>
        <ChatContent />
      </div>
      <ChatForm />
    </>
  );
};
