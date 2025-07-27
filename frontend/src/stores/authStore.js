import { create } from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  loggedIn: null,

  loginForm: {
    email: "",
    password: "",
  },
  signupForm: {
    email: "",
    password: "",
  },

  updateLoginForm: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      loginForm: {
        ...state.loginForm,
        [name]: value,
      },
    }));
  },

  updateSignupForm: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      signupForm: {
        ...state.signupForm,
        [name]: value,
      },
    }));
  },

  login: async () => {
    const { loginForm } = authStore.getState();
    await axios.post("/login", loginForm);
    
    const res = await axios.get("/check-auth");
    localStorage.setItem("user", JSON.stringify(res.data));
    set({
      loggedIn: true,
      loginForm: {
        email: "",
        password: "",
      },
    });
  },

  signup: async () => {
    const { signupForm } = authStore.getState();
    await axios.post("/signup", signupForm);
    set({
      signupForm: {
        email: "",
        password: "",
      },
    });
  },

  checkAuth: async () => {
    try {
      const res = await axios.get("/check-auth");
      set({
        loggedIn: true,
      });
    } catch (error) {
      set({
        loggedIn: false,
      });
    }
  },

  logout: async () => {
    await axios.get("/logout");
    set({
      loggedIn: false,
      userEmail: "",
    });
  },
}));

export default authStore;
