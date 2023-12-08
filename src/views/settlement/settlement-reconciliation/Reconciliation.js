import React from "react";
import ReconciliationBetaSummary from "./ReconciliationBetaSummary";
import ReconciliationSummary from "./ReconciliationSummary";
import ReconciliationHistory from "./ReconciliationHistory";
import TabView from "../../../components/TabView";
import HandleGetApi from "../../../components/handleApi/HandleGetApi";

export default function Reconciliation() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    HandleGetApi("reconciliation", setData);
  }, []);

  const history = <ReconciliationHistory data={data} />;
  const summary = <ReconciliationSummary />;
  const betaSummary = <ReconciliationBetaSummary />;

  return (
    <div>
      <TabView
        tabs={[
          { name: "History", content: history },
          { name: "Summary", content: summary },
          { name: "Beta Summary", content: betaSummary },
        ]}
      />
    </div>
  );
}
