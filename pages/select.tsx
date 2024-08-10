import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function SelectPage() {
  const router = useRouter();
  const { timeOfDay } = router.query;

  const handleSongSelection = (numSongs: number) => {
    router.push(`/play?timeOfDay=${timeOfDay}&numSongs=${numSongs}`);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => handleSongSelection(1)}>1 Song</button>
      <button onClick={() => handleSongSelection(3)}>3 Songs</button>
      <button onClick={() => handleSongSelection(6)}>6 Songs</button>
    </div>
  );
}
