import { createSlice } from "@reduxjs/toolkit";

// Safely get user data from localStorage
const getUserFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          return JSON.parse(storedUser); // Try to parse the JSON data
        } catch (error) {
          return null; // Return null if JSON parsing fails
        }
      }
    }
    return null; // Return null if no user data is found in localStorage
  };

const initialState = {
    user: getUserFromLocalStorage(),
    loading: false, // Initially set loading to false
  };
  
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Action to set user (logged in)
        setUser: (state, action) => {
            state.user = action.payload; // Set user data on login
            state.loading = false; // Done loading
            localStorage.setItem("user", JSON.stringify(action.payload)); // Persist user data in localStorage
        },

        // Action to log out user
        logout: (state) => {
            state.user = null,
            state.loading = false
            localStorage.removeItem("user")
        },

        // Action to set loading
        setLoading: (state) => {
            state.loading = true
        },
    },
});

export const { setUser, setLoading, logout } = authSlice.actions;
export default authSlice.reducer