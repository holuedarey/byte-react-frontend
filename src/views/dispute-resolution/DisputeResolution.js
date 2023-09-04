import React from 'react';
import DropdownMenu from '../../components/DropdownMenu';
import Navbar from '../../components/navbar/Navbar';
import Audit from './audit/Audit';
import DisputeReport from './dispute-report/DisputeReport';


const disputeReport = <DisputeReport/>;
const audit = <Audit/>;

export default function DisputeResolution() {
  return (
    <div>
      <Navbar />
      <div className='container-fluid p-5'>
        <DropdownMenu
         label = "Dispute"
         items = {[
          {name: "Report", content: disputeReport},
          {name: "Audit Trial", content: audit}
         ]}
        />
      </div>
    </div>
  )
}
