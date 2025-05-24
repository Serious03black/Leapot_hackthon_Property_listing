// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VoiceListingTool from './pages/VoiceListingTool';
import ListingPreview from './pages/ListingPreview';
import Navbar from "./components/NavBar";

function App() {
  return (
    <div className="app">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-listing" element={<VoiceListingTool />} />
        <Route path="/preview" element={<ListingPreview />} />
      </Routes>
    </div>
  );
}

export default App;