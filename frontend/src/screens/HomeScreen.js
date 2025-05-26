// src/screens/HomeScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/botones/CustomButton';
import styles from '../styles/HomeScreen.module.scss';

// --- imágenes ----------------------------------------------------------------------------------
import washIcon    from '../assets/lavarse_manos.png';
import showerIcon  from '../assets/darse_ducha.png';
import toiletIcon  from '../assets/ir_bano.png';
import teethIcon   from '../assets/cepillarse_dientes.png';
// Asegúrate de haber renombrado los archivos en /assets sin espacios ❗

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>¡Hola! Vamos a aprender<br />a cuidar de ti</h1>

      <div className={styles.grid}>
        <CustomButton
          icon={washIcon}
          label="Lavarse las manos"
          bg="#b9dbef"
          onClick={() => navigate('/lavarse-manos')}
        />

        <CustomButton
          icon={showerIcon}
          label="Darse una ducha"
          bg="#fee59a"
          onClick={() => navigate('/ducha')}
        />

        <CustomButton
          icon={toiletIcon}
          label="Ir al baño"
          bg="#c7e9d1"
          onClick={() => navigate('/bano')}
        />

        <CustomButton
          icon={teethIcon}
          label="Cepillarse los dientes"
          bg="#7fcbd5"
          onClick={() => navigate('/dientes')}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
