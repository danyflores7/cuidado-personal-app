import React from 'react';
import { useDrop } from 'react-dnd';
import { OBJETO_TYPE } from '../objetos/ItemObjetoInteractivo';
import styles from '../../styles/utils/AvatarNino.module.scss';

const manosImg = {
  base:     require('../../assets/manos_abiertas.png'),
  espuma:   require('../../assets/manos_espuma.png'),
  burbujas: require('../../assets/manos_burbujas.png'),
  agua:     require('../../assets/manos_agua.png'),
  seco:     require('../../assets/manos_seco.png')
};

export default function ManosZonaObjetivo({ estado, onObjetoCorrecto }) {
  const handleTap = () => onObjetoCorrecto('frotar');
  const [, drop] = useDrop(() => ({
    accept: OBJETO_TYPE,
    drop: (item) => {
      onObjetoCorrecto(item.id);
    }
  }), [onObjetoCorrecto]);

  return (
    <div
      ref={drop}
      className={styles.area}
      onClick={handleTap}
    >
      <img src={manosImg[estado]} alt="zona manos"/>
    </div>
  );
}
