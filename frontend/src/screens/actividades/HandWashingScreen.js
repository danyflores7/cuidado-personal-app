import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import usePasosActividad from '../../hooks/usePasosActividad';
import ItemObjeto from '../../components/objetos/ItemObjetoInteractivo';
import ManosZona from '../../components/avatar/ManosZonaObjetivo';
import RewardStars from '../../components/feedback/RewardStars';
import FinActividadModal from '../../components/feedback/FinActividadModal';
import styles from '../../styles/utils/HandWashing.module.scss';

const coloresObj = { jabon:'#ffd0d0', grifo:'#c9e4f8', toalla:'#cfe8d4' };

export default function HandWashingScreen() {
  const { pasoActual, index, totalPasos, esUltimo, siguientePaso } = usePasosActividad();
  const [estadoManos, setEstadoManos] = useState('base');
  const [showStar, setShowStar]       = useState(false);
  const [showModal, setShowModal]     = useState(false);

  const handleAccion = (id) => {
    if (pasoActual.objetivo && id !== pasoActual.objetivo) return;   // incorrecto
    // feedback visual
    setEstadoManos(pasoActual.feedback);
    setShowStar(true);
    setTimeout(() => {
      setShowStar(false);
      if (esUltimo) {
        setShowModal(true);          // ¡actividad terminada!
        setEstadoManos('seco');
      } else {
        setEstadoManos('base');
        siguientePaso();
      }
    }, 1200);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <h2 className={styles.titulo}>{pasoActual.titulo}</h2>

        <ManosZona estado={estadoManos} onObjetoCorrecto={handleAccion}/>

        {/* Objetos disponibles */}
        <div className={styles.objetos}>
          {pasoActual.objetos.map(o => (
            <ItemObjeto
              key={o}
              id={o}
              bg={coloresObj[o]}
              deshabilitado={!!pasoActual.objetivo && o !== pasoActual.objetivo}
            />
          ))}
        </div>

        {/* Progreso numérico */}
        <span className={styles.progreso}>{index+1}/{totalPasos}</span>

        {/* Estrella animada */}
        {showModal && <FinActividadModal />}
      </div>
    </DndProvider>
  );
}
