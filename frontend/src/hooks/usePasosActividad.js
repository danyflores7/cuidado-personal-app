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
