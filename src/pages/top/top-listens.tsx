import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import { MaterialSymbol } from "react-material-symbols";
import axios from "axios";
import { useEffect, useState } from "react";
import SongTable from "@/components/song-table";

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

export const TopListens = () => {
  const [songs, setSongs] = useState<SongData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopListenedSongs = async () => {
      try {
        const response = await axios.get<SongData[]>(
          `http://127.0.0.1:8000/tracks/`
        );
        const sortedSongs = response.data
          .sort((a, b) => b.listens - a.listens)
          .slice(0, 10);
        setSongs(sortedSongs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top listened songs:", error);
        setLoading(false);
      }
    };

    fetchTopListenedSongs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Panel className="h-full">
      <Card className="flex p-[15px] gap-[10px] items-center">
        <div className="w-[100px] h-[100px] flex items-center justify-center bg-[#1e2939] rounded-[15px]">
          <MaterialSymbol icon="headphones" className="text-white" size={24} />
        </div>
        <div className="font-semibold text-[24px]">
          Топ 10 песен по прослушиваниям:
        </div>
      </Card>
      <Card className="flex flex-col mt-[10px] p-[15px] gap-[10px]">
        <SongTable songs={songs} />
      </Card>
    </Panel>
  );
};
