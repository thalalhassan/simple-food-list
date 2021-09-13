import React, { useState } from "react";
import Styles from "./cart-button.module.scss";

export default function CardButton({
  handleOnAddItem,
  handleOnRemoveItem,
  currentCount,
}) {
  const [count, setCount] = useState(currentCount);

  const handleOnAdd = () => {
    const updateCount = count + 1;
    setCount(updateCount);
    handleOnAddItem(updateCount);
  };

  const handleOnRemove = () => {
    const updateCount = count > 0 ? count - 1 : 0;
    setCount(updateCount);
    handleOnRemoveItem(updateCount);
  };

  return (
    <div className={Styles.card_button}>
      <button onClick={handleOnRemove}>-</button>
      {count}
      <button onClick={handleOnAdd}>+</button>
    </div>
  );
}
