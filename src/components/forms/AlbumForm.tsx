import React, { useState, FormEvent, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AlbumFormProps {
  fetchAlbums: () => void;
}

const AlbumForm: React.FC<AlbumFormProps> = ({ fetchAlbums }) => {
  const [albumName, setAlbumName] = useState<string>("");
  const [albumImage, setAlbumImage] = useState<File | null>(null);
  const [albumMessage, setAlbumMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAlbumSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (albumImage) {
      formData.append("album_image", albumImage);
    } else {
      setAlbumMessage("Пожалуйста, выберите изображение альбома.");
      return;
    }

    try {
      setLoading(true); // Устанавливаем состояние загрузки в true перед отправкой запроса

      const response = await fetch(
        `http://127.0.0.1:8000/albums/?album_name=${albumName}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setAlbumMessage("Альбом успешно добавлен!");
        setAlbumName("");
        setAlbumImage(null);
        fetchAlbums();
      } else {
        setAlbumMessage("Ошибка при добавлении альбома.");
      }
    } catch (error) {
      setAlbumMessage("Ошибка сети: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAlbumImage(e.target.files[0]);
    }
  };

  return (
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
          onChange={handleImageChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      {loading ? (
        <p className="mt-4 text-sm">Загрузка альбома...</p>
      ) : (
        <Button type="submit">Добавить альбом</Button>
      )}
      {albumMessage && (
        <p className="mt-4 text-sm text-red-500">{albumMessage}</p>
      )}
    </form>
  );
};

export default AlbumForm;
