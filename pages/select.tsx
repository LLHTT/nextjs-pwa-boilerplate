import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import styles from "../styles/Select.module.css";

export default function SelectPage() {
  const router = useRouter();
  const { timeOfDay } = router.query;

  const handleSongSelection = (numSongs: number) => {
    router.push(`/play?timeOfDay=${timeOfDay}&numSongs=${numSongs}`);
  };

  return (
    <div className={styles.selectContainer}>
      <button className={styles.backButton} onClick={() => router.back()}>
        <FaArrowLeft />
      </button>
      <div className={styles.songOptions}>
        <button
          onClick={() => handleSongSelection(1)}
          className={styles.songButton}
        >
          1
        </button>
        <button
          onClick={() => handleSongSelection(3)}
          className={styles.songButton}
        >
          3
        </button>
        <button
          onClick={() => handleSongSelection(6)}
          className={styles.songButton}
        >
          6
        </button>
      </div>
    </div>
  );
}
