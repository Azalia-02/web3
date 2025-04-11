import { Routes, Route } from 'react-router-dom';
import UserLogin from './components/UserLogin';
import UserList from './components/UserList';
import UserRegister from './components/UserRegister';

function App() {
  return (
    <Routes>
      <Route index element={<UserLogin />} />
      
      <Route path="/UserLogin" element={<UserLogin />} />
      <Route path="/UserList" element={<UserList />} />
      <Route path="/UserRegister" element={<UserRegister />} />
      <Route path="*" element={<UserLogin />} />
    </Routes>
  );
}

export default App;
