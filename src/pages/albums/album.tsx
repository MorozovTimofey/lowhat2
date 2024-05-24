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

export const Album = () => {
  const { album_id } = useParams<{ album_id: string }>();
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [songs, setSongs] = useState<SongData[]>([]);

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
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchAlbum();
    fetchSongs();
  }, [album_id]);

  if (!album) {
    return <div>Loading...</div>;
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
