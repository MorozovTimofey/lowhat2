import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
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

const Track = () => {
  const { id } = useParams();
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get<Track>(
          `http://127.0.0.1:8000/tracks/${id}`
        );
        setTrack(response.data);
      } catch (error) {
        console.error("Error fetching track:", error);
      }
    };

    fetchTrack();
  }, [id]);

  if (!track) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Panel className="mx-[10px] my-[5px] md:mx-[40px] md:my-[20px] h-[85vh] gap-[14px]">
          <Card className="flex p-[15px] gap-[10px] items-center">
            <img
              src={track.image_s3_url}
              alt="Track Image"
              className="w-[100px] h-[100px] rounded-[20px]"
            />
            <div>
              <div className="font-semibold text-[24px]">
                {track.track_name}
              </div>
              <Label>{track.artist}</Label>
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
      </ThemeProvider>
    </div>
  );
};

export default Track;
