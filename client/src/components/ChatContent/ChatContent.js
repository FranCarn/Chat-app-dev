import React, { useContext } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styles from "./chatContent.module.css";
import { ChatContext } from "../../context/ChatContext";

export const ChatContent = () => {
  const { allMessages, username } = useContext(ChatContext);
  return (
    <ScrollToBottom className={styles.textScroll}>
      {allMessages.map((item, i) => {
        return (
          <div id={username === item.user ? styles.you : styles.other} key={i}>
            <div className={styles.message}>{item.message}</div>
            <div className={styles.message_metadata}>
              {item.user}. {item.time}
            </div>
          </div>
        );
      })}
    </ScrollToBottom>
  );
};
