import { useRouter } from "next/router";
import { FaSun, FaMoon } from "react-icons/fa";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const handleTimeOfDayClick = (timeOfDay: string) => {
    router.push(`/select?timeOfDay=${timeOfDay}`);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.iconContainer}>
        <button
          onClick={() => handleTimeOfDayClick("morning")}
          className={styles.timeOfDayButton}
        >
          <FaSun className={styles.timeOfDayIcon} />
        </button>
        <button
          onClick={() => handleTimeOfDayClick("evening")}
          className={styles.timeOfDayButton}
        >
          <FaMoon className={styles.timeOfDayIcon} />
        </button>
      </div>
    </div>
  );
}
