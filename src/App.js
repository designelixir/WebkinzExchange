import './styles/styles.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Auth} from "./pages/auth/index"

import {signInWithGoogle} from './pages/auth/index'
import {Home} from './pages/home/index'
import {Profile} from './pages/profile/index'
import {Items} from './pages/items/index'
import {Header} from './components/Header'

function App() {
  return (
    <>

    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />}/>
          
          <Route path="/profile" element={<Profile />}/>
          <Route path="/items" element={<Items />}/>
          
        </Routes>
      </Router>
      
    
    </div>
    
    </>
  );
}

export default App;
