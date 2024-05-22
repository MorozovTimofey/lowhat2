import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Panel from "@/components/ui/panel";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Track {
  _id: string;
  image_s3_url: string;
  track_name: string;
  artist_id: string;
}

interface Artist {
  _id: string;
  artist_name: string;
}

const TrackPage = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<{ [key: string]: Artist }>({});

  useEffect(() => {
    axios
      .get<Track[]>(`http://127.0.0.1:8000/genres/${genreId}/songs`)
      .then((response) => {
        setTracks(response.data);
        const artistIds = response.data.map((track) => track.artist_id);
        fetchArtists(artistIds);
      })
      .catch((error) => {
        console.error("Error fetching tracks:", error);
      });
  }, [genreId]);

  const fetchArtists = (artistIds: string[]) => {
    axios
      .get<Artist[]>(`http://127.0.0.1:8000/artists`, {
        params: {
          ids: artistIds.join(","),
        },
      })
      .then((response) => {
        // Convert array of artists to object for easier lookup
        const artistsMap: { [key: string]: Artist } = {};
        response.data.forEach((artist) => {
          artistsMap[artist._id] = artist;
        });
        setArtists(artistsMap);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  };

  return (
    <Panel className="h-[100%] gap-[10px] grid grid-cols-1 md:grid-cols-3 content-start">
      {tracks.map((track) => (
        <Link to={`/tracks/${track._id}`} key={track._id}>
          <Card className="flex gap-[10px] items-center p-[10px] h-[100px] cursor-pointer">
            <img
              src={track.image_s3_url}
              alt=""
              className="rounded-[20px] size-[82px] max-w-[82px]"
            />
            <div>
              <div className="font-semibold text-[18px]">
                {track.track_name}
              </div>
              <Label>{artists[track.artist_id]?.artist_name}</Label>
            </div>
          </Card>
        </Link>
      ))}
    </Panel>
  );
};

export default TrackPage;
