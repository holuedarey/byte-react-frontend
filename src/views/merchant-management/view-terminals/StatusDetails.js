import React, { useState } from "react";
import Table from "../../../components/Table";
import ModalForm from "../../../components/ModalForm";
import ModalTerminalUpload from "../../../components/ModalUploadTerminal";
import Backdrop from "../../../components/Backdrop";
import Modal from "../../../components/modal/Modal";
import TerminalForm from "./TerminalForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StatusDetails({
  summary,
  terminals,
  pageStart,
  reloadPage,
}) {
  const [msg, setMsg] = useState("");
  const data = terminals?.terminalDetails ?? [];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenUpload, setModalIsOpenUpload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("add");
  const [selectedRowData, setSelectedRowData] = useState({});

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const message = "";
  let EditRow;

  const addTerminalHandler = () => {
    setIsModalOpen(true);
    setAction("add");
  };

  const closeModalHandler = (message) => {
    setMsg(message);
    message = message;
    setModalIsOpen(false);
  };

  const uploadTerminalHandler = () => {
    setModalIsOpenUpload(true);
  };

  const closeUploadModalHandler = () => {
    setModalIsOpenUpload(false);
  };

  const handleEditData = (row) => {
    setSelectedRowData(row);
    setIsModalOpen(true);
    setAction("update");
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
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
          const statusCehck = data[row.row.index]?.enabled;
          return (
            <>
              <div className="form-check form-switch">
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                >
                  {statusCehck ? "Enabled" : "Disabled"}
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="enabled"
                  role="switch"
                  id="enabled"
                  defaultChecked={statusCehck}
                  disabled={true}
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
    if (msg.trim().length > 0) {
      toast(msg);
      setMsg(""); // Clear the message after displaying the toast
    }
  }, [msg]);

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
                    selectedRowData={selectedRowData}
                  />
                }
              />
            )}

            {modalIsOpenUpload && (
              <ModalTerminalUpload
                onCancel={closeUploadModalHandler}
                onConfirm={closeModalHandler}
                children={<></>}
              />
            )}
            {modalIsOpenUpload && (
              <Backdrop onCancel={closeUploadModalHandler} />
            )}
          </div>
          <Table columns={columns} data={data} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
