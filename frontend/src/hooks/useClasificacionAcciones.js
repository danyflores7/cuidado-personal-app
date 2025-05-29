import { useState, useMemo } from 'react';
import { ACCIONES_BIEN, ACCIONES_MAL } from '../data/pictogramas';

// util: barajar array in-place (Fisher-Yates)
const shuffle = (arr)=>{
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
};

// construye 8 pictos: máx. 3 de cada grupo
function buildSession(max=8){
  const bien  = shuffle(ACCIONES_BIEN).slice(0,3);   // 3 buenos
  const mal   = shuffle(ACCIONES_MAL).slice(0,3);    // 3 malos
  const resto = shuffle([...ACCIONES_BIEN, ...ACCIONES_MAL]
                    .filter(a=>!bien.includes(a)&&!mal.includes(a)))
                    .slice(0,max-6);                 // los 2 restantes
  return shuffle([...bien, ...mal, ...resto])
    .map(a=>({ ...a, categoria: ACCIONES_BIEN.includes(a)?'bien':'mal' }));
}

export default function useClasificacionAcciones(){
  // se memoiza al montar la pantalla → misma ronda hasta reiniciar()
  const acciones = useMemo(()=>buildSession(8),[]);
  const [idx,setIdx] = useState(0);

  const avanzar  = () => setIdx(i=>i+1);
  const reiniciar= () => { setIdx(0); };   // o setIdx(0) y regenerar si quieres otra ronda

  return {
    accionActual: acciones[idx],
    idx,
    total: acciones.length,
    esUltimo: idx === acciones.length-1,
    avanzar,
    reiniciar
  };
}
