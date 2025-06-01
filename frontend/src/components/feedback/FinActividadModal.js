import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Howl } from 'howler';
import styles from '../../styles/utils/FinActividadModal.module.scss';
import estrella from '../../assets/estrella.png';
import starFx from '../../assets/audio/ui/star.mp3';

export default function FinActividadModal({ texto = '¡Felicidades!', volver }) {
  const navigate = useNavigate();
  const goHome = () => (volver ? volver() : navigate('/'));

  React.useEffect(() => {
    const sonido = new Howl({ src: [starFx], volume: 0.9 });
    sonido.play();
    return () => sonido.unload();
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.card}>
        <img src={estrella} alt="star" />
        <h2>{texto}</h2>
        <button onClick={goHome}>Volver al inicio</button>
      </div>
    </div>
  );
}
