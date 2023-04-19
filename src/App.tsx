import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import Main from './screens/main/Main';
import Podcast from './screens/podcast/Podcast';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Episode from './screens/episode/Episode';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/"  Component={Main} />
        <Route path="/podcast/:podcastId"  Component={Podcast} />
        <Route path="/podcast/:podcastId/episode/:episodeId"  Component={Episode} />
      </Routes>
    </Router>
  );
}

export default App;
