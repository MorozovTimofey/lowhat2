import { useState, useEffect } from "react";
import AudioPlayer from "react-audio-player";

interface Track {
  audio_s3_url: string;
}

interface PlayerProps {
  selectedTrack: Track | null;
}

function Player({ selectedTrack }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
  }, [selectedTrack]);

  return (
    <div className="w-full flex flex-col justify-center p-7">
      {selectedTrack && (
        <AudioPlayer
          src={selectedTrack.audio_s3_url}
          autoPlay={isPlaying}
          controls
          className="audio-player w-full"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
}

export default Player;
