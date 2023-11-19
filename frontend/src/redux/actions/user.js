import axios from "axios";
import { useDispatch } from "react-redux";
const API_URL = "http://localhost:5000/api/v1/";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    const { data } = await axios.post(
      API_URL + 'user/auth',
      { email, password },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    console.log(data);
    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    // Check if error.response and error.response.data exist before accessing properties
    const errorMessage = error.response?.data?.message || 'An error occurred';
    dispatch({ type: 'loginFailed', payload: errorMessage });
  }
};

export default login;
