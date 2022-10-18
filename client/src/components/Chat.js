import React, { useEffect, useState } from "react";
import styles from "../App.module.css";
import ScrollToBottom from "react-scroll-to-bottom";

export const Chat = ({
  socket,
  username,
  room,
  setShowChat,
  setUsername,
  setRoom,
}) => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const sendMessage = async () => {
    if (!message) return;
    const messageData = {
      room: room ? room : 1,
      user: username,
      message: message,
      time: `${new Date(Date.now()).getHours()}:${new Date(
        Date.now()
      ).getMinutes()}`,
      id: new Date(Date.now()).getMilliseconds(),
    };
    setAllMessages((prevState) => [...prevState, messageData]);
    await socket.emit("sendMessage", messageData);
    setMessage("");
  };

  const logout = () => {
    setShowChat(false);
    setRoom("");
    setUsername("");
  };

  useEffect(() => {
    socket.on("receivedMessage", (messageData) => {
      setAllMessages((prevState) => [...prevState, messageData]);
    });
    return () => {
      socket.off("receivedMessage");
    };
  }, [socket]);

  return (
    <>
      <div className={styles.header__username__Info}>
        <span id="userName">{username}</span>
        <button className={styles.logout__button} onClick={logout}>
          Logout
        </button>
      </div>
      <div className={styles.chat__container} id={styles.chat__container}>
        <div>{room === "" ? "Sala global" : `Sala: ${room}`}</div>
        <hr />
        <div style={{ marginBottom: "10px" }}>
          {`${username} ${
            room === ""
              ? "Ingresaste correctamente a la sala global"
              : `Ingresaste correctamente a la sala: ${room}`
          }`}
        </div>
        <ScrollToBottom className={styles.test}>
          {allMessages.map((item) => {
            return (
              <div
                className={styles.message__container}
                id={username === item.user ? styles.you : styles.other}
                key={item.id}
              >
                <div className={styles.message}>{item.message}</div>
                <div className={styles.message__metadata}>
                  {item.user}. {item.time}
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className={styles.messageContainer}>
        <div className={styles.send__message__container}>
          <input
            type="text"
            placeholder="Escriba un mensaje..."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && sendMessage();
            }}
            value={message}
          />
          <button className={styles.send__btn} onClick={sendMessage}>
            <div className={styles.svg_wrapper - 1}>
              <div className={styles.svg_wrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Enviar</span>
          </button>
        </div>
      </div>
    </>
  );
};
