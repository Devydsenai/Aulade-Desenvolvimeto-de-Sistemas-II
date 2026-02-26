import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Loading from './page/loading/loading';
import Home from './page/Home/home';
import Cadastro from './page/cadastro/casastro';
import Login from './page/login/login';
import Atendente from './page/Atendente/Atendente';
import Mecanico from './page/Mecanico/mecanico';
import Proprietario from './page/Proprietario/proprietario';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Loading />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/atendente" element={<Atendente />} />
      <Route path="/mecanico" element={<Mecanico />} />
      <Route path="/proprietario" element={<Proprietario />} />
    </Routes>
  );
}

export default App;
