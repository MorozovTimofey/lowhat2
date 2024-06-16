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

export const GenresPage = () => {
  interface Genre {
    _id: string;
    genre_name: string;
    genre_image_url: string;
  }

  const [genres, setGenres] = useState<Genre[]>([]);
  const [filteredGenres, setFilteredGenres] = useState<Genre[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const genresPerPage = 10;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get<Genre[]>(
          "http://127.0.0.1:8000/genres/"
        );
        setGenres(response.data);
        setFilteredGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = genres.filter((genre) =>
      genre.genre_name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredGenres(filtered);
    setCurrentPage(1); // Сброс текущей страницы при новом поиске
  };

  // Вычисляем индексы для отображаемых жанров на текущей странице
  const indexOfLastGenre = currentPage * genresPerPage;
  const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
  const currentGenres = filteredGenres.slice(
    indexOfFirstGenre,
    indexOfLastGenre
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Panel className="h-full p-6 content-start">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6">
        {currentGenres.map((genre) => (
          <Link
            to={`/genres/${genre._id}`}
            key={genre._id}
            className="no-underline"
          >
            <Card className="flex flex-col items-center justify-between cursor-pointer shadow-lg rounded-lg transition-transform transform hover:scale-105 w-full h-full">
              <img
                src={genre.genre_image_url}
                alt={genre.genre_name}
                className="rounded-t-lg w-full object-cover"
                style={{ height: "200px" }}
              />
              <div className="font-bold text-[16px] uppercase flex justify-center items-center h-16 w-full">
                {genre.genre_name}
              </div>
            </Card>
          </Link>
        ))}
      </div>
      {/* Пагинация */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationPrevious
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
          />
          {Array.from({
            length: Math.ceil(filteredGenres.length / genresPerPage),
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
                currentPage < Math.ceil(filteredGenres.length / genresPerPage)
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
