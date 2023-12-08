import React from "react";
import TabView from "../../../components/TabView";
import Status from "./StatusDetails";
import HandleGetApi from "../../../components/handleApi/HandleGetApi";

export default function TerminalView() {
  const [terminals, setTerminal] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [searchParm, setSearchParam] = React.useState("");
  const [reloadPage, setReloadPage] = React.useState(false);

  const postPerPage = 50;
  const pageStart = (pageNumber - 1) * postPerPage + 1;
  // const formattedDate =
  //   date.getFullYear() +
  //   "-" +
  //   parseInt(date.getMonth() + 1) +
  //   "-" +
  //   date.getDate();
  const formattedStartDate =
    startDate.getFullYear() +
    "-" +
    parseInt(startDate.getMonth() + 1) +
    "-" +
    startDate.getDate();
  const formattedEndDate =
    endDate.getFullYear() +
    "-" +
    parseInt(endDate.getMonth() + 1) +
    "-" +
    endDate.getDate();
  React.useEffect(() => {
    HandleGetApi(
      `terminal/getTerminals?limit=${postPerPage}&page=${pageNumber}&startdate=${formattedStartDate}&enddate=${formattedEndDate}&search=${searchParm}`,
      setTerminal
    );
  }, [reloadPage]);

  // console.log("hguyu", terminals);
  const StatusDetails = <Status terminals={terminals} pageStart={pageStart} />;

  const MerchantParam = <div></div>;
  return (
    <div>
      <TabView
        tabs={[
          {
            name: "Terminal status details",
            content: StatusDetails,
            param: MerchantParam,
            pageStart: pageStart,
            reloadPage: reloadPage,
          },
          // {name: "Terminal map overview", content: MapOverview, param: MerchantParam}
        ]}
      />
    </div>
  );
}
