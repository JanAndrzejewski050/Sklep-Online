import { Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { userLoginReducer } from "../Redux/Reducers/User";
import { useState } from "react";

export function UserDropdown({ logoutHandler }) {
  const navigate = useNavigate(); // Hook do nawigacji

  const goToProfile = () => {
    navigate("/profile"); // Przekierowanie do strony profilu
  };

  const goToUserList = () => {
    navigate("/admin/userslist")
  }

  const goToOrdersList = () => {
    navigate("/admin/listorders")
  }

  const userInfo = localStorage.getItem("userInfo")
  const parsedUserInfo = JSON.parse(userInfo);

  if (parsedUserInfo.isAdmin) {
    return (
      <Dropdown label="Admin" dismissOnClick={false}>
        <Dropdown.Item onClick={goToProfile}>Profile</Dropdown.Item> {/* Przekierowanie do profilu */}
        <Dropdown.Item onClick={goToUserList}>Users List</Dropdown.Item>
        <Dropdown.Item onClick={goToOrdersList}>Orders List</Dropdown.Item>
        <Dropdown.Item onClick={logoutHandler}>Sign out</Dropdown.Item>
      </Dropdown>
    );
  }
  else {
    return (
      <Dropdown label="User" dismissOnClick={false}>
        <Dropdown.Item onClick={goToProfile}>Profile</Dropdown.Item> {/* Przekierowanie do profilu */}
        <Dropdown.Item onClick={logoutHandler}>Sign out</Dropdown.Item>
      </Dropdown>
    );
  }
  
}
