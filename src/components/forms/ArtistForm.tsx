import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ArtistForm = ({ fetchArtists }: { fetchArtists: () => void }) => {
  const [artistName, setArtistName] = useState<string>("");
  const [artistAvatar, setArtistAvatar] = useState<File | null>(null);
  const [artistMessage, setArtistMessage] = useState<string>("");

  const handleArtistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("artist_name", artistName);
    formData.append("artist_avatar", artistAvatar || "");

    try {
      const response = await fetch("http://127.0.0.1:8000/artists/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setArtistMessage("Исполнитель успешно добавлен!");
        setArtistName("");
        setArtistAvatar(null);
        fetchArtists();
      } else {
        setArtistMessage("Ошибка при добавлении исполнителя.");
      }
    } catch (error: any) {
      setArtistMessage("Ошибка сети: " + error.message);
    }
  };

  return (
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
          onChange={(e) =>
            setArtistAvatar(e.target.files ? e.target.files[0] : null)
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <Button type="submit">Добавить исполнителя</Button>
      {artistMessage && (
        <p className="mt-4 text-sm text-red-500">{artistMessage}</p>
      )}
    </form>
  );
};

export default ArtistForm;
