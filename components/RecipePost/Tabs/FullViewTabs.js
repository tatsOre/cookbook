import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import {formatIngr } from '../../../src/utils'
import styles from "./Tabs.module.css";
import Instructions from "../Instructions";

const TabLink = ({ label, active, setActiveTab }) => {
  const handleItemClick = () => setActiveTab(label);
  return (
    <button
      className={` ${active && styles.active} ${styles.tab__link}`}
      onClick={handleItemClick}
    >
      {label}
    </button>
  );
};

const TabContent = ({ active, children }) => {
  return (
    <div className={`${active && styles.active} ${styles.tab__content}`}>
      {children}
    </div>
  );
};

const Tabs = ({ open, openTabs, data }) => {
  const [activeTab, setActiveTab] = useState("Ingredients");
  const { ingredients, instructions, comments } = data;
  const handleItemClick = () => openTabs(false);

  return (
    <Modal
      show={open}
      fullscreen={true}
      onHide={handleItemClick}
      className={styles.tabs__container}
    >
      <Modal.Header closeButton className={styles.tabs__header}>
        <Modal.Title>
          <h2>Happy Cooking!</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TabLink
          label="Ingredients"
          active={activeTab === "Ingredients"}
          setActiveTab={setActiveTab}
        />
        <TabLink
          label="Instructions"
          active={activeTab === "Instructions"}
          setActiveTab={setActiveTab}
        />

        <TabContent active={activeTab === "Ingredients"}>
          <ul>
            {ingredients.map((item, index) => (
              <li key={`${index}-${item._id}`}>
                <div className={styles.ingredients__item}>
                  <input id={item._id} type="checkbox" />
                  <label
                    htmlFor={item._id}
                    className={styles.ingredients__label}
                  >
                    {formatIngr(item)}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </TabContent>
        <TabContent active={activeTab === "Instructions"}>
          <Instructions instructions={instructions} comments={comments} />
        </TabContent>
      </Modal.Body>
    </Modal>
  );
};

export default Tabs;
