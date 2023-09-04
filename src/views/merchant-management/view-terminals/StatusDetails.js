import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import Data from "../../../data.json";
import Modal from "../../../components/Modal";
import Backdrop from "../../../components/Backdrop";
import HandlePostApi from "../../../components/handleApi/HandlePostApi";

export default function StatusDetails({ summary, terminals, pageStart }) {
  const data = terminals?.terminalDetails ?? [];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checked, setCheckbox] = React.useState(false);

  function addTerminalHandler() {
    setModalIsOpen(true);
  }
  function closeModalHandler() {
    setModalIsOpen(false)
  }
  function handleEdit(terminal = null){
    console.log("Edit Click");
  }
  function handleDelete(terminal = null){
    console.log("Delete Click");
  }
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
          return <>
            <div className="form-check form-switch">
              <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{data[row.row.index]?.block ? "Enabled": "Disabled"}</label>
              <input className="form-check-input" type="checkbox" name="enabled" role="switch" id="enabled" defaultChecked={statusCehck} disabled={true} />
            </div>
          </>
        },
      },
      {
        Header: "Action",
        Cell: () => {
          return <>
           <span className="fas fa-pencil bg-warning btn btn-sm btn-info" style={{borderRadius: '50%', height: '25px', width:'30px', textAlign:'center', marginRight:'3px'}} onClick={handleEdit}></span>
           <span className="fas fa-close  bg-danger btn btn-sm btn-danger" style={{borderRadius: '50%', height: '25px', width:'30px', textAlign:'center'}} onClick={handleDelete}></span>
          </>
        },
      },
    ],
    [data]
  );
  return (
    <div className="bg-white p-5 border-top-0">
      {/* <div>{summary}</div> */}
      <div className="mt-5">
        <div className="table-responsive table-wrapper">
          <div>
            <div className="actions">
              <button className="btn" onClick={addTerminalHandler}>
                Add Terminal
              </button>
            </div>
            {modalIsOpen && <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler} children={<></>} />}
            {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
          </div>
          <Table columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
