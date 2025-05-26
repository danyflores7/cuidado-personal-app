// src/components/botones/CustomButton.js
import React from 'react';
import styles from '../../styles/utils/CustomButton.module.scss';

/**
 * Botón reutilizable para las tarjetas-actividad del menú principal
 * @param {string}  icon   – import de la imagen / svg
 * @param {string}  label  – texto descriptivo
 * @param {string}  bg     – color de fondo (tailwind-like ó hex)
 * @param {func}    onClick – handler para navegar
 */
const CustomButton = ({ icon, label, bg = '#cbe5f6', onClick }) => (
  <button
    className={styles.card}
    style={{ backgroundColor: bg }}
    onClick={onClick}
  >
    <img src={icon} alt={label} className={styles.icon} />
    <span className={styles.label}>{label}</span>
  </button>
);

export default CustomButton;
