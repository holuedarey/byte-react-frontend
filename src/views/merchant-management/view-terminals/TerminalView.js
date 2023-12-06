import React from 'react';
import TabView from '../../../components/TabView';
import Status from './StatusDetails';
import Map from './MapOverview';
import pos from '../../../images/pos.png';
import battery from '../../../images/battery.png';
import printer from '../../../images/printer.png';
import BarChart from '../../../components/BarChart';
import HandleGetApi from '../../../components/handleApi/HandleGetApi';


export default function TerminalView() {
  const [terminals, setTerminal] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  // const [date, setDate] = React.useState(new Date());
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
  },[reloadPage])
  

const Summary = () => {
  return (
    <div className='row ms-4'>
        <div className='col-3'>
          <div className='border w-75 h-100 p-2'>
            <div className='d-flex'>
              <h3 className='text-primary fs-6 me-auto'>Terminals</h3>
              <div>
                <img src={pos} alt='pos' style={{height: 20}}/>
              </div>
            </div>
            <div className='text-center'>
              <h4 className='fs-6'>Total</h4>
              <p className='fs-7 mb-1'>12,000</p>
            </div>
            <div className='d-flex justify-content-center fs-7'>
              <div className='text-end p-2'>
                <p className='mb-1'>Active</p>
                <p className='mb-1'>9000</p>
                <p className='mb-1'>95.7%</p>
              </div>
              <div className='text-start p-2'>
                <p className='mb-1'>Inactive</p>
                <p className='mb-1'>9000</p>
                <p className='mb-1'>95.7%</p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-3'>
          <div className='border w-75 h-100 p-2'>
            <div className='d-flex'>
              <h3 className='text-primary fs-6 me-auto'>Printer Status</h3>
              <div>
                <img src={printer} alt='printer' style={{height: 20}}/>
              </div>
            </div>
            <div className='text-center'>
              <h4 className='fs-6'>Total</h4>
              <p className='fs-7 mb-1'>12,000</p>
            </div>
            <div className='d-flex justify-content-center fs-7'>
              <div className='text-end p-2'>
                <p className='mb-1'>Active</p>
                <p className='mb-1'>9000</p>
                <p className='mb-1'>95.7%</p>
              </div>
              <div className='text-start p-2'>
                <p className='mb-1'>Inactive</p>
                <p className='mb-1'>9000</p>
                <p className='mb-1'>95.7%</p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-3'>
          <div className='border w-75 h-100 p-2'>
            <div className='d-flex'>
              <h3 className='text-primary fs-6 me-auto'>Battery</h3>
              <div>
                <img src={battery} alt='battery' style={{height: 20}}/>
              </div>
            </div>
            <div>
              <BarChart
              indexAxis = {'x'}
              />
            </div>
          </div>
        </div>
        <div className='col-3'>
          <div className='border w-75 h-100 p-2'>
            <div className='d-flex'>
              <h3 className='text-primary fs-6'>Signal</h3>
            </div>
            <div>
              <BarChart 
              indexAxis = {'y'}
              />
            </div>
          </div>
        </div>
      </div>
  )
};

const summary = <Summary />

const StatusDetails = <Status summary = {summary} terminals={terminals} pageStart = {pageStart} />;
const MapOverview = <Map summary = {summary} /> ;

const MerchantParam = <div></div>
  return (
    <div>
      <TabView 
               tabs={[
                {name: "Terminal status details", content: StatusDetails, param: MerchantParam, pageStart:pageStart, reloadPage: reloadPage},
                // {name: "Terminal map overview", content: MapOverview, param: MerchantParam}
               ]}
            />
    </div>
  )
};

