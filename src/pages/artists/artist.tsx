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

interface ArtistData {
  artist_name: string;
  artist_avatar_s3_url: string;
}

export const Artist = () => {
  const { artist_id } = useParams<{ artist_id: string }>();
  const [artist, setArtist] = useState<ArtistData | null>(null);
  const [songs, setSongs] = useState<SongData[]>([]);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get<ArtistData>(
          `http://127.0.0.1:8000/artists/${artist_id}`
        );
        setArtist(response.data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };

    const fetchSongs = async () => {
      try {
        const response = await axios.get<SongData[]>(
          `http://127.0.0.1:8000/artists/${artist_id}/songs`
        );
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchArtist();
    fetchSongs();
  }, [artist_id]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <Panel className="h-full">
      <Card className="flex p-[15px] gap-[10px] items-center">
        <img
          src={artist.artist_avatar_s3_url}
          alt="Artist Avatar"
          className="w-[100px] h-[100px] rounded-[20px]"
        />
        <div>
          <div className="font-semibold text-[24px]">{artist.artist_name}</div>
        </div>
      </Card>
      <Card className="flex flex-col mt-[10px] p-[15px] gap-[10px]">
        <SongTable songs={songs} />
      </Card>
    </Panel>
  );
};
