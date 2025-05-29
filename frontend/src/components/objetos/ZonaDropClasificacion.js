import React from 'react';
import { useDrop } from 'react-dnd';
import { PICTO_TYPE } from './PictogramaDraggable';
import styles from '../../styles/utils/ClasificarAcciones.module.scss';
import pulgarArriba from '../../assets/simbolo_bien.png';
import pulgarAbajo  from '../../assets/simbolo_mal.png';

export default function ZonaDropClasificacion({ tipoZona, onDropResultado }) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: PICTO_TYPE,
    drop: (item) => onDropResultado(item.id, tipoZona),
    collect: monitor => ({
      isOver:  !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  }), [tipoZona, onDropResultado]);

  const esBien = tipoZona === 'bien';
  const baseClass = esBien ? styles.zonaBien : styles.zonaMal;

  return (
    <div
      ref={drop}
      className={`${baseClass} ${isOver && canDrop ? styles.zonaHover : ''}`}
    >
      <img src={esBien ? pulgarArriba : pulgarAbajo} alt={tipoZona}/>
      <h2>{esBien ? 'BIEN' : 'MAL'}</h2>
    </div>
  );
}
