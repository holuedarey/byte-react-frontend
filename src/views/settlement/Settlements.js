import React from "react";
import Navbar from "../../components/navbar/Navbar";
import DropdownMenu from "../../components/DropdownMenu";
import Reconciliation from "./settlement-reconciliation/Reconciliation";
import Report from "./settlement-report/Report";
import SettlementUpload from "./settllement-upload/SettlementUpload";
import HandleGetApi from "../../components/handleApi/HandleGetApi";

export default function Settlements() {
  const [settlementTransaction, setSettlementTransaction] = React.useState([]);
  const [fileUploadHistory, setFileUploadHistory] = React.useState([]);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const formattedStartDate = startDate.toISOString().slice(0, 10);
  const formattedEndDate = endDate.toISOString().slice(0, 10);

  const url = "";
  const data = { email: "email", password: "password" };

  const changeStartDate = (date) => {
    setStartDate(date);
  };

  const changeEndDate = (date) => {
    setEndDate(date);
  };

  const report = (
    <Report
      settlementTransaction={settlementTransaction}
      startDate={startDate}
      endDate={endDate}
      changeStartDate={changeStartDate}
      changeEndDate={changeEndDate}
    />
  );
  const upload = <SettlementUpload fileUploadHistory={fileUploadHistory} />;
  const reconciliation = <Reconciliation />;

  React.useEffect(() => {
    HandleGetApi("settlements/", setSettlementTransaction);
    HandleGetApi("settlements/uploads/", setFileUploadHistory);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container-fluid p-5">
        <DropdownMenu
          label="Settlement"
          items={[
            { name: "Settlement Report", content: report },
            { name: "Settlement Upload", content: upload },
            { name: "Settlement Reconciliation", content: reconciliation },
          ]}
        />
      </div>
    </div>
  );
}
