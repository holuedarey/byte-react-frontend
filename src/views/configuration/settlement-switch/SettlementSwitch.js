import React from "react";
import TabView from "../../../components/TabView";
import CreateSwitch from "./CreateSwitch";
import EditSwitch from "./EditSwitch";

export default function SettlementSwitch() {
  const newSwitch = <CreateSwitch />;
  const editSwitch = <EditSwitch />;
  return (
    <div className="settlement-switch">
      <TabView
        tabs={[
          { name: "New Switch Configuration", content: newSwitch },
          { name: "Edit Switch Configuration", content: editSwitch },
        ]}
      />
    </div>
  );
}
