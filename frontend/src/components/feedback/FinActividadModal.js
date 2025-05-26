import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/utils/FinActividadModal.module.scss';
import estrella from '../../assets/estrella.png';

export default function FinActividadModal() {
  const navigate = useNavigate();

  return (
    <div className={styles.backdrop}>
      <div className={styles.card}>
        <img src={estrella} alt="estrella" />
        <h2>¡Felicidades!</h2>
        <p>¡Tus manos están limpias!</p>
        <button onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    </div>
  );
}
