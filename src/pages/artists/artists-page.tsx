import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ArtistsPage = () => {
  interface Artist {
    _id: string;
    artist_name: string;
    artist_avatar_s3_url: string;
  }

  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get<Artist[]>(
          "http://127.0.0.1:8000/artists/"
        );
        setArtists(response.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <Panel className="h-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 p-6 content-start">
      {artists.map((artist) => (
        <Link
          to={`/artists/${artist._id}`}
          key={artist._id}
          className="no-underline"
        >
          <Card className="flex flex-col items-center justify-between cursor-pointer shadow-lg rounded-lg transition-transform transform hover:scale-105 w-full h-full">
            <img
              src={artist.artist_avatar_s3_url}
              alt={artist.artist_name}
              className="rounded-t-lg w-full object-cover"
              style={{ height: "200px" }}
            />
            <div className="font-bold text-[16px] uppercase flex justify-center items-center h-16 w-full">
              {artist.artist_name}
            </div>
          </Card>
        </Link>
      ))}
    </Panel>
  );
};
