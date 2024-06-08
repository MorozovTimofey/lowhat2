import SongTable from "@/components/song-table";
import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

interface GenreData {
  genre_name: string;
  genre_image_url: string;
}

export const Genre = () => {
  const { genre_id } = useParams<{ genre_id: string }>();
  const [genre, setGenre] = useState<GenreData | null>(null);
  const [songs, setSongs] = useState<SongData[]>([]);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await axios.get<GenreData>(
          `http://127.0.0.1:8000/genres/${genre_id}`
        );
        setGenre(response.data);
      } catch (error) {
        console.error("Error fetching genre:", error);
      }
    };

    const fetchSongs = async () => {
      try {
        const response = await axios.get<SongData[]>(
          `http://127.0.0.1:8000/genres/${genre_id}/songs`
        );
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchGenre();
    fetchSongs();
  }, [genre_id]);

  if (!genre) {
    return <div>Loading...</div>;
  }

  return (
    <Panel className="h-full">
      <Card className="flex p-[15px] gap-[10px] items-center">
        <img
          src={genre.genre_image_url}
          alt="Genre Cover"
          className="w-[100px] h-[100px] rounded-[20px]"
        />
        <div className="font-semibold text-[24px]">{genre.genre_name}</div>
      </Card>
      <Card className="flex flex-col mt-[10px] p-[15px] gap-[10px]">
        <SongTable songs={songs} />
      </Card>
    </Panel>
  );
};
