import "./App.css";
import React from "react";
import ResponsiveAppBar from "AppBar";
import Login from "./Login";
import { BrowserRouter as Router, Navigate, useLocation, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import ThemeProvider from "@mui/system/ThemeProvider";
import Backdrop from "@mui/material/Backdrop";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import theme from "styles/Styles";
import UserProfileContextProvider, { useUserProfileContext } from "./UserContextProvider";
import ShipOrder from "pages/ShipOrder";
import NewShipOrderForm from "pages/ShipOrder/CreateNewOrder";
import ModifyNewOrder from "pages/ShipOrder/CreateNewOrder/ModifyNewOrder";
import CreateOrder from "pages/ShipOrder/CreateNewOrder/CreateNewOrder";
import ModifyOrder from "pages/ModifyOrder";


function App() {
  return (
    <div className="App" style={{ minHeight: "100vh", display:"flex", flexDirection: "column" }}>
      <ThemeProvider theme={theme}>
        <UserProfileContextProvider>
          <Router>
            <ResponsiveAppBar />
            <Container>
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
                <Route>
                  <Route
                    path="/ship-order"
                    element={
                      <RequireAuth>
                        <ShipOrder />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/create"
                    element={
                      <RequireAuth>
                        <NewShipOrderForm />
                      </RequireAuth>
                    }
                  >
                    <Route
                      path="new"
                      element={
                        <RequireAuth>
                          <CreateOrder/>
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="modify/:orderId"
                      element={
                        <RequireAuth>
                          <ModifyNewOrder />
                        </RequireAuth>
                      }
                    />
                  </Route>
                </Route>
                <Route
                  path="modify/:orderId"
                  element={
                    <RequireAuth>
                      <ModifyOrder />
                    </RequireAuth>
                  }
                />
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            </Container>
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
