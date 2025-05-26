import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import HandWashingScreen from './screens/actividades/HandWashingScreen';
// …importa las demás screens

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/lavarse-manos" element={<HandWashingScreen />} />
        {/* agrega tus otras rutas aquí */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
