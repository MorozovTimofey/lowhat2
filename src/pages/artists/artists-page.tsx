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

export const ArtistsPage = () => {
  interface Artist {
    _id: string;
    artist_name: string;
    artist_avatar_s3_url: string;
  }

  const [artists, setArtists] = useState<Artist[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 10; // Количество артистов на одной странице

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get<Artist[]>(
          "http://127.0.0.1:8000/artists/"
        );
        setArtists(response.data);
        setFilteredArtists(response.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = artists.filter((artist) =>
      artist.artist_name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredArtists(filtered);
    setCurrentPage(1); // Сброс текущей страницы при новом поиске
  };

  // Вычисляем индексы для отображаемых артистов на текущей странице
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = filteredArtists.slice(
    indexOfFirstArtist,
    indexOfLastArtist
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Panel className="h-full p-6 content-start">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {currentArtists.map((artist) => (
          <Link
            to={`/artists/${artist._id}`}
            key={artist._id}
            className="no-underline"
          >
            <Card className="flex flex-col items-center justify-between cursor-pointer shadow-lg rounded-lg transition-transform transform hover:scale-105 w-full h-full">
              <img
                src={artist.artist_avatar_s3_url}
                alt={artist.artist_name}
                className="rounded-t-lg w-full object-cover"
                style={{ height: "200px" }}
              />
              <div className="font-bold text-[16px] uppercase flex justify-center items-center h-16 w-full">
                {artist.artist_name}
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
            length: Math.ceil(filteredArtists.length / artistsPerPage),
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
                currentPage < Math.ceil(filteredArtists.length / artistsPerPage)
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
