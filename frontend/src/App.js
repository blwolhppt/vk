import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<NewsList/>} />
        <Route path="/news/:id" element={<NewsDetail/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;