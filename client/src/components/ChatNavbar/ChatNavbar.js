import React, { useContext } from "react";
import styles from "./chatNavbar.module.css";
import { ChatContext } from "../../context/ChatContext";

export const ChatNavbar = () => {
  const { username, logout } = useContext(ChatContext);
  return (
    <div className={styles.header_username_info}>
      <span id="userName">{username}</span>
      <button className={styles.logout_button} onClick={logout}>
        Logout
      </button>
    </div>
  );
};
