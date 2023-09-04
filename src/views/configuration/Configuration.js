import React from "react";
import "./Configuration.css"
import Navbar from "../../components/navbar/Navbar";
import DropdownMenu from "../../components/DropdownMenu";
import Dashboard from "./dashboard/Dashboard";
import Support from "./support/Support";
import SameDay from "./same-day/SameDay";
import DisputeSwitch from "./dispute-switch/DisputeSwitch";
import PosAnalysis from "./pos-analysis/PosAnalysis";
import Terminal from "./terminal/Terminal";
import SettlementSwitch from "./settlement-switch/SettlementSwitch";

export default function Configuration() {
  const dashboard = <Dashboard />;
  const support = <Support />;
  const sameDay = <SameDay />;
  const settlementSwitch = <SettlementSwitch />;
  const disputeSwitch = <DisputeSwitch />;
  const posAnalysis = <PosAnalysis />;
  const terminal = <Terminal />;
  return (
    <div>
      <Navbar />
      <div className="container-fluid p-5">
        <DropdownMenu
          label="Configuration"
          items={[
            { name: "Dasboard", content: dashboard },
            { name: "Support", content: support },
            { name: "Same-Day", content: sameDay },
            { name: "Settlement-Switch", content: settlementSwitch },
            { name: "Dispute-Switch", content: disputeSwitch },
            { name: "Pos-Analysis", content: posAnalysis },
            { name: "Terminal", content: terminal },
          ]}
        />
      </div>
    </div>
  );
}
