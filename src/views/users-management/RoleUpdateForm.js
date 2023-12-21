import React, { useState } from "react";
import CustomSelect from "../../components/customSelect/CustomSelect";
import httpClient from "../../helpers/RequestInterceptor";

export default function RoleUpdateForm({
  onClose,
  setMessage,
  selectedUser,
  fetchData,
}) {
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = selectedUser.username;
    // console.log("submit", username, role);
    const url = `users/addusertorole/${username}`;
    const payload = { newRole: role };

    httpClient
      .put(url, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setMessage(response?.data?.responseMessage);
        onClose();
        fetchData();
      })
      .catch((error) => {
        setMessage(error?.data?.responseMessage);
        console.error("Error toggling status:", error);
      });
  };
  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h6 className="text-center">Manage User Role</h6>
      <div className="mb-3">
        <div>User Email : {selectedUser.email}</div>
        <div>Current Roles: {selectedUser.roles.join(", ")}</div>
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
        <button className="btn mt-4" type="submit">
          Update
        </button>
        <button className="btn btn--alt" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
