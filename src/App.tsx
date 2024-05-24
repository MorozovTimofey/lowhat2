import TrackPage from "@/pages/tracks/track-page";
import Track from "@/pages/tracks/track";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ArtistsPage } from "@/pages/artists/artists-page";
import { GenresComponent } from "./pages/genres/genrex";
import Header from "./components/header";
import { ThemeProvider } from "./components/theme-provider";
import { Artist } from "@/pages/artists/artist";
import { AlbumsPage } from "@/pages/albums/albums-page";
import { Album } from "@/pages/albums/album";
import { Genre } from "@/pages/genres/genre";
import { GenresPage } from "@/pages/genres/genres-page";

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header className="h-[7vh]" />
        <div className="h-[93vh] px-[20px] pb-[20px]">
          <Routes>
            <Route path="/" element={<GenresPage />} />
            <Route path="/albums" element={<AlbumsPage />} />
            <Route path="/albums/:album_id" element={<Album />} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/artists/:artist_id" element={<Artist />} />
            <Route path="/tracks/:id" element={<Track />} />
            <Route path="/genres/:genre_id" element={<Genre />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
