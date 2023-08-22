import styles from "./index.module.scss";
import Link from "next/link";

type IProps = {
  isSigned: boolean;
};
const StartButton = ({ isSigned }: IProps) => {
  return (
    <>
      <Link
        className={styles.ctaBanner}
        href={isSigned ? "" : "/auth/register/?layout=negocios-de-orgulho"}
      >
        {!isSigned && "Venha fazer parte "}
        {isSigned && "COMEÇAR"}

        <svg
          width="9"
          height="10"
          viewBox="0 0 9 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.696289 0.241455V9.85192L8.24737 5.04669L0.696289 0.241455Z"
            fill="black"
          />
        </svg>
      </Link>
    </>
  );
};

export default StartButton;
