import React from 'react';
import { useDrop } from 'react-dnd';
import { OBJETO_TYPE } from '../objetos/ItemObjetoInteractivo';
import styles from '../../styles/utils/AvatarNino.module.scss';

// imágenes según estado ► asegúrate que existan en /assets
const imgs = {
  base:            require('../../assets/avatar_base_baño.png'),
  ropaBajada:      require('../../assets/avatar_ropa_bajada_baño.png'),
  avatarSentado:   require('../../assets/avatar_sentado_baño.png'),
  papelUsado:      require('../../assets/avatar_papel_baño.png'),
  inodoroLimpio:   require('../../assets/inodoro_limpio_baño.png')   // avatar + inodoro limpio
};

export default function AvatarBano({ estado, onDropCorrecto, onClick }) {
  const [, drop] = useDrop(
    () => ({
      accept: OBJETO_TYPE,
      drop: ({ id }) => onDropCorrecto(id)
    }),
    [onDropCorrecto]            // ⬅️ antes era [estado]
  );


  return (
    <div ref={drop} className={styles.banoArea} onClick={onClick}>
      <img src={imgs[estado] ?? imgs.base} alt="baño avatar" draggable={false}/>
    </div>
  );
}

