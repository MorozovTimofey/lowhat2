import { useState, useEffect } from "react";
import Panel from "@/components/ui/panel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Create = () => {
  // State for genres
  const [genreName, setGenreName] = useState("");
  const [genreImage, setGenreImage] = useState(null);
  const [genreMessage, setGenreMessage] = useState("");

  // State for artists
  const [artistName, setArtistName] = useState("");
  const [artistAvatar, setArtistAvatar] = useState(null);
  const [artistMessage, setArtistMessage] = useState("");

  // State for albums
  const [albumName, setAlbumName] = useState("");
  const [albumImage, setAlbumImage] = useState(null);
  const [albumMessage, setAlbumMessage] = useState("");

  // State for tracks
  const [trackName, setTrackName] = useState("");
  const [artistId, setArtistId] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [genreId, setGenreId] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [trackMessage, setTrackMessage] = useState("");

  // States for select options
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Fetch artists
    const fetchArtists = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/artists/");
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    // Fetch albums
    const fetchAlbums = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/albums/");
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    // Fetch genres
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/genres/");
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchArtists();
    fetchAlbums();
    fetchGenres();
  }, []);

  // Submit handler for genres
  const handleGenreSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("genre_name", genreName);
    formData.append("genre_image", genreImage);

    try {
      const response = await fetch("http://127.0.0.1:8000/genres/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setGenreMessage("Жанр успешно добавлен!");
        setGenreName("");
        setGenreImage(null);
        fetchGenres(); // Refresh genres list
      } else {
        setGenreMessage("Ошибка при добавлении жанра.");
      }
    } catch (error) {
      setGenreMessage("Ошибка сети: " + error.message);
    }
  };

  // Submit handler for artists
  const handleArtistSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("artist_name", artistName);
    formData.append("artist_avatar", artistAvatar);

    try {
      const response = await fetch("http://127.0.0.1:8000/artists/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setArtistMessage("Исполнитель успешно добавлен!");
        setArtistName("");
        setArtistAvatar(null);
        fetchArtists(); // Refresh artists list
      } else {
        setArtistMessage("Ошибка при добавлении исполнителя.");
      }
    } catch (error) {
      setArtistMessage("Ошибка сети: " + error.message);
    }
  };

  // Submit handler for albums
  const handleAlbumSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("album_name", albumName);
    formData.append("album_image", albumImage);

    try {
      const response = await fetch("http://127.0.0.1:8000/albums/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setAlbumMessage("Альбом успешно добавлен!");
        setAlbumName("");
        setAlbumImage(null);
        fetchAlbums(); // Refresh albums list
      } else {
        setAlbumMessage("Ошибка при добавлении альбома.");
      }
    } catch (error) {
      setAlbumMessage("Ошибка сети: " + error.message);
    }
  };

  // Submit handler for tracks
  const handleTrackSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("track_name", trackName);
    formData.append("artist_id", artistId);
    formData.append("album_id", albumId);
    formData.append("genre_id", genreId);
    formData.append("youtube_url", youtubeUrl);
    formData.append("audio_file", audioFile);
    formData.append("image_file", imageFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/tracks/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setTrackMessage("Трек успешно добавлен!");
        setTrackName("");
        setArtistId("");
        setAlbumId("");
        setGenreId("");
        setYoutubeUrl("");
        setAudioFile(null);
        setImageFile(null);
      } else {
        setTrackMessage("Ошибка при добавлении трека.");
      }
    } catch (error) {
      setTrackMessage("Ошибка сети: " + error.message);
    }
  };

  return (
    <Panel>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Добавить трек</AccordionTrigger>
          <AccordionContent>
            <form onSubmit={handleTrackSubmit}>
              <div className="mb-4">
                <Label>Название трека</Label>
                <Input
                  type="text"
                  id="trackName"
                  value={trackName}
                  onChange={(e) => setTrackName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <Label>Артист</Label>
                <div className="mb-4">
                  <select
                    id="artistSelect"
                    className="w-full p-2 border rounded-md bg-[#020817]"
                    onChange={(e) => setArtistId(e.target.value)}
                    required
                  >
                    <option value="">Выберите исполнителя</option>
                    {artists.map((artist) => (
                      <option key={artist._id} value={artist._id}>
                        {artist.artist_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <Label>Альбом</Label>
                <div className="mb-4">
                  <select
                    id="albumSelect"
                    className="w-full p-2 border rounded-md bg-[#020817]"
                    onChange={(e) => setAlbumId(e.target.value)}
                    required
                  >
                    <option value="">Выберите альбом</option>
                    {albums.map((album) => (
                      <option key={album._id} value={album._id}>
                        {album.album_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <Label>Жанр</Label>
                <div className="mb-4">
                  <select
                    id="genreSelect"
                    className="w-full p-2 border rounded-md bg-[#020817]"
                    onChange={(e) => setGenreId(e.target.value)}
                    required
                  >
                    <option value="">Выберите жанр</option>
                    {genres.map((genre) => (
                      <option key={genre._id} value={genre._id}>
                        {genre.genre_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <Label>Ссылка на YouTube</Label>
                <Input
                  type="text"
                  id="youtubeUrl"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label>Аудио файл</Label>
                <input
                  type="file"
                  id="audioFile"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <Label>Изображение</Label>
                <input
                  type="file"
                  id="imageFile"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <Button type="submit">Добавить трек</Button>
              {trackMessage && (
                <p className="mt-4 text-sm text-red-500">{trackMessage}</p>
              )}
            </form>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Добавить исполнителя</AccordionTrigger>
          <AccordionContent>
            <form onSubmit={handleArtistSubmit}>
              <div className="mb-4">
                <Label>Имя исполнителя</Label>
                <Input
                  type="text"
                  id="artistName"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <Label>Аватар исполнителя</Label>
                <input
                  type="file"
                  id="artistAvatar"
                  onChange={(e) => setArtistAvatar(e.target.files[0])}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <Button type="submit">Добавить исполнителя</Button>
              {artistMessage && (
                <p className="mt-4 text-sm text-red-500">{artistMessage}</p>
              )}
            </form>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Добавить альбом</AccordionTrigger>
          <AccordionContent>
            <form onSubmit={handleAlbumSubmit}>
              <div className="mb-4">
                <Label>Название альбома</Label>
                <Input
                  type="text"
                  id="albumName"
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <Label>Изображение альбома</Label>
                <input
                  type="file"
                  id="albumImage"
                  onChange={(e) => setAlbumImage(e.target.files[0])}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <Button type="submit">Добавить альбом</Button>
              {albumMessage && (
                <p className="mt-4 text-sm text-red-500">{albumMessage}</p>
              )}
            </form>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Добавить жанр</AccordionTrigger>
          <AccordionContent>
            <form onSubmit={handleGenreSubmit}>
              <div className="mb-4">
                <Label>Название жанра</Label>
                <Input
                  type="text"
                  id="genreName"
                  value={genreName}
                  onChange={(e) => setGenreName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <Label>Изображение жанра</Label>
                <input
                  type="file"
                  id="genreImage"
                  onChange={(e) => setGenreImage(e.target.files[0])}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <Button type="submit">Добавить жанр</Button>
              {genreMessage && (
                <p className="mt-4 text-sm text-red-500">{genreMessage}</p>
              )}
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Panel>
  );
};
