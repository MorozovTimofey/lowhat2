import { useState, useEffect, FormEventHandler } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { Button } from "./ui/button";
import TrackSlider from "./ui/track-slider-props";

interface PlayerProps {
  selectedTrack: Track | null;
}

function Player({ selectedTrack }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const updateProgress = () => {
    setCurrentTime(audio.currentTime);
  };

  useEffect(() => {
    if (selectedTrack) {
      audio.src = selectedTrack.audio_s3_url;
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
    }

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
    };
  }, [selectedTrack, audio]);

  const togglePlay = () => {
    if (selectedTrack) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleChangeTime: FormEventHandler<HTMLDivElement> = (event) => {
    const newTime = Number((event.target as HTMLInputElement).value);

    // Проверяем, что новое время воспроизведения находится в пределах допустимого диапазона
    if (newTime >= 0 && newTime <= duration) {
      setCurrentTime(newTime);

      // Проверяем, что аудиофайл загружен и готов к воспроизведению
      if (selectedTrack && audio.readyState >= 2) {
        // Устанавливаем новое время воспроизведения
        audio.currentTime = newTime;

        // Проверяем, что аудиофайл воспроизводится или на паузе, и начинаем воспроизведение, если необходимо
        if (!isPlaying || audio.paused) {
          audio.play();
          setIsPlaying(true);
        }
      } else {
        console.error("Аудиофайл не загружен или не готов к воспроизведению.");
      }
    } else {
      console.error(
        "Новое время воспроизведения выходит за пределы допустимого диапазона."
      );
    }
  };

  return (
    <div className="w-full h-[80px] flex flex-col justify-center pr-[20px] pl-[10px]">
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
              if (!isPlaying || audio.paused) {
                audio.play();
                setIsPlaying(true);
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
