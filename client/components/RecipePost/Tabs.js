import { useState } from "react";
import styles from "./Tabs.module.css";
import CloseButton from "react-bootstrap/CloseButton";

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

const TabContent = ({ label, active, children }) => {
  return (
    <div className={` ${active && styles.active} ${styles.tab__content}`}>
      {children}
    </div>
  );
};

const Tabs = ({ open, openTabs, ingredients, instructions }) => {
  const [activeTab, setActiveTab] = useState("Ingredients");

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

      <TabContent label="Ingredients" active={activeTab === "Ingredients"}>
        <ul>
          {ingredients.map((item) => (
            <li key={item._id}>
              <input type="checkbox" />
              <label>
                {item.metric_quantity} {item.unit} {item.name}
              </label>
            </li>
          ))}
        </ul>
      </TabContent>
      <TabContent label="Instructions" active={activeTab === "Instructions"}>
        {instructions}
      </TabContent>
    </div>
  );
};

export default Tabs;
