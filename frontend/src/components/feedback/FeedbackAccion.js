import React from 'react';
import styles from '../../styles/utils/ClasificarAcciones.module.scss';
import estrella from '../../assets/estrella.png';

export default function FeedbackAccion({ correcto }) {
  if (correcto === null) return null;       // nada que mostrar

  return correcto ? (
    <img src={estrella} alt="ok" className={styles.feedbackCorrecto}/>
  ) : (
    <div className={styles.feedbackIncorrecto}>¡Intenta de nuevo!</div>
  );
}
