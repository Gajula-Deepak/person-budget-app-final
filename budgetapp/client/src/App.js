import React from "react";
import AppRoutes from "./Routes/AppRoutes";
import "./App.css";
export const AuthContext = new React.createContext({
  isLoggedIn: false,
  token: null,
});

function App() {
  return (
    <AuthContext.Provider value={{}}>
      <AppRoutes />
    </AuthContext.Provider>
  );
}

export default App;
