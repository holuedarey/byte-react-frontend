import React from 'react';
import TabView from '../../../components/TabView';
import Audit from './Audit';
import Management from './Management';
import Transaction from './Transaction';

const transaction = <Transaction />;
const management = <Management />;
const audit = <Audit />

export default function DisputeReport() {
  return (
    <div>
      <TabView
      tabs = {[
        {name: "Transactions", content: transaction },
        {name: "Dispute Management", content: management },
        {name: "Audit Trial", content: audit }
      ]}
      />
    </div>
  )
}
