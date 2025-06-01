import { Howl } from 'howler';
import { useEffect, useRef } from 'react';

export default function NarrationPlayer({ src, playTrigger, volume = 1 }) {
  const soundRef = useRef(null);

  useEffect(() => {
    // destruimos el sonido anterior
    soundRef.current?.unload();

    soundRef.current = new Howl({
      src: [src],
      volume,
      html5: true   // para iOS / grandes archivos
    });

    soundRef.current.play();

    return () => soundRef.current?.unload();
  }, [src, playTrigger, volume]);

  return null; // componente invisible
}
