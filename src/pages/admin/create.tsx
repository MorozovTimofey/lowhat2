import { useState, useEffect } from "react";
import Panel from "@/components/ui/panel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GenreForm from "@/components/forms/GenreForm";
import ArtistForm from "@/components/forms/ArtistForm";
import AlbumForm from "@/components/forms/AlbumForm";
import TrackForm from "@/components/forms/TrackForm";

export const Create = () => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);

  const fetchArtists = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/artists/");
      const data = await response.json();
      setArtists(data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  const fetchAlbums = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/albums/");
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/genres/");
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchArtists();
    fetchAlbums();
    fetchGenres();
  }, []);

  return (
    <Panel>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Добавить трек</AccordionTrigger>
          <AccordionContent>
            <TrackForm
              artists={artists}
              albums={albums}
              genres={genres}
              fetchArtists={fetchArtists}
              fetchAlbums={fetchAlbums}
              fetchGenres={fetchGenres}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Добавить исполнителя</AccordionTrigger>
          <AccordionContent>
            <ArtistForm fetchArtists={fetchArtists} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Добавить альбом</AccordionTrigger>
          <AccordionContent>
            <AlbumForm fetchAlbums={fetchAlbums} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Добавить жанр</AccordionTrigger>
          <AccordionContent>
            <GenreForm fetchGenres={fetchGenres} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Panel>
  );
};

export default Create;
