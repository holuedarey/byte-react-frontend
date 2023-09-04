import React from 'react';
import './SameDay.css';
import MerchantConfig from './MerchantConfig';
import NewConfig from './CreateConfig';
import TabView from '../../../components/TabView';
import HandleGetApi from '../../../components/handleApi/HandleGetApi';


export default function SameDay() {
  const [configSettlements, setConfigSettlements] = React.useState([]);

  console.log("config", configSettlements);
  const merchantConfig = <MerchantConfig configSettlements={configSettlements}/>;
  const newConfig = <NewConfig />;

  React.useEffect(() => {
    HandleGetApi("config/settlements", setConfigSettlements)
  }, []);

  return (
    <div className='same-day'>
      <TabView 
               tabs={[
                {name: "Merchant Sameday Configuration", content: merchantConfig},
                {name: "New Configuration", content: newConfig}
               ]}
            />
    </div>
  )
}
