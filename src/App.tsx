import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Formulario from './Formulario';
import Roleta from './Roleta';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Formulario />} />
        <Route path='/roleta' element={<Roleta />} />
      </Routes>
    </Router>
  );
}

export default App;
