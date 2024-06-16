import React, { useEffect, useState } from "react";
import SongTable from "@/components/song-table";
import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import { MaterialSymbol } from "react-material-symbols";
import SearchBar from "@/components/SearchBar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SongData {
  _id: string;
  track_name: string;
  album_id: string;
  genre_id: string;
  listens: number;
  likes: number;
  audio_s3_url: string;
  image_s3_url: string;
  youtube_url: string;
}

export const Love = () => {
  const [songs, setSongs] = useState<SongData[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<SongData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10;

  useEffect(() => {
    const fetchSongById = async (id: string): Promise<SongData> => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/tracks/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return await response.json();
      } catch (error: any) {
        throw new Error(
          "Ошибка при получении данных о песне: " + error.message
        );
      }
    };

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
        const favoriteSongIds: string[] = await response.json();
        const songPromises = favoriteSongIds.map(fetchSongById);
        const songsData = await Promise.all(songPromises);
        setSongs(songsData);
        setFilteredSongs(songsData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteSongs();
  }, []);

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = songs.filter((song) =>
      song.track_name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredSongs(filtered);
    setCurrentPage(1); // Сброс на первую страницу при поиске
  };

  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
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
        <SearchBar onSearch={handleSearch} />
        <SongTable songs={currentSongs} />
        <Pagination className="mt-4 cursor-pointer">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            />
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() =>
                paginate(
                  currentPage < totalPages ? currentPage + 1 : currentPage
                )
              }
            />
          </PaginationContent>
        </Pagination>
      </Card>
    </Panel>
  );
};

export default Love;
