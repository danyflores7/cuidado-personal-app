import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import HandWashingScreen from './screens/actividades/HandWashingScreen';
import ShowerScreen from './screens/actividades/ShowerScreen';
import ToiletScreen from './screens/actividades/ToiletScreen';
import ToothBrushingScreen from './screens/actividades/ToothBrushingScreen';
import ClasificarAccionesScreen from './screens/actividades/ClasificarAccionesScreen';


// …importa las demás screens

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/lavarse-manos" element={<HandWashingScreen />} />
        <Route path="/ducha" element={<ShowerScreen />} />
        <Route path="/bano" element={<ToiletScreen />} />
        <Route path="/dientes" element={<ToothBrushingScreen />} />
        <Route path="/bien-mal" element={<ClasificarAccionesScreen />} />

        {/* agrega tus otras rutas aquí */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
