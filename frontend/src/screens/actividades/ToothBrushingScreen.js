import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { usePasosToothbrushing } from '../../hooks/usePasosActividad';
import ItemObjeto from '../../components/objetos/ItemObjetoInteractivo';
import AvatarCepillado from '../../components/avatar/AvatarCepillado';
import RewardStars from '../../components/feedback/RewardStars';
import FinActividadModal from '../../components/feedback/FinActividadModal';

import styles from '../../styles/utils/ToothBrushing.module.scss';
import ayudaIcon from '../../assets/icono_ayuda.png';

const colores = { pasta:'#ffd6d6', cepillo:'#c1e4c4', vaso:'#bfe0f7' };

export default function ToothBrushingScreen(){
  const { pasoActual, idx, total, esUltimo, siguiente } = usePasosToothbrushing();
  const [estado,setEstado] = useState('base');
  const [star,setStar]     = useState(false);
  const [fin,setFin]       = useState(false);
  const nav = useNavigate();

  const onDrop = (id)=>{
    if(pasoActual.objetivo!==id)return;
    avanzar();
  };

  const onClickAvatar = ()=>{
    if(pasoActual.objetivo==='cepillar') avanzar();
  };

  const avanzar = ()=>{
    setEstado(pasoActual.feedback);
    setStar(true);
    setTimeout(()=>{
      setStar(false);
      if(esUltimo) setFin(true);
      else {siguiente(); }
    },1100);
  };

  return(
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <img src={ayudaIcon} alt="help" className={styles.help}
             onClick={()=>alert('Arrastra el objeto correcto o toca el avatar para continuar')} />

        <h1 className={styles.titulo}>{pasoActual.titulo}</h1>

        <AvatarCepillado estado={estado} onDropCorrecto={onDrop} onClickAvatar={onClickAvatar}/>

        <div className={styles.objetos}>
          {pasoActual.objetos.map(o=>(
            <ItemObjeto key={o} id={o} bg={colores[o]} deshabilitado={pasoActual.objetivo!==o}/>
          ))}
        </div>

        <span className={styles.progreso}>{idx+1}/{total}</span>

        {star && <RewardStars />}
        {fin && <FinActividadModal texto="¡Muy bien! Tus dientes están limpios." volver={()=>nav('/')}/>}
      </div>
    </DndProvider>
  );
}
