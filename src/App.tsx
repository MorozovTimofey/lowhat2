import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Track from "@/pages/tracks/track";
import { ArtistsPage } from "@/pages/artists/artists-page";
import Header from "./components/header";
import { ThemeProvider } from "./components/theme-provider";
import { Artist } from "@/pages/artists/artist";
import { AlbumsPage } from "@/pages/albums/albums-page";
import { Album } from "@/pages/albums/album";
import { Genre } from "@/pages/genres/genre";
import { GenresPage } from "@/pages/genres/genres-page";
import { Login } from "./pages/login/login";
import { Registration } from "./pages/login/registration";
import { Admin } from "./pages/admin/admin";
import { Create } from "./pages/admin/create";
import { Edit } from "./pages/admin/edit";
import { Delete } from "./pages/admin/delete";
import { Top } from "./pages/top/top";
import { TopLikes } from "./pages/top/top-likes";
import { TopListens } from "./pages/top/top-listens";
import { Love } from "./pages/love/love";
import { EditArtist } from "./pages/edit/EditArtist";

function Layout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/registration";

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {!isAuthPage && <Header className="h-[7vh]" />}
      <div className={!isAuthPage ? "h-[93vh] px-[20px] pb-[20px]" : "h-full"}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/top" element={<Top />} />
          <Route path="/love" element={<Love />} />
          <Route path="/admin/edit/artist" element={<EditArtist />} />
          <Route path="/top/likes" element={<TopLikes />} />
          <Route path="/top/listens" element={<TopListens />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/create" element={<Create />} />
          <Route path="/admin/edit" element={<Edit />} />
          <Route path="/admin/delete" element={<Delete />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/albums" element={<AlbumsPage />} />
          <Route path="/albums/:album_id" element={<Album />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/artists/:artist_id" element={<Artist />} />
          <Route path="/tracks/:id" element={<Track />} />
          <Route path="/genres/:genre_id" element={<Genre />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
