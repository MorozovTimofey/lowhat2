import React, { useState, FormEvent, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GenreFormProps {
  fetchGenres: () => void;
}

const GenreForm: React.FC<GenreFormProps> = ({ fetchGenres }) => {
  const [genreName, setGenreName] = useState("");
  const [genreImage, setGenreImage] = useState<File | null>(null);
  const [genreMessage, setGenreMessage] = useState("");
  const [loading, setLoading] = useState(false); // Добавляем состояние для отслеживания загрузки

  const handleGenreSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("genre_name", genreName);
    if (genreImage) {
      formData.append("genre_image", genreImage);
    }

    try {
      setLoading(true); // Устанавливаем состояние загрузки в true перед отправкой запроса

      const response = await fetch("http://127.0.0.1:8000/genres/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setGenreMessage("Жанр успешно добавлен!");
        setGenreName("");
        setGenreImage(null);
        fetchGenres();
      } else {
        setGenreMessage("Ошибка при добавлении жанра.");
      }
    } catch (error: any) {
      setGenreMessage("Ошибка сети: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGenreImage(e.target.files[0]);
    }
  };

  return (
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
          onChange={handleGenreImageChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      {loading ? (
        <p className="mt-4 text-sm">Загрузка жанра...</p>
      ) : (
        <Button type="submit">Добавить жанр</Button>
      )}
      {genreMessage && (
        <p className="mt-4 text-sm text-red-500">{genreMessage}</p>
      )}
    </form>
  );
};

export default GenreForm;
