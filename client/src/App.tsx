import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TeamCrud from './components/TeamCrud';
import PlayerCrud from './components/PlayerCrud';
import LeagueCrud from './components/LeagueCrud';
import ManagerCrud from './components/ManagerCrud';





function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Player CRUD */}
        <Route path="/player-crud" element={<PlayerCrud />} />

        {/* Team CRUD */}
        <Route path="/team-crud" element={<TeamCrud />} />

        {/* League CRUD */}
        <Route path="/league-crud" element={<LeagueCrud />} />

        <Route path="/manager-crud" element={<ManagerCrud />} />


      </Routes>

      
    </Router>
  );
}

export default App;
