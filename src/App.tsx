import TrackPage from "@/pages/tracks/track-page";
import AlbumPage from "@/pages/album-page";
import Track from "@/pages/tracks/track";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ArtistsPage } from "@/pages/artists/artists-page";
import { GenresComponent } from "./pages/genres/genrex";
import Header from "./components/header";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header className="h-[7vh]" />
        <div className="h-[93vh] px-[20px] pb-[20px]">
          <Routes>
            <Route path="/" element={<GenresComponent />} />
            <Route path="/albums" element={<AlbumPage />} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/tracks/:id" element={<Track />} />
            <Route path="/track-page/:genreId" element={<TrackPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
