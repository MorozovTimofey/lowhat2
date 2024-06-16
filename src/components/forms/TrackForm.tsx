import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Artist {
  _id: string;
  artist_name: string;
}

interface Album {
  _id: string;
  album_name: string;
}

interface Genre {
  _id: string;
  genre_name: string;
}

const TrackForm = ({
  artists,
  albums,
  genres,
  fetchArtists,
  fetchAlbums,
  fetchGenres,
}: {
  artists: Artist[];
  albums: Album[];
  genres: Genre[];
  fetchArtists: () => void;
  fetchAlbums: () => void;
  fetchGenres: () => void;
}) => {
  const [trackName, setTrackName] = useState<string>("");
  const [artistId, setArtistId] = useState<string>("");
  const [albumId, setAlbumId] = useState<string>("");
  const [genreId, setGenreId] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [trackMessage, setTrackMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Добавляем состояние для отслеживания загрузки

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("track_name", trackName);
    formData.append("artist_id", artistId);
    formData.append("album_id", albumId);
    formData.append("genre_id", genreId);
    formData.append("youtube_url", youtubeUrl);
    if (audioFile) formData.append("audio_file", audioFile);
    if (imageFile) formData.append("image_file", imageFile);

    try {
      setLoading(true); // Устанавливаем состояние загрузки в true перед отправкой запроса

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
        fetchArtists();
        fetchAlbums();
        fetchGenres();
      } else {
        setTrackMessage("Ошибка при добавлении трека.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setTrackMessage("Ошибка сети: " + error.message);
      } else {
        setTrackMessage("Произошла неизвестная ошибка");
      }
    } finally {
      setLoading(false); // Устанавливаем состояние загрузки в false после завершения запроса
    }
  };

  return (
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
          onChange={(e) =>
            setAudioFile(e.target.files ? e.target.files[0] : null)
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <Label>Изображение</Label>
        <input
          type="file"
          id="imageFile"
          onChange={(e) =>
            setImageFile(e.target.files ? e.target.files[0] : null)
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      {loading ? (
        <p className="mt-4 text-sm">Загрузка трека...</p>
      ) : (
        <>
          <Button type="submit">Добавить трек</Button>
          {trackMessage && (
            <p className="mt-4 text-sm text-red-500">{trackMessage}</p>
          )}
        </>
      )}
    </form>
  );
};

export default TrackForm;
