import React from 'react';
import TabView from '../../../components/TabView';
import UploadTerminal from './UploadTerminal';
import EditTerminal from './EditTerminal';
import CreateTerminal from './CreateTerminal'

const Upload = <UploadTerminal />;
const Edit = <EditTerminal />;
const Create = <CreateTerminal />

export default function Terminal() {
  return (
    <div>
      <TabView 
      tabs = {[
        {name: "Upload Terminal File", content: Upload },
        {name: "New Terminal Configuration", content: Create },
        {name: "Edit Terminal Configuration", content: Edit }
      ]}
      />
    </div>
  )
}
