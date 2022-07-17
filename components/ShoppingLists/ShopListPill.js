import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import { useFieldArray, useForm } from "react-hook-form";

import { ButtonDelete, ButtonOutlinedTest } from "../Buttons/Buttons";

import styles from "./ShoppingLists.module.css";

const ShopListPill = ({ data }) => {
  const { _id, recipe, items } = data;
  const [show, setShow] = useState(false);

  const { control, register, handleSubmit } = useForm({
    defaultValues: items,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <div className={styles.shopList__card}>
      <h3>
        Shopping List for <a href={`/recipes/${_id}`}>{recipe?.title}</a>
      </h3>
      <div className={styles.shopList__actions}>
        <ButtonOutlinedTest
          type="button"
          onClick={() => setShow(true)}
          value="View More"
        />
        <ButtonDelete id={data._id} item="shoppingList" />
      </div>

      <Modal show={show} fullscreen="sm-down" onHide={() => setShow(false)}>
        <Modal.Header closeButton className={styles.shopList__modal__header}>
          <h3>
            Shopping List for <b>{recipe?.title}</b>
          </h3>
        </Modal.Header>
        <Modal.Body>
          <ul className={styles.shopList__items}>
            {items.map((item, index) => (
              <li key={`${_id}-item-${index}`}>
                <div>
                  <input id={item} type="checkbox" />
                  <label htmlFor={item}>{item}</label>
                </div>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ShopListPill;
