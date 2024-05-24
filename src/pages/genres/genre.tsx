import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
          alt="genre Cover"
          className="w-[100px] h-[100px] rounded-[20px]"
        />
        <div className="font-semibold text-[24px]">{genre.genre_name}</div>
      </Card>
      <Card className="flex flex-col mt-[10px] p-[15px] gap-[10px]">
        <div className="font-semibold text-[24px]">Песни:</div>

        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[5%] text-center">Обложка</TableHead>
              <TableHead className="w-[60%]">Название</TableHead>
              <TableHead className="w-[5%] text-center">
                Прослушиваний
              </TableHead>
              <TableHead className="w-[5%] text-center">Лайки</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="cursor-pointer">
            {songs.map((song) => (
              <TableRow key={song._id}>
                <TableCell className="text-center">
                  <img
                    src={song.image_s3_url}
                    alt="Song Cover"
                    className="w-[50px] h-[50px] rounded-[10px] mx-auto"
                  />
                </TableCell>
                <TableCell>
                  <Link to={`/tracks/${song._id}`}>{song.track_name}</Link>
                </TableCell>
                <TableCell className="text-center">{song.listens}</TableCell>
                <TableCell className="text-center">{song.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Panel>
  );
};
