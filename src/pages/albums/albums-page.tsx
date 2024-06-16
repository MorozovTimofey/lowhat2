import SearchBar from "@/components/SearchBar";
import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const AlbumsPage = () => {
  interface Album {
    _id: string;
    album_name: string;
    album_image_s3_url: string;
  }

  const [albums, setAlbums] = useState<Album[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 10; // Количество альбомов на одной странице

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get<Album[]>(
          "http://127.0.0.1:8000/albums/"
        );
        setAlbums(response.data);
        setFilteredAlbums(response.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = albums.filter((album) =>
      album.album_name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredAlbums(filtered);
    setCurrentPage(1); // Сброс текущей страницы при новом поиске
  };

  // Вычисляем индексы для отображаемых альбомов на текущей странице
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = filteredAlbums.slice(
    indexOfFirstAlbum,
    indexOfLastAlbum
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Panel className="h-full p-6 content-start">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {currentAlbums.map((album) => (
          <Link
            to={`/albums/${album._id}`}
            key={album._id}
            className="no-underline"
          >
            <Card className="flex flex-col items-center justify-between cursor-pointer shadow-lg rounded-lg transition-transform transform hover:scale-105 w-full h-full">
              <img
                src={album.album_image_s3_url}
                alt={album.album_name}
                className="rounded-t-lg w-full object-cover"
                style={{ height: "200px" }}
              />
              <div className="font-bold text-[16px] uppercase flex justify-center items-center h-16 w-full">
                {album.album_name}
              </div>
            </Card>
          </Link>
        ))}
      </div>
      {/* Пагинация */}
      <Pagination className="mt-4 cursor-pointer">
        <PaginationContent>
          <PaginationPrevious
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
          />
          {Array.from({
            length: Math.ceil(filteredAlbums.length / albumsPerPage),
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
                currentPage < Math.ceil(filteredAlbums.length / albumsPerPage)
                  ? currentPage + 1
                  : currentPage
              )
            }
          />
        </PaginationContent>
      </Pagination>
    </Panel>
  );
};
