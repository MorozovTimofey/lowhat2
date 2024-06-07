import React, { useState, useEffect, useCallback } from "react";
import ReactWaves from "@dschoon/react-waves";
import { MaterialSymbol } from "react-material-symbols";
import { Button } from "./ui/button";
import TrackSlider from "./ui/track-slider-props";
import axios from "axios"; // Импортируем axios для API запросов

interface Track {
  _id: string;
  image_s3_url: string;
  track_name: string;
  artist: string;
  youtube_url?: string;
  audio_s3_url: string;
}

interface PlayerProps {
  selectedTrack: Track | null;
}

function Player({ selectedTrack }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false); // Новый стейт

  const updateProgress = useCallback(() => {
    setCurrentTime(audio.currentTime);
  }, [audio]);

  useEffect(() => {
    if (selectedTrack) {
      audio.src = selectedTrack.audio_s3_url;
      audio.crossOrigin = "anonymous";
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
      audio.addEventListener("error", (e) => {
        console.error("Error loading audio:", e);
      });
    }

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
      audio.removeEventListener("error", (e) => {
        console.error("Error loading audio:", e);
      });
    };
  }, [selectedTrack, audio, updateProgress]);

  const incrementListenCount = async (trackId: string) => {
    try {
      await axios.post(`http://127.0.0.1:8000/tracks/${trackId}/listen`);
    } catch (error) {
      console.error("Error incrementing listen count:", error);
    }
  };

  const togglePlay = () => {
    if (selectedTrack) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
        if (!hasPlayed) {
          incrementListenCount(selectedTrack._id); // Увеличиваем количество прослушиваний при первом воспроизведении
          setHasPlayed(true); // Устанавливаем флаг, что аудио уже воспроизводилось
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full h-[300px] flex flex-col justify-center pr-[20px] pl-[10px]">
      {selectedTrack && (
        <ReactWaves
          audioFile={selectedTrack.audio_s3_url}
          className={"react-waves"}
          options={{
            barWidth: 3,
            barHeight: 5,
            barGap: 6,
            backend: "MediaElement",
            normalize: true,
            cursorWidth: 0,
            mediaType: "audio",
            hideScrollbar: true,
            responsive: true,
            progressColor: "#2492FC",
            waveColor: "#E9EFF4",
          }}
          zoom={1}
          volume={0.1}
          playing={isPlaying}
        />
      )}
      <div className="flex items-center">
        <Button variant="ghost" onClick={togglePlay}>
          <MaterialSymbol
            icon={isPlaying ? "pause" : "play_arrow"}
            size={24}
            weight={600}
            fill
          />
        </Button>

        <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">
          {formatTime(currentTime)}
        </span>
        <TrackSlider
          min={0}
          max={duration}
          value={currentTime}
          onChange={(newValue) => {
            setCurrentTime(newValue);
            if (audio.readyState >= 2) {
              audio.currentTime = newValue;
              // Убедитесь, что аудио воспроизводится, если необходимо
              if (!isPlaying || audio.paused) {
                audio.play();
              }
            } else {
              console.error(
                "Аудиофайл не загружен или не готов к воспроизведению."
              );
            }
          }}
        />
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}

export default Player;
