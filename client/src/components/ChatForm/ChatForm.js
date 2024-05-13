import React, { useContext } from "react";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import styles from "./chatForm.module.css";
import { ChatContext } from "../../context/ChatContext";

export const ChatForm = () => {
  const { setMessage, sendMessage, message } = useContext(ChatContext);
  return (
    <div>
      <div className={styles.send_message_container}>
        <input
          type="text"
          placeholder="Write a message..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            e.key === "Enter" && sendMessage();
          }}
          value={message}
        />
        <SubmitButton sendMessage={sendMessage} />
      </div>
    </div>
  );
};
