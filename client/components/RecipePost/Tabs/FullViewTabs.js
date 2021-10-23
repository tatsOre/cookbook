import { useState } from "react";
import { formatIngr } from "../Ingredients";
import styles from "./Tabs.module.css";
import CloseButton from "react-bootstrap/CloseButton";
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
    <div className={`${open && styles.active} ${styles.tabs__container}`}>
      <div className={styles.tabs__header}>
        <p>Let's cook!</p>
        <CloseButton variant="white" onClick={handleItemClick} />
      </div>

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
                <label htmlFor={item._id} className={styles.ingredients__label}>
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
    </div>
  );
};

export default Tabs;
