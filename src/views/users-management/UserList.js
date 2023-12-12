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

export default function UserList() {
  const [openUserForm, setOpenUserForm] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState({});
  const [summary, setSummary] = useState({});
  const data = JSON.parse(localStorage.getItem("user"));

  const hasApprovalPermission = data.permissions.includes("approval");

  const userList = users?.users;

  const handleCreateUser = () => {
    setOpenUserForm(true);
  };

  const closeModal = () => {
    setOpenUserForm(false);
  };

  const fetchData = () => {
    HandleGetApi(`users/users`, setUsers);
  };

  const getSummary = () => {
    HandleGetApi(`users/summary`, setSummary);
  };

  console.log("summary", summary);

  const toggleStatus = (userEmail) => {
    console.log("email", userEmail);
    const url = "users/activate-deactivate";
    const payload = { email: userEmail };

    httpClient
      .put(url, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("res", response);
        // fetchData();
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
        Cell: ({ row }) => (
          <div>
            <i className="fas fa-edit"></i>
          </div>
        ),
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
          <Table columns={columns} data={userList} />
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
          <p className="count">{count}</p>
          <p className="label">{label}</p>
        </div>
      </div>
    </div>
  );
};
