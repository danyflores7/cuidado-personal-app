import React from 'react';
import { useDrag } from 'react-dnd';
import styles from '../../styles/utils/ItemObjeto.module.scss';

export const OBJETO_TYPE = 'OBJETO_LAVADO';

const objetosImg = {
  jabon: require('../../assets/jabon.png'),
  grifo: require('../../assets/grifo.png'),
  esponja: require('../../assets/esponja.png'),
  toalla: require('../../assets/toalla.png'),
  ropa: require('../../assets/ropa.png'),
  papel: require('../../assets/papel.png'),
  limpiar: require('../../assets/limpiar.png'),
  pasta: require('../../assets/pasta.png'),
  cepillo: require('../../assets/cepillo.png'),
  vaso: require('../../assets/vaso.png')
};

export default function ItemObjetoInteractivo({ id, bg = '#ffd0d0' }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: OBJETO_TYPE,
    item: { id },
    canDrag: true, // 🔓 todos se pueden arrastrar
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [id]);

  return (
    <div
      ref={drag}
      className={styles.card}
      style={{
        backgroundColor: bg,
        opacity: isDragging ? 0.4 : 1,
        cursor: 'grab',
      }}
    >
      <img src={objetosImg[id]} alt={id} draggable={false} />
    </div>
  );
}