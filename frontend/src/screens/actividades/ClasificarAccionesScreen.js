import { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';


import useClasificacionAcciones from '../../hooks/useClasificacionAcciones';
import PictogramaDraggable from '../../components/objetos/PictogramaDraggable';
import ZonaDrop from '../../components/objetos/ZonaDropClasificacion';
import FeedbackAccion from '../../components/feedback/FeedbackAccion';
import RewardStars from '../../components/feedback/RewardStars';
import FinActividadModal from '../../components/feedback/FinActividadModal';

import styles from '../../styles/utils/ClasificarAcciones.module.scss';
import ayudaIcon from '../../assets/icono_ayuda.png';

export default function ClasificarAccionesScreen() {
  const { accionActual, idx, total, esUltimo, avanzar, reiniciar } = useClasificacionAcciones();
  const [feedback, setFeedback] = useState(null);   // true / false / null
  const [showStar, setShowStar] = useState(false);
  const [fin, setFin]         = useState(false);
  //const [showModal, setShowModal]     = useState(false);
  const nav = useNavigate();
  

//   const manejarDrop = (idAccion, tipoZona) => {
//     const esCorrecto = (tipoZona === accionActual.categoria);
const manejarDrop = useCallback((idAccion, tipoZona) => {
  const esCorrecto = (tipoZona === accionActual.categoria);
    setFeedback(esCorrecto);

    if (esCorrecto) {
      setShowStar(true);
      setTimeout(() => {
        setShowStar(false);
        setFeedback(null);
        esUltimo ? setFin(true) : avanzar();
      }, 1000);
    } else {
      // incorrecto: reset feedback luego de breve pausa
      setTimeout(() => setFeedback(null), 1200);
    }
}, [accionActual, esUltimo]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>

        <img src={ayudaIcon} alt="ayuda"
             className={styles.ayuda}
             onClick={() => alert('Arrastra las acciones buenas al lado verde y las malas al lado rojo.')} />

        {/* ZONA MAL */}
        <ZonaDrop tipoZona="mal" onDropResultado={manejarDrop}/>

        {/* CENTRO: pictograma */}
        <div className={styles.centro}>
          {accionActual && (
           <PictogramaDraggable
             id={accionActual.id}
             imagen={accionActual.img}
             descripcion={accionActual.texto}
           />
         )}
          <FeedbackAccion correcto={feedback}/>
          {showStar && <RewardStars />}
        </div>

        {/* ZONA BIEN */}
        <ZonaDrop tipoZona="bien" onDropResultado={manejarDrop}/>

        {/* Progreso */}
        {accionActual && (
           <span className={styles.progreso}>{idx + 1}/{total}</span>
        )}

        {/* Modal final */}
        {fin &&
          <FinActividadModal
            texto="¡Buen trabajo! Ya sabes qué está bien y qué está mal."
            volver={()=>{ reiniciar(); nav('/'); }}
            repetir={() => window.location.reload()}
          />
        }
      </div>
    </DndProvider>
  );
}
