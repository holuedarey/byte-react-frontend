import React from "react";
import "./SettlementUpload.css";
import TabView from "../../../components/TabView";
import AllHistory from "./AllHistory";
import ChangeUpsl from "./ChangeUpsl";
import Interswitch from "./Interswitch";
import NewUpsl from "./NewUpsl";
import UpdateUpsl from "./UpdateUpsl";
import document from "../../../images/doc.png";
import PostData from "../../../components/handleApi/PostData";

export default function SettlementUpload({ fileUploadHistory }) {
  const [err, setErr] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [files, setFiles] = React.useState(null);
  const inputRef = React.useRef();
  const url = "settlements/uploads";
  const data = {
    pid: "pid",
    itemCount: "itemCount",
    filename: "filename",
    processor: "processor",
    data: "data",
  };

  const history = <AllHistory fileUploadHistory={fileUploadHistory} />;
  const newUpsl = <NewUpsl />;
  const updatedUpsl = <UpdateUpsl />;
  const changeUpsl = <ChangeUpsl />;
  const interswitch = <Interswitch />;

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(e.dataTransfer.files);
  };

  const UploadFile = (e) => {
    e.preventDefault();
    PostData(url, data).then((result) => {
      const { error, message } = result;
      if (error) {
        setErr(true);
        setMsg(message[0]);
        return;
      }
    });
  };

  return (
    <div>
      {/* {!files && ( */}
      <div className="file-upload">
        <div className="file-upload-card">
          <div
            className="file-upload-area"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
          >
            <input
              type="file"
              onChange={(e) => setFiles(e.target.files)}
              hidden
              ref={inputRef}
            />
            <div className="d-flex justify-content-center">
              <img src={document} alt="document" />
            </div>
            <p className="text-center mt-2">
              Select An Excel File To Upload <br /> Or Drag File Here
            </p>
          </div>
        </div>
      </div>
      {/* )} */}
      <TabView
        tabs={[
          { name: "All History", content: history },
          { name: "Upsl New", content: newUpsl },
          { name: "Upsl New Updated", content: updatedUpsl },
          { name: "Upsl Change", content: changeUpsl },
          { name: "Interswitch", content: interswitch },
        ]}
      />
    </div>
  );
}
