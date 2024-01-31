import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Login from './components/login';
import Create from './components/create';
import Read from './components/read';
import Update from './components/userUpdate';
import ItemInventory from './components/itemInventory';
import CreateItem from './components/createItem';
import { AuthProvider } from './components/userContex';
import NavigationMenu from './components/navigationMenu';
import ItemDetails from './components/itemDetails';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
     
        <div className="main">
        <h2 className="main-header">React Crud Operations</h2>
        <NavigationMenu />
          {/* Routes */}
          <Routes>
            {/* Default route for the root path */}
            <Route path='/' element={<Login />} />

            {/* Other routes */}
            <Route path='/create' element={<Create />} />
            <Route path='/read' element={<Read />} />
            <Route path='/update' element={<Update />} />
            <Route path='/itemInventory' element={<ItemInventory />} />
            <Route path='/createItem' element={<CreateItem />} />
            <Route path="/itemDetails/:itemId" element={<ItemDetails />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;