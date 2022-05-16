import "./App.css";
import React from "react";
import ResponsiveAppBar from "./AppBar";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import { ThemeProvider } from "@mui/system";
import theme from "./styles/Styles";
import UserProfileContextProvider from "./UserContextProvider";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserProfileContextProvider>
          <Router>
            <ResponsiveAppBar />
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/reset" element={<Reset />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/port-events" element={<Dashboard />} />
            </Routes>
          </Router>
        </UserProfileContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
