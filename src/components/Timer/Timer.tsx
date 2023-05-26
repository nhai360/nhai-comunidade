import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import { useSpace } from "../../hooks/useSpace";
import { transientOptions } from "../../lib/utils";
import styles from "./index.module.scss";

interface TimerProps {}

const Timer: React.FC<TimerProps> = () => {
  const { spaceEndsAt, leaveSpace } = useSpace();
  const diff = moment(spaceEndsAt).diff(moment());
  const getClock = (diff: number): string => {
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const minuteDisplay = 10 > minutes ? "0" + minutes : minutes;
    const secondDisplay = 10 > seconds ? "0" + seconds : seconds;

    return `${minuteDisplay}:${secondDisplay}`;
  };

  const [timeDisplay, setTimeDisplay] = useState<string>(
    spaceEndsAt ? getClock(diff) : "00:00"
  );
  const router = useRouter();
  const [isTwoMinutesLeft, setIsTwoMinutesLeft] = useState<boolean>(
    120 >= Math.floor(diff / 1000)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = moment(spaceEndsAt).diff(moment());

      if (diff > 0) {
        const clock = getClock(diff);
        setTimeDisplay(getClock(diff));
        setIsTwoMinutesLeft(120 >= Math.floor(diff / 1000));
      } else {
        leaveSpace();
        router.push("/");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [router, leaveSpace, spaceEndsAt, isTwoMinutesLeft]);

  return (
    <div title="This demo space will close after the timer expires.">
      <div className={styles.display}>
        <span>Time Left</span>
        <span id="countdown" className={isTwoMinutesLeft ? styles.urgent : ""}>
          {timeDisplay}
        </span>
      </div>
    </div>
  );
};

export default Timer;
