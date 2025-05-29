import React from 'react';
import { useDrop } from 'react-dnd';
import { OBJETO_TYPE } from '../objetos/ItemObjetoInteractivo';
import styles from '../../styles/utils/AvatarNino.module.scss';

const imgs = {
  base:          require('../../assets/avatar_cepillo_base.png'),
  cepilloPasta:  require('../../assets/avatar_cepillo_pasta.png'),
  cepillando:    require('../../assets/avatar_cepillando.png'),
  enjuagando:    require('../../assets/avatar_enjuagando.png')
};

export default function AvatarCepillado({ estado, onDropCorrecto, onClickAvatar }) {
  // AvatarBano.js
const [, drop] = useDrop(
  () => ({
    accept: OBJETO_TYPE,
    drop: ({ id }) => onDropCorrecto(id)
  }),
  [onDropCorrecto]            // ⬅️ antes era [estado]
);


  return (
    <div ref={drop} className={styles.cepilladoArea} onClick={onClickAvatar}>
      <img src={imgs[estado] ?? imgs.base} alt="avatar dientes" draggable={false}/>
    </div>
  );
}
