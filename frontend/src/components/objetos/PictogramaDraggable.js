import React from 'react';
import { useDrag } from 'react-dnd';
import styles from '../../styles/utils/ClasificarAcciones.module.scss';

export const PICTO_TYPE = 'PICTOGRAMA';

export default function PictogramaDraggable({ id, imagen, descripcion }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: PICTO_TYPE,
    item: { id },
    collect: monitor => ({ isDragging: !!monitor.isDragging() })
  }), [id]);

  return (
    <div
      ref={drag}
      className={styles.pictograma}
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <img src={imagen} alt={descripcion} draggable={false}/>
      <span>{descripcion}</span>
    </div>
  );
}
