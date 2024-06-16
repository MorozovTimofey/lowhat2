import { Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface SongData {
  _id: string;
  track_name: string;
  album_id: string;
  genre_id: string;
  listens: number;
  likes: number;
  audio_s3_url: string;
  image_s3_url: string;
  youtube_url: string;
}

const SongTable: React.FC<{ songs: SongData[] }> = ({ songs }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[5%] text-center">Обложка</TableHead>
          <TableHead className="w-[60%]">Название</TableHead>
          <TableHead className="w-[5%] text-center">Прослушиваний</TableHead>
          <TableHead className="w-[5%] text-center">Лайки</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="cursor-pointer">
        {songs.map((song) => (
          <TableRow key={song._id}>
            <TableCell className="text-center">
              <img
                src={song.image_s3_url}
                alt="Song Cover"
                className="w-[50px] h-[50px] rounded-[10px] mx-auto"
              />
            </TableCell>
            <TableCell>
              <Link to={`/tracks/${song._id}`}>{song.track_name}</Link>
            </TableCell>
            <TableCell className="text-center">{song.listens}</TableCell>
            <TableCell className="text-center">{song.likes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SongTable;
