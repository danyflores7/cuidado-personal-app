import { useState } from 'react';

const pasosDef = [
  {
    titulo: 'Paso 1: Pon jabón en tus manos',
    objetivo: 'jabon',
    feedback: 'espuma',
    objetos: ['jabon', 'grifo', 'toalla'],
    audio: require('../assets/audio/handwashing/paso1_jabon.mp3'),
    efectoSonido: require('../assets/audio/handwashing/JabonManos.m4a')
  },
  {
    titulo: 'Paso 2: Frota tus manos',
    objetivo: 'frotar',
    feedback: 'burbujas',
    objetos: ['grifo', 'toalla'],
    audio: require('../assets/audio/handwashing/paso2_frotar.mp3'),
    efectoSonido: require('../assets/audio/handwashing/FrotarManos.m4a')
  },
  {
    titulo: 'Paso 3: Enjuaga con agua',
    objetivo: 'grifo',
    feedback: 'agua',
    objetos: ['grifo', 'toalla'],
    audio: require('../assets/audio/handwashing/paso3_enjuagar.mp3'),
    efectoSonido: require('../assets/audio/handwashing/AguaManos.m4a')
  },
  {
    titulo: 'Paso 4: Sécalas con la toalla',
    objetivo: 'toalla',
    feedback: 'seco',
    objetos: ['toalla'],
    audio: require('../assets/audio/handwashing/paso4_secar.mp3'),
    efectoSonido: require('../assets/audio/handwashing/SecarManos.m4a')
  }

];

export default function usePasosActividad() {
  const [index, setIndex] = useState(0);

  const pasoActual   = pasosDef[index];
  const totalPasos   = pasosDef.length;
  const porcentaje   = ((index + 1) / totalPasos) * 100;

  const esUltimo     = index === totalPasos - 1;
  const siguientePaso = () => {
    if (!esUltimo) setIndex(i => i + 1);
  };

  return { pasoActual, index, totalPasos, porcentaje, esUltimo, siguientePaso };
}


// ─────────────────────────────────────────────
//  usePasosShower  (actividad: Ducha)
// ─────────────────────────────────────────────

export function usePasosShower() {
  const pasos = [
  {
    titulo: 'Paso 1: Abre el grifo',
    objetivo: 'grifo',
    feedback: 'agua',
    objetos: ['grifo', 'jabon', 'esponja', 'toalla'],
    audio: require('../assets/audio/shower/paso1_grifo.mp3'),
  },
  {
    titulo: 'Paso 2: Aplica el jabón',
    objetivo: 'jabon',
    feedback: 'espuma',
    objetos: ['jabon', 'esponja', 'toalla'],
    audio: require('../assets/audio/shower/paso2_jabon.mp3'),
  },
  {
    titulo: 'Paso 3: Frota con la esponja',
    objetivo: 'esponja',
    feedback: 'burbujas',
    objetos: ['esponja', 'toalla'],
    audio: require('../assets/audio/shower/paso3_esponja.mp3'),
  },
  {
    titulo: 'Paso 4: Abre el grifo',
    objetivo: 'grifo',
    feedback: 'agua',
    objetos: ['grifo', 'toalla'],
    audio: require('../assets/audio/shower/paso4_grifo.mp3'),
  },
  {
    titulo: 'Paso 5: Sécate con la toalla',
    objetivo: 'toalla',
    feedback: 'seco',
    objetos: ['toalla'],
    audio: require('../assets/audio/shower/paso5_toalla.mp3'),
  }
  ];
  
  const [idx, setIdx] = useState(0);
  const pasoActual    = pasos[idx];
  const esUltimo      = idx === pasos.length - 1;

  const siguiente = () => { if (!esUltimo) setIdx(i => i + 1); };

  return { pasoActual, idx, total: pasos.length, esUltimo, siguiente };
}

// ─────────────────────────────────────────────
//  usePasosToilet  (actividad: Baño)
// ─────────────────────────────────────────────

export function usePasosToilet() {
  const pasos = [
    { titulo: '¡Vamos al baño! Primero, baja tu ropa.', objetivo: 'ropa',    feedback: 'ropaBajada',   objetos: ['ropa', 'papel', 'limpiar'],     audio:  require('../assets/audio/toilet/paso1_ropa.mp3') },
    { titulo: 'Ahora, siéntate en el inodoro.', objetivo: 'sentarse', feedback: 'avatarSentado', objetos: [], audio:  require('../assets/audio/toilet/paso2_sentarse.mp3') },
    { titulo: 'Usa papel y limpia.',                    objetivo: 'papel',   feedback: 'papelUsado',   objetos: ['papel', 'limpiar'], audio:  require('../assets/audio/toilet/paso3_papel.mp3') },
    { titulo: 'Limpia y tira la cadena.',               objetivo: 'limpiar', feedback: 'inodoroLimpio',objetos: ['limpiar'], audio:  require('../assets/audio/toilet/paso4_limpia.mp3') }
  ];

  const [idx, setIdx] = useState(0);
  const pasoActual    = pasos[idx];
  const esUltimo      = idx === pasos.length - 1;
  const siguiente     = () => !esUltimo && setIdx(i => i + 1);

  return { pasoActual, idx, total: pasos.length, esUltimo, siguiente };
}


// ─────────────────────────────────────────────
//  usePasosToothbrushing   (actividad: Dientes)
// ─────────────────────────────────────────────

export function usePasosToothbrushing() {
  const pasos = [
    { titulo: '¡Hora de cepillar tus dientes! Toma la pasta.', objetivo:'pasta',    feedback:'cepilloPasta', objetos:['pasta','cepillo','vaso'],     audio:  require('../assets/audio/toothbrushing/paso1_pasta.mp3') },
    { titulo: 'Cepilla tus dientes.',                           objetivo:'cepillar', feedback:'cepillando',   objetos:['cepillo'],     audio:  require('../assets/audio/toothbrushing/paso2_cepilla.mp3') },
    { titulo: 'Enjuaga y escupe.',                              objetivo:'vaso',     feedback:'enjuagando',   objetos:['vaso'],     audio:  require('../assets/audio/toothbrushing/paso3_enjuaga.mp3') }
  ];
  const [idx, setIdx] = useState(0);
  const pasoActual = pasos[idx];
  const esUltimo   = idx === pasos.length - 1;
  const siguiente  = () => !esUltimo && setIdx(i=>i+1);

  return { pasoActual, idx, total: pasos.length, esUltimo, siguiente };
}

