import { useState } from 'react';

const pasosDef = [
  {
    titulo: 'Paso 1: Pon jabón en tus manos',
    objetivo: 'jabon',
    feedback: 'espuma',
    objetos: ['jabon', 'grifo', 'toalla']
  },
  {
    titulo: 'Paso 2: Frota tus manos',
    objetivo: 'frotar',            // no requiere drop nuevo
    feedback: 'burbujas',
    objetos: ['grifo', 'toalla']
  },
  {
    titulo: 'Paso 3: Enjuaga con agua',
    objetivo: 'grifo',
    feedback: 'agua',
    objetos: ['grifo', 'toalla']
  },
  {
    titulo: 'Paso 4: Sécalas con la toalla',
    objetivo: 'toalla',
    feedback: 'seco',
    objetos: ['toalla']
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
    { titulo: 'Paso 1: Abre el grifo',       objetivo: 'grifo',   feedback: 'agua',     objetos: ['grifo', 'jabon', 'esponja', 'toalla'] },
    { titulo: 'Paso 2: Aplica el jabón',     objetivo: 'jabon',   feedback: 'espuma',   objetos: ['jabon', 'esponja', 'toalla'] },
    { titulo: 'Paso 3: Frota con la esponja',objetivo: 'esponja', feedback: 'burbujas', objetos: ['esponja', 'toalla'] },
    { titulo: 'Paso 4: Abre el grifo',       objetivo: 'grifo',   feedback: 'agua',     objetos: ['grifo', 'toalla'] },
    { titulo: 'Paso 5: Sécate con la toalla',objetivo: 'toalla',  feedback: 'seco',     objetos: ['toalla'] }
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
    { titulo: '¡Vamos al baño! Primero, baja tu ropa.', objetivo: 'ropa',    feedback: 'ropaBajada',   objetos: ['ropa', 'papel', 'limpiar'] },
    { titulo: 'Ahora, siéntate en el inodoro.', objetivo: 'sentarse', feedback: 'avatarSentado', objetos: [] },
    { titulo: 'Usa papel y limpia.',                    objetivo: 'papel',   feedback: 'papelUsado',   objetos: ['papel', 'limpiar'] },
    { titulo: 'Limpia y tira la cadena.',               objetivo: 'limpiar', feedback: 'inodoroLimpio',objetos: ['limpiar'] }
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
    { titulo: '¡Hora de cepillar tus dientes! Toma la pasta.', objetivo:'pasta',    feedback:'cepilloPasta', objetos:['pasta','cepillo','vaso'] },
    { titulo: 'Cepilla tus dientes.',                           objetivo:'cepillar', feedback:'cepillando',   objetos:['cepillo'] },
    { titulo: 'Enjuaga y escupe.',                              objetivo:'vaso',     feedback:'enjuagando',   objetos:['vaso'] }
  ];
  const [idx, setIdx] = useState(0);
  const pasoActual = pasos[idx];
  const esUltimo   = idx === pasos.length - 1;
  const siguiente  = () => !esUltimo && setIdx(i=>i+1);

  return { pasoActual, idx, total: pasos.length, esUltimo, siguiente };
}

