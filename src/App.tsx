import TrackPage from "@/pages/tracks/track-page";
import AlbumPage from "@/pages/album-page";
import Track from "@/pages/tracks/track";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tracks" element={<TrackPage />} />
        <Route path="/albums" element={<AlbumPage />} />
        <Route path="/tracks/:id" element={<Track />} />
      </Routes>
    </Router>
  );
}

export default App;
