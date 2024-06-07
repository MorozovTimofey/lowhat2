import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const GenresPage = () => {
  interface Genre {
    _id: string;
    genre_name: string;
    genre_image_url: string;
  }

  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get<Genre[]>(
          "http://127.0.0.1:8000/genres/"
        );
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <Panel className="h-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6 p-6 content-start">
      {genres.map((genre) => (
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
    </Panel>
  );
};
