import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import axios from "axios";
import { useEffect, useState } from "react";

export const ArtistsPage = () => {
  interface Artist {
    _id: string;
    artist_name: string;
    artist_avatar_s3_url: string;
  }

  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    axios
      .get<Artist[]>("http://127.0.0.1:8000/artists/")
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  }, []);

  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Panel className="mx-[10px] my-[5px] md:mx-[40px] md:my-[20px] h-[85vh] md:h-[85vh]">
          {artists.map((artist) => (
            <Card className="w-[200px] flex flex-col items-center">
              <img
                src={artist.artist_avatar_s3_url}
                alt=""
                className="rounded-[20px] size-[82px] max-w-[82px]"
              />
              <div>{artist.artist_name}</div>
            </Card>
          ))}
        </Panel>
      </ThemeProvider>
    </div>
  );
};
