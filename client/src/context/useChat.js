import { useEffect, useState } from "react";
import io from "socket.io-client";

export const socket = io.connect("http://localhost:3001");

export const useChat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [users, setUsers] = useState([]);
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
    socket.emit("set-user", { name: username, room: room ? room : 1 });
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

  const logout = async () => {
    setShowChat(false);
    setRoom("");
    setUsername("");
    await socket.emit("logoutMessage");
  };

  useEffect(() => {
    socket.on("receivedMessage", (messageData) => {
      setAllMessages((prevState) => [...prevState, messageData]);
    });
    socket.on("usersInRoom", (users) => {
      setUsers(users);
    });
    return () => {
      socket.off("receivedMessage");
      socket.off("usersInRoom");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return {
    activeButton,
    allMessages,
    message,
    room,
    showChat,
    showRoom,
    username,
    users,

    handleGlobal,
    handleRoom,
    joinChat,
    logout,
    sendMessage,
    setMessage,
    setRoom,
    setShowChat,
    setUsername,
  };
};
