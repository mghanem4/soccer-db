import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TeamCrud from './components/TeamCrud';
import PlayerCrud from './components/PlayerCrud';
import LeagueCrud from './components/LeagueCrud';
import ManagerCrud from './components/ManagerCrud';
import PlayerStatsPage from './components/PlayerStatsPage';
import LeagueStatsPage from './components/LeagueStatsPage';





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

        <Route path="/player-stats" element={<PlayerStatsPage />} />


        <Route path="/league-stats" element={<LeagueStatsPage />} />


      </Routes>

      
    </Router>
  );
}

export default App;
