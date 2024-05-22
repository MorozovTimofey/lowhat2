import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import { Link } from "react-router-dom";

interface Genre {
  _id: string;
  genre_name: string;
  genre_image_url: string;
}

export const GenresComponent: React.FC = () => {
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
    <Panel className="h-full grid grid-cols-1 md:grid-cols-5 gap-6 p-6 content-start">
      {genres.map((genre) => (
        <Link
          to={`/track-page/${genre._id}`}
          key={genre._id}
          className="no-underline"
        >
          <Card className="flex flex-col items-center justify-between cursor-pointer shadow-lg rounded-lg transition-transform transform hover:scale-105">
            <img
              src={genre.genre_image_url}
              alt={genre.genre_name}
              className="rounded-t-lg w-full h-3/4 object-cover"
            />
            <div className="font-bold text-[16px] uppercase h-1/4 flex justify-center items-center">
              {genre.genre_name}
            </div>
          </Card>
        </Link>
      ))}
    </Panel>
  );
};
