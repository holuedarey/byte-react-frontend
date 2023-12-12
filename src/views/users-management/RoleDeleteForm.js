import React, { useState } from "react";
import CustomSelect from "../../components/customSelect/CustomSelect";
import httpClient from "../../helpers/RequestInterceptor";

export default function RoleDeleteForm({
  onClose,
  setMessage,
  selectedUser,
  fetchData,
}) {
  const [role, setRole] = useState("");

  const handleDeleteRole = (e) => {
    e.preventDefault();

    const username = selectedUser.username;
    const url = `users/deleteuserfromrole/${username}`;
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: { newRole: role }, // Placing the payload in the 'data' property
    };

    httpClient
      .delete(url, config)
      .then((response) => {
        setMessage(response?.data?.responseMessage);
        onClose();
        fetchData();
      })
      .catch((error) => {
        setMessage(error?.response?.data?.responseMessage);
        console.error("Error deleting user from role:", error);
      });
  };
  return (
    <form className="user-form" onSubmit={handleDeleteRole}>
      <h6 className="text-center">Manage User Role</h6>
      <div className="mb-3">
        <div>User Email : {selectedUser?.email}</div>
        <div>Current Roles: {selectedUser?.roles?.join(", ")}</div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label className="form-label" htmlFor="emailAddress">
            New Role:
          </label>
          <CustomSelect
            selectedVal={role ? role : "Select Role"}
            setSelectedValue={setRole}
            items={[{ name: "admin" }, { name: "super-admin" }]}
            defaultOption={{ label: "Select Role", value: "" }}
          />
        </div>
      </div>
      <div>
        <button className="btn btn-del mt-4" type="submit">
          Delete
        </button>
        <button className="btn btn--alt" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
