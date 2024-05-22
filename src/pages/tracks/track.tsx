import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Panel from "@/components/ui/panel";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Player from "@/components/player";

interface Track {
  _id: string;
  image_s3_url: string;
  track_name: string;
  artist: string;
  youtube_url?: string;
  audio_s3_url: string;
}

interface Artist {
  _id: string;
  artist_name: string;
  artist_avatar_s3_url?: string;
}

const Track = () => {
  const { id } = useParams();
  const [track, setTrack] = useState<Track | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get<Track>(
          `http://127.0.0.1:8000/tracks/${id}`
        );
        setTrack(response.data);
        fetchArtist(response.data.artist);
        setAudio(new Audio(response.data.audio_s3_url));
      } catch (error) {
        console.error("Error fetching track:", error);
      }
    };

    fetchTrack();
  }, [id]);

  const fetchArtist = async (artistId: string) => {
    try {
      const response = await axios.get<Artist>(
        `http://127.0.0.1:8000/artists/${artistId}`
      );
      setArtist(response.data);
    } catch (error) {
      console.error("Error fetching artist:", error);
    }
  };

  if (!track || !artist || !audio) {
    return <div>Loading...</div>;
  }

  return (
    <Panel className="h-[100%] gap-[14px]">
      <Card className="flex p-[15px] gap-[10px] items-center">
        <img
          src={track.image_s3_url}
          alt="Track Image"
          className="w-[100px] h-[100px] rounded-[20px]"
        />
        <div>
          <div className="font-semibold text-[24px]">{track.track_name}</div>
          <Label>{artist.artist_name}</Label>
        </div>
      </Card>
      <Card>
        <Player selectedTrack={track} />
      </Card>
      <Card className="p-[15px]">
        {track.youtube_url ? (
          <iframe
            width="560"
            height="315"
            src={track.youtube_url}
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <div>Клип отсутствует</div>
        )}
      </Card>
    </Panel>
  );
};

export default Track;
