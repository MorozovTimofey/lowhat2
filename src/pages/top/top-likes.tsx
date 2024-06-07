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
import { MaterialSymbol } from "react-material-symbols";
import { Link } from "react-router-dom";

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

export const TopLikes = () => {
  const [songs, setSongs] = useState<SongData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopLikedSongs = async () => {
      try {
        const response = await axios.get<SongData[]>(
          `http://127.0.0.1:8000/tracks/`
        );
        const sortedSongs = response.data
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 10);
        setSongs(sortedSongs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top liked songs:", error);
        setLoading(false);
      }
    };

    fetchTopLikedSongs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Panel className="h-full">
      <Card className="flex p-[15px] gap-[10px] items-center">
        <div className="w-[100px] h-[100px] flex items-center justify-center bg-[#1e2939] rounded-[15px]">
          <MaterialSymbol icon="favorite" className="text-white" size={24} />
        </div>
        <div className="font-semibold text-[24px]">Топ 10 песен по лайкам:</div>
      </Card>
      <Card className="flex flex-col mt-[10px] p-[15px] gap-[10px]">
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
