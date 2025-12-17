import { useState } from "react";
import Character from "./Character";
import Timer from "./Timer";
import Modal from "./Modal";
import css from "./App.module.css";

export default function App() {
  const [count, setCount] = useState(1);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.header}>
        <h1 className={css.title}>Star Wars Characters</h1>
        <p className={css.subtitle}>
          Cream + Burgundy UI • hooks • effects • portal • localStorage
        </p>

        <div className={css.toolbar}>
          <button onClick={() => setCount((c) => c + 1)}>
            Get next character
          </button>

          <button onClick={() => setIsTimerOpen((v) => !v)}>
            {isTimerOpen ? "Hide timer" : "Show timer"}
          </button>

          <button onClick={openModal}>Open modal</button>
        </div>
      </header>

      <section className={css.card}>
        <h2 className={css.sectionTitle}>Character #{count}</h2>
        <Character id={count} />
      </section>

      {isTimerOpen && (
        <section className={css.card}>
          <h2 className={css.sectionTitle}>Timer</h2>
          <Timer />
        </section>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className={css.modalTitle}>Modal Title</h2>
          <p className={css.modalText}>
            This is some content inside the modal.
          </p>
        </Modal>
      )}
    </div>
  );
}
