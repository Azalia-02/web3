import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLogin from '../components/UserLogin';
import UserList from '../components/UserList';
import UserRegister from '../components/UserRegister';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/UserList" element={<UserList />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;