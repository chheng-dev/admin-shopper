import axios from "axios";
const API_BASE_URL = "http://localhost:3001/auth";

class AuthService{
  static async signIn(email, password){
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      return response.data.token;
    } catch(err) {
      console.log('Sign error:', err);
      throw err;
    }
  }

  static async signUp(firstname, lastname, email, password, confirm_password) {
    try {
      const payload = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        confirm_password: confirm_password
      };

      const headers = {
        'Content-Type': 'application/json', 
      };

      await axios.post(`${API_BASE_URL}/register`, payload, { headers: headers });
    } catch (err) {
      console.log('Sign up error:', err);
      throw err;
    }
  }
  
  static async fetchAdminData(token) {
    try {
      const response = await axios.get(`http://localhost:3001/admin/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch(err) {
      console.error('Error fetching admin data:', err);
      throw err; 
    }
  }

}

export default AuthService;
