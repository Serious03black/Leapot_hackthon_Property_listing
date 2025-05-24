import react,{ useState } from 'react'
import VoiceListingTool from './pages/VoiceListingTool'
import ListingPreview from './pages/ListingPreview'
import HomePage from './pages/HomePage'

function App() {
  

  return (
     <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-listing" element={<VoiceListingTool />} />
        <Route path="/preview" element={<ListingPreview />} />
      </Routes>
    </Router>
  )
}

export default App
