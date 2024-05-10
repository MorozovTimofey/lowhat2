import { MaterialSymbol } from "react-material-symbols";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

function Player({ selectedTrack }) {
  return (
    <div className="fixed w-full h-[80px] md:h-[100px] flex flex-col gap-[16px] bottom-0 pt-[10px] md:py-[10px] px-[10px] md:px-[40px] z-10 bg-slate-300 dark:bg-slate-600">
      <div>
        <Slider defaultValue={[0]} max={100} step={1} />
      </div>
      <div className="flex items-center justify-center md:justify-between">
        <div className=" items-center space-x-4 hidden md:flex">
          {selectedTrack ? (
            <>
              <img
                src={selectedTrack.image_s3_url}
                alt=""
                className="h-12 w-12 rounded-[15px]"
              />
              <div className="space-y-2">
                <div className="font-semibold">{selectedTrack.track_name}</div>
                <div>{selectedTrack.artist}</div>
              </div>
            </>
          ) : (
            <>
              <Skeleton className="h-12 w-12 rounded-[15px]" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[70px]" />
              </div>
            </>
          )}
        </div>
        <div className="flex">
          <Button variant="ghost">
            <MaterialSymbol icon="skip_previous" size={24} weight={600} fill />
          </Button>
          <Button variant="ghost">
            <MaterialSymbol icon="play_arrow" size={24} weight={600} fill />
          </Button>
          <Button variant="ghost">
            <MaterialSymbol icon="skip_next" size={24} weight={600} fill />
          </Button>
        </div>
        <div className="hidden md:block">
          <Button variant="ghost">
            <MaterialSymbol icon="volume_up" size={20} weight={600} fill />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Player;
