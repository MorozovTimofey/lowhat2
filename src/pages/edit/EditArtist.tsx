import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Panel from "@/components/ui/panel";
import { Label } from "@/components/ui/label";

interface Artist {
  artist_id: string;
  artist_name: string;
  artist_avatar: File | null;
}

export const EditArtist = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [artist, setArtist] = useState<Artist>({
    artist_id: "",
    artist_name: "",
    artist_avatar: null,
  });

  const fetchArtists = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/artists/");
      if (!response.ok) {
        throw new Error("Failed to fetch artists");
      }
      const data = await response.json();
      setArtists(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleArtistChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const artistId = e.target.value;
    const selectedArtist = artists.find(
      (artist) => artist.artist_id === String(artistId)
    );
    if (selectedArtist) {
      setSelectedArtist(selectedArtist);
      setArtist(selectedArtist);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArtist({ ...artist, artist_name: e.target.value });
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArtist({ ...artist, artist_avatar: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("artist_name", artist.artist_name);
      if (artist.artist_avatar) {
        formData.append("artist_avatar", artist.artist_avatar);
      }

      const response = await fetch(
        `http://127.0.0.1:8000/artists/${selectedArtist?.artist_id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update artist");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <Panel className="h-full p-4 bg-gray-100 rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label>Выберите исполнителя</Label>
          <select
            value={selectedArtist ? selectedArtist.artist_id : ""}
            onChange={handleArtistChange}
            className="w-full p-2 border rounded-md bg-[#020817] text-white"
          >
            <option value="">Выберите исполнителя</option>
            {artists.map((artist) => (
              <option key={artist.artist_id} value={artist.artist_id}>
                {artist.artist_name}
              </option>
            ))}
          </select>
        </div>
        {selectedArtist && (
          <div>
            <div className="mb-4">
              <Label>Имя исполнителя</Label>
              <input
                type="text"
                value={artist.artist_name}
                onChange={handleNameChange}
                className="w-full p-2 border rounded-md bg-[#020817] text-white"
              />
            </div>
            <div className="mb-4">
              <Label>Аватар исполнителя</Label>
              <input
                type="file"
                onChange={handleAvatarChange}
                className="w-full p-2 border rounded-md bg-[#020817] text-white"
              />
            </div>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Сохранить изменения
        </button>
      </form>
    </Panel>
  );
};
