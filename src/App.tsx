import { createContext, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Main from './screens/main/Main';
import Podcast from './screens/podcast/Podcast';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Episode from './screens/episode/Episode';

export const LoadingContext = createContext(
  {
    loading: false,
    setLoading: (loading: boolean) => {}
  }
)

function App() {

  const [loading, setLoading] = useState(false);
  
  return (
    <Router>
      <LoadingContext.Provider value={{loading, setLoading}}>
        <Header />
        <Routes>
          <Route path="/"  Component={Main} />
          <Route path="/podcast/:podcastId"  Component={Podcast} />
          <Route path="/podcast/:podcastId/episode/:episodeId"  Component={Episode} />
        </Routes>
      </LoadingContext.Provider>
    </Router>
  );
}

export default App;
