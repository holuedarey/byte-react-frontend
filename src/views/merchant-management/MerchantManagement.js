import React from "react";
import Navbar from "../../components/navbar/Navbar";
import DropdownMenu from "../../components/DropdownMenu";
import MerchantView from "./view-merchants/MerchantView";
import TerminalView from "./view-terminals/TerminalView";
import HandleGetApi from "../../components/handleApi/HandleGetApi";

export default function MerchantManagement() {
  const [merchants, setMerchants] = React.useState();

  React.useEffect(() => {
    HandleGetApi("merchants/", setMerchants)
  }, []);

  const Merchant = <MerchantView merchants={merchants} />;
  const Terminal = <TerminalView />;
  return (
    <div>
      <Navbar />
      <div className="container-fluid p-5">
        <DropdownMenu
          label="Merchant Management"
          items={[
            { name: "View Terminal", content: Terminal },
            { name: "View Merchant", content: Merchant },
          ]}
        />
      </div>
    </div>
  );
}
