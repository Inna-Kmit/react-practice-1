import { useEffect, useState } from "react";
import css from "./Timer.module.css";

export default function Timer() {
  const [time, setTime] = useState(new Date());
  const [clicks, setClicks] = useState<number>(() => {
    const saved = localStorage.getItem("saved-clicks");
    return saved ? JSON.parse(saved) : 0;
  });

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    localStorage.setItem("saved-clicks", JSON.stringify(clicks));
  }, [clicks]);

  return (
    <div className={css.timer}>
      <p className={css.time}>{time.toLocaleTimeString()}</p>

      <div className={css.controls}>
        <button onClick={() => setClicks((c) => c + 1)}>
          You clicked {clicks} times
        </button>

        <button className={css.reset} onClick={() => setClicks(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}
