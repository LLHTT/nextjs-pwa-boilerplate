import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import styles from "../styles/Play.module.css";
import { FaArrowLeft, FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { ImBrightnessContrast } from "react-icons/im";

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
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [brightness, setBrightness] = useState<number>(100);

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

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBrightness = e.target.value;
    setBrightness(parseInt(newBrightness));
    document.body.style.filter = `brightness(${newBrightness}%)`;
  };

  return (
    <div className={styles.playbackContainer}>
      <button className={styles.backButton} onClick={() => router.back()}>
        <FaArrowLeft />
      </button>
      <div className={styles.yantraContainer}>
        <div className={styles.yantraBackground}></div>
      </div>
      <div className={styles.controlsContainer}>
        {songs.length > 0 && (
          <ReactPlayer
            url={songs[currentSongIndex]?.url}
            playing={isPlaying}
            controls={false}
            onEnded={handleSongEnd}
            width="100%"
            height="50px"
            className={styles.audioPlayer}
          />
        )}
        <button onClick={handlePlayPause} className={styles.playPauseButton}>
          {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
        </button>
        <div className={styles.sliderContainer}>
          <ImBrightnessContrast className={styles.brightnessIcon} />
          <input
            type="range"
            id="brightness-slider"
            min="1"
            max="100"
            value={brightness}
            onChange={handleBrightnessChange}
            className={styles.brightnessSlider}
          />
        </div>
      </div>
    </div>
  );
}
