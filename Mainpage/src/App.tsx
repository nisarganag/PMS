import './App.css';
import Sidebar from './Components/Sidebar';
import {
  Route,
  Routes,
} from "react-router-dom";
import useLocalStorage from "use-local-storage";

import My_profile from "./routes/MyProfile/My-profile"
import Advanced_search from './routes/Advanced-search/Advances-search';
import My_library from './routes/MyLibrary/My-library';
import Settings from './routes/settings/settings';
import Alerts from './routes/Alerts/Alerts';
import Home from './routes/Homepage/Homepage';
import Login from './routes/LoginPage/Login';
import { FaMoon, FaSun } from 'react-icons/fa';
import ResultsPage from './routes/Homepage/results';
import AdvancedSearchResult from './routes/Advanced-search/Advanced-search-result';
import ResultsDetail from './routes/ResultsDetail';

function App() {
  
  
  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", preference);
  // const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", preference);
  return (
    <>
      <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <button className="mode-toggle" onClick={toggleMode} >
          {isDarkMode ? <FaSun className="sun-icon" /> : <FaMoon className="moon-icon" />}
        </button>
        

        <div className="content">
          <Sidebar />
          <div className="routes ">
            <Routes>
              <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/My_profile" element={<My_profile />} />
              <Route path="/Advanced_search" element={<Advanced_search />} />
              <Route path="/My_library" element={<My_library />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/Alerts" element={<Alerts />} />
              <Route path="/Home" element={<Home isDarkMode={isDarkMode} />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/AdvancedSearchResult" element={<AdvancedSearchResult />} />
              <Route path="/ResultsDetail/:title" element={<ResultsDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
