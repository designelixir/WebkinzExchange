
import './styles/App.css';
import Header from './Header';
import HeroHome from './HeroHome';
import TradesPage from './TradesPage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";



function App() {
  return (
    <Router>
      <div className="app">
        {/* Always Shows Header Navigation Bar */}
        <Header></Header>
        <Routes>
          {/* Homepage */}
          <Route path = "/" element={[ <HeroHome />, <h1>Welcome</h1>]} />
          {/* Trades */}
          <Route path="/trades" element={[<TradesPage />]} />
          
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
