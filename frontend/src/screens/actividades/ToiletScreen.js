import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { usePasosToilet } from '../../hooks/usePasosActividad';
import ItemObjeto, { OBJETO_TYPE } from '../../components/objetos/ItemObjetoInteractivo';
import AvatarBano from '../../components/avatar/AvatarBano';
import RewardStars from '../../components/feedback/RewardStars';
import FinActividadModal from '../../components/feedback/FinActividadModal';
import NarrationPlayer from '../../components/audio/NarrationPlayer';
import { Howl } from 'howler';

import styles from '../../styles/utils/Toilet.module.scss';
import ayudaIcon from '../../assets/icono_ayuda.png';

const colores = { ropa:'#ffd7a8', papel:'#d3eec2', limpiar:'#bde0f7' };

export default function ToiletScreen() {
  const { pasoActual, idx, total, esUltimo, siguiente } = usePasosToilet();
  const [estado, setEstado]   = useState('base');
  const [star, setStar]       = useState(false);
  const [fin, setFin]         = useState(false);
  const navigate              = useNavigate();
  const [feedbackIncorrecto, setFeedbackIncorrecto] = useState(false);
  const sonidoFinal = new Howl({
    src: [require('../../assets/audio/toilet/toilet.mp3')],
    volume: 1,
    onend: () => setFin(true)
  });


  const onAccion = (id) => {
    if (pasoActual.objetivo !== id) {
      setFeedbackIncorrecto(true);
      setTimeout(() => setFeedbackIncorrecto(false), 1500); // Oculta el mensaje después de 1.5s
      return;
    }

    setEstado(pasoActual.feedback);
    setStar(true);

    setTimeout(() => {
      setStar(false);
      if (esUltimo) {
        sonidoFinal.play();
        setTimeout(() => setFin(true), 2000);
      } else {
        siguiente();
      }
    }, 2000);
  };


  // Nueva función para clic directo en avatar en paso 2
    const onClickAvatar = () => {
    if (pasoActual.objetivo !== 'sentarse') return;
    setEstado(pasoActual.feedback);
    setStar(true);

    setTimeout(() => {
        setStar(false);
        if (esUltimo) setFin(true);
        else {siguiente(); }
    }, 1100);
    };


  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        {/* Narración del paso */}
        <NarrationPlayer
          src={pasoActual.audio}
          playTrigger={idx}     // cambia cada vez que avanzas
        />
        <img src={ayudaIcon} alt="help" className={styles.help}
             onClick={()=>alert('Arrastra el objeto correcto hacia el avatar')} />

        <h2 className={styles.titulo}>{pasoActual.titulo}</h2>

        <AvatarBano estado={estado} onDropCorrecto={onAccion} onClick={onClickAvatar} />

        {feedbackIncorrecto && (
          <div className={styles.intentaDeNuevo}>
            Intenta de nuevo
          </div>
        )}

        <div className={styles.objetos}>
          {pasoActual.objetos.map(o=>(
            <ItemObjeto
              key={o}
              id={o}
              bg={colores[o]}
              deshabilitado={pasoActual.objetivo !== o}
            />
          ))}
        </div>

        <span className={styles.progreso}>{idx+1}/{total}</span>

        {star && <RewardStars />}
        {fin && <FinActividadModal texto="¡Muy bien, has terminado!" volver={()=>navigate('/')}/>}
      </div>
    </DndProvider>
  );
}
