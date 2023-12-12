import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./UsersManagement.css";
import TabView from "../../components/TabView";
import UserList from "./UserList";

export default function () {
  const userList = <UserList />;
  return (
    <div>
      <Navbar />
      <div className="container-fluid users-management">
        <p>User Management</p>
        <TabView
          resetParams=""
          tabs={[
            {
              name: "Overview Dashboard",
              content: userList,
            },
          ]}
        />
      </div>
    </div>
  );
}
