import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { usePasosShower } from '../../hooks/usePasosActividad';
import ItemObjeto, { OBJETO_TYPE } from '../../components/objetos/ItemObjetoInteractivo';
import AvatarRegadera from '../../components/avatar/AvatarRegadera';
import RewardStars from '../../components/feedback/RewardStars';
import FinActividadModal from '../../components/feedback/FinActividadModal';

import styles from '../../styles/Shower.module.scss';
import ayudaIcon from '../../assets/icono_ayuda.png';

const colores = { grifo:'#bfe0f7', jabon:'#ffd7d7', esponja:'#ffe7b6', toalla:'#c7e8d1' };

export default function ShowerScreen() {
  const { pasoActual, idx, total, esUltimo, siguiente } = usePasosShower();
  const [estado, setEstado]   = useState('base');
  const [showStar, setStar]   = useState(false);
  const [fin, setFin]         = useState(false);
  const navigate              = useNavigate();

  const onAccion = (id) => {
    if (pasoActual.objetivo !== id) return;
    setEstado(pasoActual.feedback);
    setStar(true);

    setTimeout(() => {
      setStar(false);
      if (esUltimo) { setFin(true); }
      else if (pasoActual.feedback == 'agua'){ 
        setEstado('base'); 
        siguiente(); 
      }
      else { 
        //setEstado('base'); 
        siguiente(); 
      }
    }, 1200);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        {/* ayuda */}
        <img src={ayudaIcon} alt="ayuda" className={styles.avatarFijo} onClick={()=>alert('Arrastra el objeto correcto hacia el avatar')} />

        <h2 className={styles.titulo}>{pasoActual.titulo}</h2>

        <AvatarRegadera estado={estado} onObjetoCorrecto={onAccion} />

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
