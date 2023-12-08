import React, { useState } from "react";
import Table from "../../../components/Table";
import ModalTerminalUpload from "../../../components/ModalUploadTerminal";
import Modal from "../../../components/modal/Modal";
import TerminalForm from "./TerminalForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TerminalEditForm from "./TerminalEditForm";
import httpClient from "../../../helpers/RequestInterceptor";
import HandleGetApi from "../../../components/handleApi/HandleGetApi";

export default function StatusDetails({
  summary,
  pageStart,
  reloadPage,
}) {
  const [msg, setMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [terminals, setTerminal] = React.useState([]);
  const data = terminals?.terminalDetails ?? [];
  // const [enabled, setEnabled] = useState(false);

  // console.log("term", terminals, data)
  const message = "";

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setIsBulkModalOpen(false);
  };

  const addTerminalHandler = () => {
    setIsModalOpen(true);
  };

  const uploadTerminalHandler = () => {
    setIsBulkModalOpen(true);
  };

  const handleEditData = (row) => {
    setSelectedRowData(row);
    setIsEditModalOpen(true);
  };

  const toggleStatus = (rowData) => {
    const updatedRowData = { ...rowData, enabled: !rowData.enabled };
    // console.log("updated Row", updatedRowData);
    const url = `terminal/updateTerminal/${rowData.serialNumber}`;

    httpClient
      .put(url, updatedRowData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Status toggled successfully:", response);
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
          return <div>{row.row.index + pageStart}</div>;
        },
      },
      {
        Header: "Merchant Id",
        accessor: "merchantCode",
      },
      {
        Header: "Terminal Id",
        accessor: "terminalId",
      },
      {
        Header: "Serial Number",
        accessor: "serialNumber",
      },

      {
        Header: "Physical Address",
        accessor: "physicalAddress",
      },
      {
        Header: "Status",
        Cell: (row) => {
          const rowData = data[row.row.index];
          const statusCheck = rowData?.enabled;

          const handleStatusToggle = () => {
            toggleStatus(rowData);
          };

          return (
            <>
              <div className="form-check form-switch">
                <label
                  className="form-check-label"
                  htmlFor={`enabled-${row.row.index}`}
                >
                  {statusCheck ? "Enabled" : "Disabled"}
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="enabled"
                  id={`enabled-${row.row.index}`}
                  checked={statusCheck}
                  onChange={handleStatusToggle}
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
          <div onClick={() => handleEditData(row.original)}>
            <i className="fas fa-edit"></i>
          </div>
        ),
      },
    ],
    [data]
  );

  React.useEffect(() => {
    if (msg?.trim().length > 0) {
      toast(msg);
      setMsg(""); // Clear the message after displaying the toast
    }
  }, [msg]);

  React.useEffect(() => {
    HandleGetApi(
      `terminal/getTerminals`,
      setTerminal
    );
  }, []);

  return (
    <div className="status-details bg-white p-4 border-top-0">
      {/* <div>{summary}</div> */}
      {message !== "" ? <p className="alert alert-info">{message}</p> : <></>}
      <div>
        <div className="table-responsive table-wrapper">
          <div>
            <div className="actions mb-3">
              <button className="btn" onClick={addTerminalHandler}>
                Add Terminal
              </button>
              <button className="btn" onClick={uploadTerminalHandler}>
                Upload Terminal
              </button>
            </div>
            {isModalOpen && (
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                content={
                  <TerminalForm
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    message={msg}
                    setMessage={setMsg}
                  />
                }
              />
            )}

            {isEditModalOpen && (
              <Modal
                isOpen={isEditModalOpen}
                onClose={closeModal}
                content={
                  <TerminalEditForm
                    isOpen={isEditModalOpen}
                    onClose={closeModal}
                    message={msg}
                    setMessage={setMsg}
                    selectedRowData={selectedRowData}
                  />
                }
              />
            )}
            {isBulkModalOpen && (
              <Modal
                isOpen={isBulkModalOpen}
                onClose={closeModal}
                content={
                  <ModalTerminalUpload
                    isOpen={isBulkModalOpen}
                    onClose={closeModal}
                    message={msg}
                    setMessage={setMsg}
                  />
                }
              />
            )}
          </div>
          <Table columns={columns} data={data} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
