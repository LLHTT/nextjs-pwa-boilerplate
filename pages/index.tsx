import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const handleTimeOfDayClick = (timeOfDay: string) => {
    router.push(`/select?timeOfDay=${timeOfDay}`);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => handleTimeOfDayClick("morning")}>Morning</button>
      <button onClick={() => handleTimeOfDayClick("evening")}>Evening</button>
    </div>
  );
}
