import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/utils/FinActividadModal.module.scss';
import estrella from '../../assets/estrella.png';

export default function FinActividadModal({ texto = '¡Felicidades!', volver }) {
  const navigate = useNavigate();
  const goHome = () => (volver ? volver() : navigate('/'));

  return (
    <div className={styles.backdrop}>
      <div className={styles.card}>
        <img src={estrella} alt="star"/>
        <h2>{texto}</h2>
        <button onClick={goHome}>Volver al inicio</button>
      </div>
    </div>
  );
}
