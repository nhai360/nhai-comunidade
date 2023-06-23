import Image from "next/image";
import styles from "./index.module.scss";

type IProps = {
  stepsTotal: number;
  steps: number;
};

const StepProgram = ({ stepsTotal, steps }: IProps) => {
  return (
    <>
      <div className={styles.StepWrapper}>
        <span className={styles.Steps}>
          {steps} de {stepsTotal}
        </span>
        <span className={styles.StepTitle}>programas completos</span>
      </div>
    </>
  );
};

export default StepProgram;
