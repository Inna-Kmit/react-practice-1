import axios from "axios";
import { useEffect, useState } from "react";
import css from "./Character.module.css";

interface CharacterData {
  name: string;
  height: string;
  mass?: string;
  gender?: string;
  birth_year?: string;
}

interface CharacterProps {
  id: number;
}

export default function Character({ id }: CharacterProps) {
  const [character, setCharacter] = useState<CharacterData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCharacter() {
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get<CharacterData>(
          `https://swapi.info/api/people/${id}`,
          { signal: controller.signal }
        );

        setCharacter(data);
      } catch (err: unknown) {
        if (axios.isCancel(err) || (err as any)?.name === "CanceledError")
          return;
        setCharacter(null);
        setError("Failed to load character");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchCharacter();
    return () => controller.abort();
  }, [id]);

  if (loading) return <p className={css.state}>Loading character...</p>;
  if (error) return <p className={css.stateError}>{error}</p>;
  if (!character) return null;

  return (
    <div className={css.character}>
      <div className={css.topRow}>
        <h3 className={css.name}>{character.name}</h3>
        <span className={css.badge}>SWAPI</span>
      </div>

      <div className={css.grid}>
        <div className={css.item}>
          <span className={css.label}>Height</span>
          <span className={css.value}>{character.height}</span>
        </div>
        <div className={css.item}>
          <span className={css.label}>Mass</span>
          <span className={css.value}>{character.mass ?? "—"}</span>
        </div>
        <div className={css.item}>
          <span className={css.label}>Gender</span>
          <span className={css.value}>{character.gender ?? "—"}</span>
        </div>
        <div className={css.item}>
          <span className={css.label}>Birth year</span>
          <span className={css.value}>{character.birth_year ?? "—"}</span>
        </div>
      </div>

      <pre className={css.pre}>{JSON.stringify(character, null, 2)}</pre>
    </div>
  );
}
