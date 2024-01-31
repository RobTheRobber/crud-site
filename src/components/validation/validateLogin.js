import axios from 'axios';

const validateLogin = async (email, password) => {
  try {
    const response = await axios.get("http://localhost:3001/validate-login", {
      params: { email, password },
    });

    return response.data.isValid;
  } catch (error) {
    console.error('Error validating login:', error);
    throw new Error('Error validating login');
  }
};

export default validateLogin;