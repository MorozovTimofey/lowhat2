import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import Panel from "./components/ui/panel";
import { Card } from "./components/ui/card";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { MaterialSymbol } from "react-material-symbols";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/tracks/")
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
        <Panel className="mx-[10px] my-[5px] md:mx-[40px] md:my-[20px] h-[75vh] md:h-[85vh] gap-[10px] grid grid-cols-1 md:grid-cols-3 content-start">
          {tracks.map((track, index) => (
            <Card
              key={track._id}
              className="flex gap-[10px] items-center p-[10px] h-[100px] cursor-pointer"
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
          ))}
        </Panel>
        <div className="fixed w-full h-[70px] bottom-0 flex items-center justify-between px-[10px] md:px-[40px] z-10 bg-slate-600">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-[15px]" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[70px]" />
            </div>
          </div>
          <div className="flex">
            <Button variant="ghost">
              <MaterialSymbol
                icon="skip_previous"
                size={24}
                weight={600}
                fill
                color="white"
              />
            </Button>
            <Button variant="ghost">
              <MaterialSymbol
                icon="play_arrow"
                size={24}
                weight={600}
                fill
                color="white"
              />
            </Button>
            <Button variant="ghost">
              <MaterialSymbol
                icon="skip_next"
                size={24}
                weight={600}
                fill
                color="white"
              />
            </Button>
          </div>
          <div className="hidden md:block">
            <Button variant="ghost">
              <MaterialSymbol
                icon="volume_up"
                size={20}
                weight={600}
                fill
                color="white"
              />
            </Button>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
