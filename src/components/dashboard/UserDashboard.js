import React, { useState, useEffect } from "react";
import axios from "axios";
import UserItem from "./UserItem";
export default function UserDashBoard() {

const [userList, setUserList] = useState([]);
function fetchUserList() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5125/api/v1/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUserList(res.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchUserList();
  }, []);
  console.log(userList);
  return (
    <div>
      <h1> Users Dashboard</h1>
      <div>
        {userList.map((user) => {
          return (
            <UserItem key={user.id} user={user} fetchUserList={fetchUserList} />
          );
        })}
      </div>
    </div>
  );
}
