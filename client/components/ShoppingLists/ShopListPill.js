import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import { useFieldArray, useForm } from "react-hook-form";

import { ButtonDelete, ButtonOutlinedTest } from "../Buttons/Buttons";

import styles from "./ShoppingLists.module.css";

const ShopListPill = ({ data }) => {
  const { _id, recipe, items } = data;
  const [show, setShow] = useState(false);
  /*
  const { register, handleSubmit } = useForm({
    defaultValues: items,
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
  });
  */

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
        <Modal.Header closeButton>
          <Modal.Title>
            Shopping List for <b>{recipe?.title}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {items.map((li) => (
              <li key={li}>{li}</li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ShopListPill;
