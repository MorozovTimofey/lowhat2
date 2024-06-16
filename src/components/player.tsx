import { useState, useEffect } from "react";
import AudioPlayer from "react-audio-player";

interface Track {
  _id: string;
  audio_s3_url: string;
}

interface PlayerProps {
  selectedTrack: Track | null;
}

function Player({ selectedTrack }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasListened, setHasListened] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setHasListened(false);
  }, [selectedTrack]);

  const handlePlay = async () => {
    if (selectedTrack && !hasListened) {
      console.log(`selectedTrack:`, selectedTrack); // Логируем весь объект selectedTrack
      console.log(`Отправка запроса для трека с ID: ${selectedTrack._id}`);
      if (!selectedTrack._id) {
        console.error("Ошибка: у трека нет ID");
        return;
      }
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/tracks/${selectedTrack._id}/listen`,
          {
            method: "POST",
          }
        );
        if (!response.ok) {
          throw new Error(`Ошибка сети: ${response.statusText}`);
        }
        console.log("Запрос отправлен успешно");
        setHasListened(true);
      } catch (error) {
        console.error("Ошибка при отправке запроса на прослушивание:", error);
      }
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="w-full flex flex-col justify-center p-7">
      {selectedTrack && (
        <AudioPlayer
          src={selectedTrack.audio_s3_url}
          autoPlay={isPlaying}
          controls
          className="audio-player w-full"
          onPlay={handlePlay}
          onPause={handlePause}
        />
      )}
    </div>
  );
}

export default Player;
