import React, { useEffect, useState } from "react";
import useUsers from '../hooks/useUsers';
import './UserList.css';

const UserList = () => {
  const { 
    registers, 
    loading, 
    error, 
    fetchRegisters,
    handleDeleteUser,
    handleUpdateUser
  } = useUsers();
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ 
    name: '', 
    email: '', 
    password: '',
    showPassword: false 
  });

  useEffect(() => {
    fetchRegisters();
  }, []);

  const startEditing = (user) => {
    setEditingId(user.id);
    setEditForm({ 
      name: user.name, 
      email: user.email,
      password: '', 
      showPassword: false
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => {
    setEditForm(prev => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const saveEdit = async (userId) => {
    const dataToSend = { 
      name: editForm.name, 
      email: editForm.email,
      ...(editForm.password && { password: editForm.password }) 
    };
    
    await handleUpdateUser(userId, dataToSend);
    setEditingId(null);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Cargando usuarios...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <p>Error al cargar usuarios: {error}</p>
      <button onClick={fetchRegisters}>Reintentar</button>
    </div>
  );

  if (!registers || registers.length === 0) return (
    <div className="empty-state">
      <p>No hay usuarios registrados</p>
      <button onClick={fetchRegisters}>Refrescar</button>
    </div>
  );

  return (
    <div className="user-list-container">
      <h2>Lista de Usuarios</h2>
      <div className="table-responsive">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                
                {editingId === user.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        placeholder="Nombre"
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        placeholder="Email"
                      />
                    </td>
                    <td>
                      <div className="password-field">
                        <input
                          type={editForm.showPassword ? "text" : "password"}
                          name="password"
                          value={editForm.password}
                          onChange={handleEditChange}
                          placeholder="Nueva contraseña"
                        />
                        <button 
                          type="button"
                          className="toggle-password"
                          onClick={toggleShowPassword}
                        >
                          {editForm.showPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                      </div>
                      <div className="edit-actions">
                        <button 
                          className="save-btn"
                          onClick={() => saveEdit(user.id)}
                        >
                          Guardar
                        </button>
                        <button 
                          className="cancel-btn"
                          onClick={cancelEditing}
                        >
                          Cancelar
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button 
                        className="edit-btn"
                        onClick={() => startEditing(user)}
                      >
                        Editar
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;