import SongTable from "@/components/song-table";
import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        <SongTable songs={songs} />
      </Card>
    </Panel>
  );
};
