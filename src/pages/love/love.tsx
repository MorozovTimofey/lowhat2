import React, { useEffect, useState } from "react";
import SongTable from "@/components/song-table";
import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import { MaterialSymbol } from "react-material-symbols";

export const Love = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для получения информации о песне по её ID
    const fetchSongById = async (id) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/tracks/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return await response.json();
      } catch (error) {
        throw new Error(
          "Ошибка при получении данных о песне: " + error.message
        );
      }
    };

    // Функция для получения списка ID любимых песен и информации о них
    const fetchFavoriteSongs = async () => {
      try {
        const token = document.cookie
          .split(";")
          .find((cookie) => cookie.trim().startsWith("access_token="));
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await fetch("http://127.0.0.1:8000/users/favorites", {
          headers: {
            Authorization: `Bearer ${token.split("=")[1]}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const favoriteSongIds = await response.json();
        const songPromises = favoriteSongIds.map(fetchSongById);
        const songsData = await Promise.all(songPromises);
        setSongs(songsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteSongs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Panel className="h-full">
      <Card className="flex p-[15px] gap-[10px] items-center">
        <div className="w-[100px] h-[100px] flex items-center justify-center bg-[#1e2939] rounded-[15px]">
          <MaterialSymbol
            icon="favorite"
            className="text-white"
            size={24}
            fill
          />
        </div>
        <div className="font-semibold text-[24px]">Моя музыка</div>
      </Card>
      <Card className="flex flex-col mt-[10px] p-[15px] gap-[10px]">
        <SongTable songs={songs} />
      </Card>
    </Panel>
  );
};

export default Love;
