import { createContext } from "react";
import { useChat } from "./useChat";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const chat = useChat();
  return (
    <ChatContext.Provider value={{ ...chat }}>{children}</ChatContext.Provider>
  );
};
