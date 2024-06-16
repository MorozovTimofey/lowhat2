import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import SongTable from "@/components/song-table";
import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AlbumData {
  _id: string;
  album_name: string;
  album_image_s3_url: string;
}

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

export const Album = () => {
  const { album_id } = useParams<{ album_id: string }>();
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [songs, setSongs] = useState<SongData[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<SongData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10;

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get<AlbumData>(
          `http://127.0.0.1:8000/albums/${album_id}`
        );
        setAlbum(response.data);
      } catch (error) {
        console.error("Error fetching album:", error);
      }
    };

    const fetchSongs = async () => {
      try {
        const response = await axios.get<SongData[]>(
          `http://127.0.0.1:8000/albums/${album_id}/songs`
        );
        setSongs(response.data);
        setFilteredSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchAlbum();
    fetchSongs();
  }, [album_id]);

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = songs.filter((song) =>
      song.track_name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredSongs(filtered);
    setCurrentPage(1); // Сбрасываем на первую страницу при новом поиске
  };

  // Получаем текущие песни для отображения на странице
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (!album) {
    return <div>Загрузка...</div>;
  }

  return (
    <Panel className="h-full">
      <Card className="flex p-[15px] gap-[10px] items-center">
        <img
          src={album.album_image_s3_url}
          alt="Album Cover"
          className="w-[100px] h-[100px] rounded-[20px]"
        />
        <div>
          <div className="font-semibold text-[24px]">{album.album_name}</div>
        </div>
      </Card>
      <Card className="flex flex-col mt-[10px] p-[15px] gap-[10px]">
        <SearchBar onSearch={handleSearch} />
        <SongTable songs={currentSongs} />
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            />
            {Array.from({
              length: Math.ceil(filteredSongs.length / songsPerPage),
            }).map((_, index) => (
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
                  currentPage < Math.ceil(filteredSongs.length / songsPerPage)
                    ? currentPage + 1
                    : currentPage
                )
              }
            />
          </PaginationContent>
        </Pagination>
      </Card>
    </Panel>
  );
};

export default Album;
