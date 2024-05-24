import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AlbumsPage = () => {
  interface Album {
    _id: string;
    album_name: string;
    album_image_s3_url: string;
  }

  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get<Album[]>(
          "http://127.0.0.1:8000/albums/"
        );
        setAlbums(response.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <Panel className="h-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 p-6 content-start">
      {albums.map((album) => (
        <Link
          to={`/albums/${album._id}`}
          key={album._id}
          className="no-underline"
        >
          <Card className="flex flex-col items-center justify-between cursor-pointer shadow-lg rounded-lg transition-transform transform hover:scale-105 w-full h-full">
            <img
              src={album.album_image_s3_url}
              alt={album.album_name}
              className="rounded-t-lg w-full object-cover"
              style={{ height: "200px" }}
            />
            <div className="font-bold text-[16px] uppercase flex justify-center items-center h-16 w-full">
              {album.album_name}
            </div>
          </Card>
        </Link>
      ))}
    </Panel>
  );
};
