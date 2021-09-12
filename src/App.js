import React, { useState, useEffect } from "react";
import axios from "axios";

import ListCard from "./components/list-card";
import "./App.scss";

function App() {
  const [cartCountData, setCartCountData] = useState({});
  const [restaurant, setRestaurant] = useState({});
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");

  // const changeTab: (selectedTab:) => void = updatedTab => {
  //   setSelectedTab(updatedTab.label);
  // };

  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099")
      .then(({ data }) => {
        setRestaurant(data[0]);
        setSelectedTab(data[0]?.table_menu_list[0].menu_category_id);
        setSelectedMenu(data[0]?.table_menu_list[0]?.category_dishes || []);
      })
      .catch((err) => {
        alert("something went wrong");
      });

    return () => {
      setRestaurant({});
      setSelectedMenu([]);
      setCartCountData({});
      setSelectedTab("");
    };
  }, []);

  const handleOnCartUpdate = (count, dish_id) => {
    const updateData = { ...cartCountData, [dish_id]: count };
    setCartCountData(updateData);
  };

  return (
    <div className="app">
      <div className="app_header">
        <button className="arrow_button" onClick={() => {}}>
          <img src="arrow.svg" alt="arrow" />
        </button>
        <h1>{restaurant.restaurant_name}</h1>
        <h3>My Orders</h3>
        <div className="cart">
          <img src="shopping-cart.svg" alt="shopping-cart" />
          <span className="count_span">
            {Object.values(cartCountData).reduce(
              (acc, c) => (c > 0 ? acc + 1 : acc),
              0
            )}
          </span>
        </div>
      </div>
      <div className="container">
        <ul className="menu_list">
          {restaurant.table_menu_list?.map(
            ({ menu_category_id, category_dishes, menu_category }) => (
              <li
                className={selectedTab === menu_category_id ? "active_li" : ""}
                key={menu_category_id}
                onClick={() => {
                  setSelectedMenu(category_dishes);
                  setSelectedTab(menu_category_id);
                }}
              >
                {menu_category}
              </li>
            )
          )}
        </ul>
        <div className="item_list">
          {selectedMenu.map((menu) => (
            <ListCard
              key={menu.dish_id}
              menu={menu}
              handleOnCartUpdate={handleOnCartUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
