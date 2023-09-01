"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import { useState } from "react";

interface ModalProps {
  onClose: () => void;
}

const PlayModal: React.FC<ModalProps> = ({ onClose }) => {
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);

  const handleAnswerChange = (questionIndex: number, answer: number) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = answer;
      return updatedAnswers;
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Check if all questions are answered
    if (answers.length !== 3) {
      alert("Por favor, responda todas as perguntas.");
    } else {
      // Submit the form or perform any necessary actions
      console.log("Form submitted:", answers);
      onClose();
    }
  };
  return (
    <>
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <img src="image-1.png" alt="" />
            <span className={styles.modalText}>
              <span className={styles.modalTitle}>
                PARA CONCLUIR, PREENCHA...
              </span>
              <span className={styles.modalParagraph}>
                Sendo 1 (pouco) e 5 (muito), quanto você se sente uma pessoa
                preparada para administrar o seu negócio em relação à:
              </span>
            </span>
          </div>
          <div className={styles.modalBody}>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.question}>
                <p>Passei a me reconhecer mais como uma pessoa empreendedora</p>
                <div className={styles.options}>
                  {[1, 2, 3, 4, 5].map((option) => (
                    <>
                      <label key={option}>
                        <input
                          type="radio"
                          name="question1"
                          value={option}
                          onChange={() => handleAnswerChange(2, option)}
                        />
                        <span></span>
                        <p>{option}</p>
                      </label>
                      {option <= 4 && <div className={styles.line}></div>}
                    </>
                  ))}
                </div>
              </div>

              <div className={styles.question}>
                <p>
                  Me sinto mais próximo(a) de outros empreendedores e parte de
                  uma comunidade fortalecida
                </p>
                <div className={styles.options}>
                  {[1, 2, 3, 4, 5].map((option) => (
                    <>
                      <label key={option}>
                        <input
                          type="radio"
                          name="question2"
                          value={option}
                          onChange={() => handleAnswerChange(2, option)}
                        />
                        <span></span>
                        <p>{option}</p>
                      </label>
                      {option <= 4 && <div className={styles.line}></div>}
                    </>
                  ))}
                </div>
              </div>

              <div className={styles.question}>
                <p>
                  Passei a ter mais referências (pesquisas, autores e cases)
                  sobre empreendedorismo para continuar sua jornada de
                  conhecimento?
                </p>
                <div className={styles.options}>
                  {[1, 2, 3, 4, 5].map((option) => (
                    <>
                      <label key={option}>
                        <input
                          type="radio"
                          name="question3"
                          value={option}
                          onChange={() => handleAnswerChange(2, option)}
                        />
                        <span></span>
                        <p>{option}</p>
                      </label>
                      {option <= 4 && <div className={styles.line}></div>}
                    </>
                  ))}
                </div>
              </div>

              <span className={styles.divider}></span>
              <div className={styles.footer}>
                <p>Preencha todos os campos para concluir.</p>
                <button type="submit">Concluir</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayModal;
