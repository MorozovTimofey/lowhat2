import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Panel from "@/components/ui/panel";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Track {
  _id: string;
  image_s3_url: string;
  track_name: string;
  artist: string;
}

const TrackPage = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [, setSelectedTrack] = useState<Track | null>(null);

  useEffect(() => {
    axios
      .get<Track[]>("http://127.0.0.1:8000/tracks/")
      .then((response) => {
        setTracks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tracks:", error);
      });
  }, []);

  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Panel className="mx-[10px] my-[5px] md:mx-[40px] md:my-[20px] h-[90vh] gap-[10px] grid grid-cols-1 md:grid-cols-3 content-start">
          {tracks.map((track) => (
            <Link to={`/tracks/${track._id}`} key={track._id}>
              <Card
                key={track._id}
                className="flex gap-[10px] items-center p-[10px] h-[100px] cursor-pointer"
                onClick={() => setSelectedTrack(track)}
              >
                <img
                  src={track.image_s3_url}
                  alt=""
                  className="rounded-[20px] size-[82px] max-w-[82px]"
                />
                <div>
                  <div className="font-semibold text-[18px]">
                    {track.track_name}
                  </div>
                  <Label>{track.artist}</Label>
                </div>
              </Card>
            </Link>
          ))}
        </Panel>
      </ThemeProvider>
    </div>
  );
};

export default TrackPage;
