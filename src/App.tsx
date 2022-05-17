import "./App.css";
import React from "react";
import ResponsiveAppBar from "./AppBar";
import Login from "./Login";
import { BrowserRouter as Router, Navigate, useLocation, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import ThemeProvider from "@mui/system/ThemeProvider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import theme from "./styles/Styles";
import UserProfileContextProvider, { useUserProfileContext } from "./UserContextProvider";

function App() {
  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <ThemeProvider theme={theme}>
        <UserProfileContextProvider>
          <Router>
            <ResponsiveAppBar />
            <Routes>
              <Route
                path="/login"
                element={
                  <AlreadyAuth>
                    <Login />
                  </AlreadyAuth>
                }
              />
              <Route
                path="/register"
                element={
                  <AlreadyAuth>
                    <Register />
                  </AlreadyAuth>
                }
              />
              <Route
                path="/reset"
                element={
                  <AlreadyAuth>
                    <Reset />
                  </AlreadyAuth>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/port-events"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
              />
            </Routes>
          </Router>
        </UserProfileContextProvider>
      </ThemeProvider>
    </div>
  );
}
const LoadingUserProfileIndicator = ({ loadingUserProfile }: { loadingUserProfile: boolean }) => (
  <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loadingUserProfile}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

const  RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { userProfile, loadingUserProfile } = useUserProfileContext();
  const location = useLocation();
  if(loadingUserProfile){
    return (
      <LoadingUserProfileIndicator loadingUserProfile={loadingUserProfile} />
    );
  }
  if (!userProfile?.name) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
const AlreadyAuth = ({ children } : { children: JSX.Element }) => {
  const { userProfile, loadingUserProfile } = useUserProfileContext();
  const location = useLocation();
  if(loadingUserProfile){
    return (
      <LoadingUserProfileIndicator loadingUserProfile={loadingUserProfile} />
    );
  }
  if (!userProfile?.name) {
    return children;
  }
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default App;
