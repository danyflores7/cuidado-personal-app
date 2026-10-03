import React from 'react';
import { DndProvider, useDragLayer } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

// Arrastrar y soltar que funciona con el dedo (teléfonos y tablets) y con el mouse.
// El backend HTML5 de react-dnd no responde al toque en Android y en iPad falla,
// así que se usa el backend táctil con eventos de mouse habilitados.
const opcionesTouch = { enableMouseEvents: true };

// Con el backend táctil el navegador no dibuja la imagen que se arrastra,
// así que esta capa la dibuja siguiendo al dedo o al puntero.
function CapaArrastre() {
  const { item, isDragging, posicion } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    posicion: monitor.getClientOffset(),
  }));

  if (!isDragging || !posicion || !item?.imagen) return null;

  const tamano = 96;
  return (
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 1000,
        left: posicion.x - tamano / 2,
        top: posicion.y - tamano / 2,
        width: tamano,
        height: tamano,
        padding: 8,
        borderRadius: 16,
        backgroundColor: item.fondo || '#ffffff',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)',
      }}
    >
      <img src={item.imagen} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  );
}

export default function ProveedorArrastre({ children }) {
  return (
    <DndProvider backend={TouchBackend} options={opcionesTouch}>
      {children}
      <CapaArrastre />
    </DndProvider>
  );
}
