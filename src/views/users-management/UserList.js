import React, { useEffect, useState } from "react";
import "./UserList.css";
import Modal from "../../components/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import CreateUserForm from "./CreateUserForm";
import HandleGetApi from "../../components/handleApi/HandleGetApi";
import Table from "../../components/Table";
import httpClient from "../../helpers/RequestInterceptor";
import successIcon from "../../images/successful-transaction.svg";
import pendingIcon from "../../images/pending-transaction.svg";
import totalIcon from "../../images/all-transaction.svg";
import RoleUpdateForm from "./RoleUpdateForm";
import RoleDeleteForm from "./RoleDeleteForm";
import FormatDate from "../../helpers/FormatDate";
import FilterUserList from "./FilterUserList";

export default function UserList() {
  const [openUserForm, setOpenUserForm] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState({});
  const [summary, setSummary] = useState({});
  const [role, setRole] = useState("");
  const [editRole, setEditRole] = useState(false);
  const [deleteRole, setDeleteRole] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const data = JSON.parse(localStorage.getItem("user"));
  const [limit, setLimit] = useState(50);
  const [pageNumber, setPageNumber] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchParam, setSearchParam] = useState("");
  const [emailParam, setEmailParam] = useState("");
  const [permissionParam, setPermissionParam] = useState("");
  const [userStatus, setUserStatus] = useState(false);

  const formattedStartDate = FormatDate(startDate);
  const formattedEndDate = FormatDate(endDate);

  const hasApprovalPermission = data.permissions.includes("approval");

  const userList = users?.users;

  const handleCreateUser = () => {
    setOpenUserForm(true);
  };

  const closeModal = () => {
    setOpenUserForm(false);
    setEditRole(false);
    setDeleteRole(false);
  };

  const fetchData = () => {
    HandleGetApi(
      `users/users?role=${role}&page=${pageNumber}&limit=${limit}&startdate=${formattedStartDate}&enddate=${formattedEndDate}&search=${searchParam}&email=${emailParam}&permissions=${permissionParam}&approval=${userStatus}`,
      setUsers
    );
  };

  const getSummary = () => {
    HandleGetApi(`users/summary`, setSummary);
  };

  const handleEditRole = (userRow) => {
    setEditRole(true);
    setSelectedUser(userRow);
  };

  const handleDeleteRole = (userRow) => {
    setDeleteRole(true);
    setSelectedUser(userRow);
  };

  const toggleStatus = (userEmail) => {
    const url = "users/activate-deactivate";
    const payload = { email: userEmail };

    httpClient
      .put(url, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error toggling status:", error);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "S/N",
        Cell: (row) => {
          return <div>{row.row.index + 1}</div>;
        },
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Roles",
        accessor: "roles",
        Cell: ({ cell: { value } }) => {
          return <div>{value.join(", ")}</div>;
        },
      },
      {
        Header: "Permissions",
        accessor: "permissions",
        Cell: ({ cell: { value } }) => {
          return <div>{value.join(", ")}</div>;
        },
      },
      {
        Header: "Activate/Deactivate",
        Cell: (row) => {
          const rowData = row.row.original;
          const { email, isApproved } = rowData;

          const handleStatusToggle = () => {
            toggleStatus(email);
          };

          return (
            <>
              <div className="form-check form-switch">
                <label
                  className="form-check-label"
                  htmlFor={`enabled-${row.row.index}`}
                >
                  {isApproved ? "Active" : "Disabled"}
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="enabled"
                  id={`enabled-${row.row.index}`}
                  checked={isApproved}
                  onChange={handleStatusToggle}
                  disabled={!hasApprovalPermission}
                />
              </div>
            </>
          );
        },
      },
      {
        Header: "",
        accessor: "Action",
        Cell: (row) => {
          const userRow = row.row.original;
          return (
            <div>
              <button
                className="user-action"
                onClick={() => handleEditRole(userRow)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                className="user-action"
                onClick={() => handleDeleteRole(userRow)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (message?.trim().length > 0) {
      toast(message);
      setMessage(""); // Clear the message after displaying the toast
    }
  }, [message]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <div className="user-list">
      <div className="d-flex justify-content-end align-items-center">
        <button
          type="button"
          className="btn add-user-btn"
          onClick={handleCreateUser}
        >
          Add User
        </button>
      </div>
      {users?.users && (
        <>
          <h6>Activation Summary</h6>
          <div className="user-summary">
            <div className="row">
              <SummaryCard
                count={summary[0]?.approvedStatus[0]?.count}
                label="Approved"
                icon={successIcon}
              />
              <SummaryCard
                count={summary[0]?.pendingStatus[0]?.count}
                label="Pending"
                icon={pendingIcon}
              />
              <SummaryCard
                count={summary[0]?.total[0]?.count}
                label="Total"
                icon={totalIcon}
              />
            </div>
          </div>
          <FilterUserList
            limit={limit}
            startDate={startDate}
            endDate={endDate}
            setLimit={setLimit}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            searchParm={searchParam}
            setSearchParam={setSearchParam}
            fetchData={fetchData}
          />
          {userList.length > 0 ? (
            <Table columns={columns} data={userList} />
          ) : (
            <p className="no-record">No record found</p>
          )}
        </>
      )}
      {openUserForm && (
        <Modal
          isOpen={openUserForm}
          onClose={closeModal}
          content={
            <CreateUserForm onClose={closeModal} setMessage={setMessage} />
          }
        />
      )}
      {editRole && (
        <Modal
          isOpen={editRole}
          onClose={closeModal}
          content={
            <RoleUpdateForm
              onClose={closeModal}
              setMessage={setMessage}
              selectedUser={selectedUser}
              fetchData={fetchData}
            />
          }
        />
      )}
      {deleteRole && (
        <Modal
          isOpen={deleteRole}
          onClose={closeModal}
          content={
            <RoleDeleteForm
              onClose={closeModal}
              setMessage={setMessage}
              selectedUser={selectedUser}
              fetchData={fetchData}
            />
          }
        />
      )}
      <ToastContainer />
    </div>
  );
}

const SummaryCard = ({ count, label, icon }) => {
  return (
    <div className="col">
      <div className="card-summary">
        <div className="status-image">
          <img src={icon} alt="image" />
        </div>
        <div className="details">
          <p className="count">{count?.toLocaleString()}</p>
          <p className="label">{label}</p>
        </div>
      </div>
    </div>
  );
};
