import React, { useState, useEffect } from "react";
import Panel from "@/components/ui/panel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

// Определение интерфейсов для данных
interface Track {
  _id: string;
  track_name: string;
}

interface Album {
  _id: string;
  album_name: string;
}

interface Artist {
  _id: string;
  artist_name: string;
}

interface Genre {
  _id: string;
  genre_name: string;
}

export const Delete = () => {
  const [tracks, setTracks] = useState<Track[]>([]); // Состояние для хранения треков
  const [albums, setAlbums] = useState<Album[]>([]); // Состояние для хранения альбомов
  const [artists, setArtists] = useState<Artist[]>([]); // Состояние для хранения исполнителей
  const [genres, setGenres] = useState<Genre[]>([]); // Состояние для хранения жанров
  const [message, setMessage] = useState(""); // Сообщение об успешном удалении или ошибке

  const [selectedTrack, setSelectedTrack] = useState<string>(""); // Выбранный трек
  const [selectedAlbum, setSelectedAlbum] = useState<string>(""); // Выбранный альбом
  const [selectedArtist, setSelectedArtist] = useState<string>(""); // Выбранный исполнитель
  const [selectedGenre, setSelectedGenre] = useState<string>(""); // Выбранный жанр

  // Функция для загрузки треков с сервера
  const fetchTracks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/tracks/");
      if (response.ok) {
        const data: Track[] = await response.json();
        setTracks(data);
      } else {
        console.error("Error fetching tracks:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // Функция для загрузки альбомов с сервера
  const fetchAlbums = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/albums/");
      if (response.ok) {
        const data: Album[] = await response.json();
        setAlbums(data);
      } else {
        console.error("Error fetching albums:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // Функция для загрузки исполнителей с сервера
  const fetchArtists = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/artists/");
      if (response.ok) {
        const data: Artist[] = await response.json();
        setArtists(data);
      } else {
        console.error("Error fetching artists:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // Функция для загрузки жанров с сервера
  const fetchGenres = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/genres/");
      if (response.ok) {
        const data: Genre[] = await response.json();
        setGenres(data);
      } else {
        console.error("Error fetching genres:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // Вызываем все функции загрузки при загрузке компонента
  useEffect(() => {
    fetchTracks();
    fetchAlbums();
    fetchArtists();
    fetchGenres();
  }, []);

  // Функция для удаления элемента
  const handleDelete = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (response.ok) {
        setMessage("Элемент успешно удален!");
      } else {
        setMessage("Ошибка при удалении элемента.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage("Ошибка сети: " + error.message);
      } else {
        setMessage("Неизвестная ошибка.");
      }
    }
  };

  return (
    <Panel>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Удалить трек</AccordionTrigger>
          <AccordionContent>
            <div className="mb-4">
              <label htmlFor="trackSelect">Выберите трек:</label>
              <select
                id="trackSelect"
                className="w-full p-2 border rounded-md bg-[#020817]"
                onChange={(e) => setSelectedTrack(e.target.value)}
                value={selectedTrack}
                required
              >
                <option value="">Выберите трек</option>
                {tracks.map((track) => (
                  <option key={track._id} value={track._id}>
                    {track.track_name}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={() =>
                handleDelete(`http://127.0.0.1:8000/tracks/${selectedTrack}`)
              }
            >
              Удалить трек
            </Button>
            {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Удалить альбом</AccordionTrigger>
          <AccordionContent>
            <div className="mb-4">
              <label htmlFor="albumSelect">Выберите альбом:</label>
              <select
                id="albumSelect"
                className="w-full p-2 border rounded-md bg-[#020817]"
                onChange={(e) => setSelectedAlbum(e.target.value)}
                value={selectedAlbum}
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
            <Button
              onClick={() =>
                handleDelete(`http://127.0.0.1:8000/albums/${selectedAlbum}`)
              }
            >
              Удалить альбом
            </Button>
            {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Удалить исполнителя</AccordionTrigger>
          <AccordionContent>
            <div className="mb-4">
              <label htmlFor="artistSelect">Выберите исполнителя:</label>
              <select
                id="artistSelect"
                className="w-full p-2 border rounded-md bg-[#020817]"
                onChange={(e) => setSelectedArtist(e.target.value)}
                value={selectedArtist}
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
            <Button
              onClick={() =>
                handleDelete(`http://127.0.0.1:8000/artists/${selectedArtist}`)
              }
            >
              Удалить исполнителя
            </Button>
            {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Удалить жанр</AccordionTrigger>
          <AccordionContent>
            <div className="mb-4">
              <label htmlFor="genreSelect">Выберите жанр:</label>
              <select
                id="genreSelect"
                className="w-full p-2 border rounded-md bg-[#020817]"
                onChange={(e) => setSelectedGenre(e.target.value)}
                value={selectedGenre}
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
            <Button
              onClick={() =>
                handleDelete(`http://127.0.0.1:8000/genres/${selectedGenre}`)
              }
            >
              Удалить жанр
            </Button>
            {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Panel>
  );
};
