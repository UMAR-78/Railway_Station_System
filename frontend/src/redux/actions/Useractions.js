import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = "http://localhost:5000/api/v1";

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      API_URL + "/user/auth",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    if (data.success) {
      dispatch({ type: "loginSuccess", payload: data });
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
      toast.success(data.message);
    }
    else
    {
      toast.error("Invalid Credentials!!");
    }
  } catch (error) {
    dispatch({ type: "loginFailed", payload: error.response.message });
    toast.error(error);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "SignUpRequest" });

    const { data } = await axios.post(API_URL + "/user", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    if (data.success === true) {
      dispatch({ type: "SignUpSuccess", payload: data });
      toast.success("Registered Successfully");
      navigate("/signin");
    } else{
      console.log("error");
      
    }
  } catch (error) {
    dispatch({ type: "SignUpFailed", payload: error.response.message });
    toast.error(error);
  }
};
