import { useState, useCallback } from 'react';
import { UserService } from '../services/UserService';
import { useNavigate } from 'react-router-dom';

export default function useUsers() {
  const [registers, setRegisters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchRegisters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await UserService.getAllRegisters();
      
      if (result.success) {
        setRegisters(result.users || []);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  }, []); 

  const handleLogin = useCallback(async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await UserService.loginUser(credentials);
      
      if (result.success) {
        navigate('/UserList');
        return { success: true };
      } else {
        setError(result.error || 'Credenciales incorrectas');
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      return { success: false, error: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleRegister = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await UserService.registerUser(userData);
      
      if (result.success) {
        navigate('/UserLogin'); 
        return { success: true, user: result.user };
      } else {
        setError(result.error || 'Error al registrar usuario');
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      return { success: false, error: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleUpdateUser = useCallback(async (userId, userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await UserService.updateUser(userId, userData);
      
      if (result.success) {
        await fetchRegisters(); 
        return { success: true, user: result.user };
      } else {
        setError(result.error || 'Error al actualizar usuario');
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      return { success: false, error: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  }, [fetchRegisters]);

  const handleDeleteUser = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await UserService.deleteUser(userId);
      
      if (result.success) {
        await fetchRegisters(); 
        return { success: true };
      } else {
        setError(result.error || 'Error al eliminar usuario');
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      return { success: false, error: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  }, [fetchRegisters]);

  return {
    registers,
    loading,
    error,
    fetchRegisters,
    handleLogin,
    handleRegister,
    handleUpdateUser,
    handleDeleteUser,
    setError 
  };
}