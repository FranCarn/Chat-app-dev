import React, { useContext, useState } from "react";
import styles from "./dropdown.module.css";
import { ChatContext } from "../../context/ChatContext";

export const Dropdown = () => {
  const { users, username } = useContext(ChatContext);

  const [dropdown, setDropdown] = useState(false);
  return (
    <div
      className={styles.list_container}
      onClick={() => setDropdown((prev) => !prev)}
    >
      User List
      {dropdown && (
        <div className={styles.dropdown}>
          <div className={styles.dropdown_header}>
            Users online <div className={styles.circle_green} />
          </div>
          <hr />
          {users.map((item) => (
            <div>
              {item.name}
              {item.name === username && ` (you)`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
