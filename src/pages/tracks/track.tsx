import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Panel from "@/components/ui/panel";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Player from "@/components/player";
import { MaterialSymbol } from "react-material-symbols";

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
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get<Track>(
          `http://127.0.0.1:8000/tracks/${id}`
        );
        setTrack(response.data);
        fetchArtist(response.data.artist);
        setAudio(new Audio(response.data.audio_s3_url));
        checkIfFavorite(response.data._id);
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

  const checkIfFavorite = async (trackId: string) => {
    try {
      const token = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("access_token="));
      if (token) {
        const response = await axios.get(
          `http://127.0.0.1:8000/users/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token.split("=")[1]}`,
            },
          }
        );
        setIsFavorite(response.data.includes(trackId));
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const handleFavorite = async () => {
    try {
      const token = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("access_token="));
      if (token) {
        const url = `http://127.0.0.1:8000/favorites/?track_id=${track!._id}`;
        if (isFavorite) {
          await axios.delete(url, {
            headers: {
              Authorization: `Bearer ${token.split("=")[1]}`,
            },
          });
          setIsFavorite(false);
        } else {
          await axios.post(`http://127.0.0.1:8000/favorites/`, null, {
            headers: {
              Authorization: `Bearer ${token.split("=")[1]}`,
            },
            params: {
              track_id: track!._id,
            },
          });
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  if (!track || !artist || !audio) {
    return <div>Loading...</div>;
  }

  return (
    <Panel className="h-[100%] gap-[14px]">
      <Card className="flex p-[15px] gap-[10px] items-center justify-between">
        <div className="flex p-[15px] gap-[10px] items-center">
          <img
            src={track.image_s3_url}
            alt="Track Image"
            className="w-[100px] h-[100px] rounded-[20px]"
          />
          <div>
            <div className="font-semibold text-[24px]">{track.track_name}</div>
            <Label>{artist.artist_name}</Label>
          </div>
        </div>
        <div className="p-[15px] cursor-pointer" onClick={handleFavorite}>
          <MaterialSymbol
            icon={isFavorite ? "favorite" : "favorite_border"}
            size={24}
            weight={600}
            fill={isFavorite}
          />
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
