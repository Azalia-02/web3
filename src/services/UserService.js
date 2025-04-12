const BASE_URL = "//54.162.25.118/users";

export const UserService = {
  async getAllRegisters() {
    try {
      const response = await fetch(`${BASE_URL}/`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener usuarios');
      }
      
      return {
        success: true,
        users: data.data, 
        count: data.count
      };
    } catch (error) {
      console.error('Error en getAllRegisters:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  async loginUser(credentials) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    return await response.json();
  },

  async registerUser(userData) {
    try {
      const response = await fetch(`${BASE_URL}/`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Error al registrar usuario'
        };
      }

      return {
        success: true,
        user: data.data  
      };
    } catch (error) {
      console.error('Error en registerUser:', error);
      return {
        success: false,
        error: 'Error de conexión con el servidor'
      };
    }
  },

  async updateUser(userId, userData) {
    try {
      const response = await fetch(`${BASE_URL}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Error al actualizar usuario'
        };
      }

      return {
        success: true,
        user: data.data
      };
    } catch (error) {
      console.error('Error en updateUser:', error);
      return {
        success: false,
        error: 'Error de conexión con el servidor'
      };
    }
  },

  async deleteUser(userId) {
    try {
      const response = await fetch(`${BASE_URL}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar usuario');
      }

      return { success: true };
    } catch (error) {
      console.error('Error en deleteUser:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};
