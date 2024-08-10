import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";

interface Song {
  name: string;
  url: string;
}

interface SongsData {
  morning: Record<string, Song[]>;
  evening: Record<string, Song[]>;
}

export default function PlayPage() {
  const router = useRouter();
  const { timeOfDay, numSongs } = router.query;
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("/songsData.json");
      const data: SongsData = await response.json();

      const songCategories = ["Navel", "Heart", "Third-Eye"];
      const selectedSongs: Song[] = [];

      if (timeOfDay === "morning" || timeOfDay === "evening") {
        for (const category of songCategories) {
          const categorySongs = data[timeOfDay][category];

          if (numSongs === "1" && category === "Heart") {
            selectedSongs.push(
              categorySongs[Math.floor(Math.random() * categorySongs.length)],
            );
          } else if (numSongs === "3" || numSongs === "6") {
            const count = numSongs === "3" ? 1 : 2;
            for (let i = 0; i < count; i++) {
              selectedSongs.push(
                categorySongs[Math.floor(Math.random() * categorySongs.length)],
              );
            }
          }
        }
      }

      setSongs(selectedSongs);
    };

    fetchSongs();
  }, [timeOfDay, numSongs]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSongEnd = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  return (
    <div>
      {songs.length > 0 && (
        <ReactPlayer
          url={songs[currentSongIndex]?.url}
          playing={isPlaying}
          controls={true}
          onEnded={handleSongEnd}
        />
      )}
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
}
