import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { usePasosShower } from '../../hooks/usePasosActividad';
import ItemObjeto, { OBJETO_TYPE } from '../../components/objetos/ItemObjetoInteractivo';
import AvatarRegadera from '../../components/avatar/AvatarRegadera';
import RewardStars from '../../components/feedback/RewardStars';
import FinActividadModal from '../../components/feedback/FinActividadModal';
import NarrationPlayer from '../../components/audio/NarrationPlayer';
import { Howl } from 'howler';


import styles from '../../styles/Shower.module.scss';
import ayudaIcon from '../../assets/icono_ayuda.png';

const colores = { grifo:'#bfe0f7', jabon:'#ffd7d7', esponja:'#ffe7b6', toalla:'#c7e8d1' };

export default function ShowerScreen() {
  const { pasoActual, idx, total, esUltimo, siguiente } = usePasosShower();
  const [estado, setEstado]   = useState('base');
  const [showStar, setStar]   = useState(false);
  const [fin, setFin]         = useState(false);
  const navigate              = useNavigate();
  const [feedbackIncorrecto, setFeedbackIncorrecto] = useState(false);
  const sonidosPorObjeto = {
    grifo: require('../../assets/audio/shower/GrifoShower.mp3'),
    jabon: require('../../assets/audio/shower/JabonShower.m4a'),
    esponja: require('../../assets/audio/shower/EsponjaShower.mp3'),
    toalla: require('../../assets/audio/shower/SecarShower.m4a'),
  };


const onAccion = (id) => {
  if (pasoActual.objetivo !== id) {
    setFeedbackIncorrecto(true); // Muestra el mensaje de error
    setTimeout(() => setFeedbackIncorrecto(false), 1500); // Lo oculta después de 1.5 s
    return;
  }

  // 🎯 Si es correcto, reproducir sonido y avanzar
  const sonido = new Howl({ src: [sonidosPorObjeto[id]], volume: 1 });
    sonido.play();

    setEstado(pasoActual.feedback);
    setStar(true);

    setTimeout(() => {
      setStar(false);
      if (esUltimo) {
        setFin(true);
      } else {
        setEstado('base');
        siguiente();
      }
    }, 2000);
  };



  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        {/* Narración del paso */}
        <NarrationPlayer
          src={pasoActual.audio}
          playTrigger={idx}     // cambia cada vez que avanzas
        />
        {/* ayuda */}
        <img src={ayudaIcon} alt="ayuda" className={styles.avatarFijo} onClick={()=>alert('Arrastra el objeto correcto hacia el avatar')} />

        <h2 className={styles.titulo}>{pasoActual.titulo}</h2>

        <AvatarRegadera estado={estado} onObjetoCorrecto={onAccion} />


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

        {showStar && <RewardStars />}
        {fin && <FinActividadModal texto="¡Genial! Terminaste tu ducha." volver={()=>navigate('/')}/>}
      </div>
    </DndProvider>
  );
}
