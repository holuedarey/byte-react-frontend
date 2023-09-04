import React from 'react';
import TabView from '../../../components/TabView';
import CreateDisputeSwitch from './CreateDisputeSwitch';
import EditDisputeSwitch from './EditDisputeSwitch';

const newSwitch = <CreateDisputeSwitch />;
const editSwitch = <EditDisputeSwitch />

export default function DisputeSwitch() {
  return (
    <div>
      <TabView
               tabs={[
                {name: "New Switch Configuration", content: newSwitch},
                {name: "Edit Switch Configuration", content: editSwitch}
               ]}
            />
    </div>
  )
}
