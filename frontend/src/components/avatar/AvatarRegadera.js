import React from 'react';
import { useDrop } from 'react-dnd';
import { OBJETO_TYPE } from '../objetos/ItemObjetoInteractivo';
import styles from '../../styles/utils/AvatarNino.module.scss';

const imgs = {
  base:       require('../../assets/avatar_base.png'),
  agua:       require('../../assets/avatar_agua.png'),
  espuma:     require('../../assets/avatar_espuma.png'),
  burbujas:   require('../../assets/avatar_burbujas.png'),
  seco:       require('../../assets/avatar_seco.png')
};

export default function AvatarRegadera({ estado, onObjetoCorrecto }) {
  const [, drop] = useDrop(() => ({
    accept: OBJETO_TYPE,
    drop: ({ id }) => onObjetoCorrecto(id)
  }), [onObjetoCorrecto]);

  return (
    <div ref={drop} className={styles.regaderaArea}>
      {/* Fondo de la regadera */}
      <div className={styles.fondo}>
        <img src={require('../../assets/fondo_ducha.png')} alt="fondo ducha" draggable={false} />
      </div>

      {/* Avatar superpuesto */}
      <div className={styles.avatar}>
        <img src={imgs[estado] ?? imgs.base} alt="avatar ducha" draggable={false} />
      </div>
    </div>
  );
}

