import './App.css';
import {BrowserRouter as Router, Routes, Route} from
'react-router-dom';
import TransactionDashboard from './views/transaction-dashboard/TransactionDashboard';
import MerchantManagement from './views/merchant-management/MerchantManagement';
import Settlements from './views/settlement/Settlements';
import DisputeResolution from './views/dispute-resolution/DisputeResolution';
import Configuration from './views/configuration/Configuration';
import Signin from './views/entrance/Signin';

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path='/' element={<Signin/>}/>
        <Route path='/transactions' element={<TransactionDashboard/>}/>
        <Route path='/merchant' element={<MerchantManagement/>}/>
        <Route path='/settlement' element={<Settlements/>}/>
        <Route path='/dispute' element={<DisputeResolution/>}/>
        <Route path='/config' element={<Configuration/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
