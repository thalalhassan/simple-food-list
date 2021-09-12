import React from "react";
import CardButton from "../cart-button";
import Styles from "./list-card.module.scss";

export default function ListCard({ menu, handleOnCartUpdate }) {
  const {
    dish_id,
    dish_name,
    dish_description,
    dish_image,
    dish_price,
    dish_calories,
    addonCat,
    dish_currency,
    dish_Type,
  } = menu;

  return (
    <article className={Styles.card} key={dish_id}>
      <div>
        <img
          className={Styles.dish_type}
          src={dish_Type === 1 ? "veg.svg" : "non-veg.svg"}
          alt="dish_Type"
        />
      </div>

      <div className={Styles.card_body}>
        <h2>{dish_name}</h2>
        <h3>
          {dish_currency} {dish_price}
          <span className={Styles.dish_calories}>{dish_calories} calories</span>
        </h3>
        <p className={Styles.body_content}>{dish_description}</p>
        <CardButton
          handleOnAddItem={(count) => {
            handleOnCartUpdate(count, dish_id);
          }}
          handleOnRemoveItem={(count) => {
            handleOnCartUpdate(count, dish_id);
          }}
        />
        {addonCat?.length ? (
          <span className={Styles.customization}>Customization Available</span>
        ) : (
          ""
        )}
      </div>
      <div>
        <img className={Styles.dish_image} src={dish_image} alt={dish_name} />
      </div>
    </article>
  );
}
