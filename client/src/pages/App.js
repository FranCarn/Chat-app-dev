import { useContext } from "react";
import styles from "../App.module.css";

import { Login, Chat } from "../components";
import { ChatContext } from "../context/ChatContext";

function App() {
  const { showChat } = useContext(ChatContext);
  return (
    <div>
      <div className={styles.title}>
        <span>ꞏ Neon chat ꞏ</span>
        <hr />
        {!showChat ? <Login /> : <Chat />}
      </div>
    </div>
  );
}

export default App;
